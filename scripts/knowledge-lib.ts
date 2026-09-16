import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { knowledgeManifest } from "../content/knowledge/manifest";
import { generatedKnowledge } from "./knowledge-content";

export const projectRoot = path.resolve(process.cwd());
export const knowledgeRoot = path.join(projectRoot, "content", "knowledge");

const prohibitedPatterns = [
  {
    name: "phone number",
    pattern: /(?<![A-Za-z0-9])(?:\+?\d[\s().-]*){10,15}(?![A-Za-z0-9])/g,
  },
  { name: "private-key material", pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
  { name: "credential-like field", pattern: /\b(?:password|secret|api[_ -]?key)\s*[:=]/gi },
];

export function sha256(content: Buffer | string) {
  return createHash("sha256").update(content).digest("hex");
}

export async function loadKnowledgeSources() {
  return Promise.all(
    knowledgeManifest.map(async (source) => ({
      ...source,
      absolutePath: path.join(knowledgeRoot, source.file),
      content: await readFile(path.join(knowledgeRoot, source.file), "utf8"),
    })),
  );
}

export async function validateKnowledge() {
  const errors: string[] = [];
  const ids = new Set<string>();

  for (const source of knowledgeManifest) {
    const sourceId = source.id;
    if (ids.has(source.id)) errors.push(`Duplicate source id: ${source.id}`);
    ids.add(source.id);
    const visibility: string = source.visibility;
    if (visibility !== "public") {
      errors.push(`${sourceId}: visibility must be public`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(source.updatedAt)) {
      errors.push(`${source.id}: updatedAt must use YYYY-MM-DD`);
    }
    if (!source.sourceUrl) errors.push(`${source.id}: sourceUrl is required`);

    try {
      const content = await readFile(path.join(knowledgeRoot, source.file), "utf8");
      const generated = generatedKnowledge[
        source.file as keyof typeof generatedKnowledge
      ];
      if (generated !== undefined && content !== generated) {
        errors.push(
          `${source.id}: generated knowledge is stale; run npm run knowledge:generate`,
        );
      }
      for (const prohibited of prohibitedPatterns) {
        prohibited.pattern.lastIndex = 0;
        if (prohibited.pattern.test(content)) {
          errors.push(`${source.id}: contains prohibited ${prohibited.name}`);
        }
      }
    } catch {
      errors.push(`${source.id}: missing declared file ${source.file}`);
    }

    if (source.sourcePdf && source.sourcePdfSha256) {
      try {
        const pdf = await readFile(path.join(projectRoot, source.sourcePdf));
        const actual = sha256(pdf);
        if (actual !== source.sourcePdfSha256) {
          errors.push(
            `${source.id}: source PDF changed (${actual}); review it, refresh the sanitized document, and update sourcePdfSha256`,
          );
        }
      } catch {
        errors.push(`${source.id}: missing source PDF ${source.sourcePdf}`);
      }
    }
  }

  return errors;
}
