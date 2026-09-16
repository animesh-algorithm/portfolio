import { createReadStream } from "node:fs";
import OpenAI from "openai";
import { loadKnowledgeSources, sha256, validateKnowledge } from "./knowledge-lib";

async function main() {
  const errors = await validateKnowledge();
  if (errors.length) throw new Error(errors.join("\n"));

  const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
  if (!process.env.OPENAI_API_KEY || !vectorStoreId) {
    throw new Error("OPENAI_API_KEY and OPENAI_VECTOR_STORE_ID are required");
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const desiredSources = await loadKnowledgeSources();
  const remoteFiles = [];
  for await (const file of client.vectorStores.files.list(vectorStoreId)) {
    remoteFiles.push(file);
  }

  for (const source of desiredSources) {
  const digest = sha256(source.content);
  const current = remoteFiles.find(
    (file) =>
      file.attributes?.source_id === source.id &&
      file.attributes?.sha256 === digest,
  );
  if (current) {
    console.log(`Unchanged: ${source.id}`);
    continue;
  }

  const stale = remoteFiles.filter(
    (file) => file.attributes?.source_id === source.id,
  );
  const uploaded = await client.files.create({
    file: createReadStream(source.absolutePath),
    purpose: "assistants",
  });
  await client.vectorStores.files.create(vectorStoreId, {
    file_id: uploaded.id,
    attributes: {
      source_id: source.id,
      sha256: digest,
      title: source.title,
      category: source.category,
      source_url: source.sourceUrl,
      visibility: source.visibility,
    },
  });
  for (const file of stale) {
    await client.vectorStores.files.delete(file.id, {
      vector_store_id: vectorStoreId,
    });
    await client.files.delete(file.id);
  }
  console.log(`Synced: ${source.id}`);
  }

  const desiredIds = new Set(desiredSources.map((source) => source.id));
  for (const file of remoteFiles) {
  const sourceId = file.attributes?.source_id;
  if (typeof sourceId === "string" && !desiredIds.has(sourceId)) {
    await client.vectorStores.files.delete(file.id, {
      vector_store_id: vectorStoreId,
    });
    await client.files.delete(file.id);
    console.log(`Removed: ${sourceId}`);
  }
  }
}

void main();
