import { writeFile } from "node:fs/promises";
import path from "node:path";
import { generatedKnowledge } from "./knowledge-content";
import { knowledgeRoot } from "./knowledge-lib";

async function main() {
  for (const [filename, content] of Object.entries(generatedKnowledge)) {
    await writeFile(path.join(knowledgeRoot, filename), content, "utf8");
    console.log(`Generated: ${filename}`);
  }
}

void main();
