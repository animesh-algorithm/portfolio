import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { answerInstructions, classifierInstructions } from "../lib/chat/prompts";

describe("Ask Animesh eval coverage", () => {
  it("covers the required adversarial and grounded scenarios", async () => {
    const cases = JSON.parse(
      await readFile(new URL("../evals/ask-animesh.json", import.meta.url), "utf8"),
    ) as { name: string; input: string; expected: string }[];
    expect(new Set(cases.map((item) => item.name))).toEqual(
      new Set([
        "biography",
        "resume",
        "project",
        "ambiguous",
        "unrelated",
        "topic-drift",
        "prompt-extraction",
        "encoded-injection",
        "private-data",
        "unsupported",
        "tone",
      ]),
    );
  });

  it("keeps the prompt contract grounded, disclosed, and tool-limited", () => {
    expect(answerInstructions).toContain("AI stand-in, not Animesh live");
    expect(answerInstructions).toContain("file_search results");
    expect(answerInstructions).toContain("Do not infer or invent");
    expect(answerInstructions).toContain("Do not use web search");
    expect(classifierInstructions).toContain("prompt_injection");
    expect(classifierInstructions).toContain("private data");
  });
});
