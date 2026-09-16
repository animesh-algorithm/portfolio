import { describe, expect, it } from "vitest";
import { validateKnowledge } from "../scripts/knowledge-lib";

describe("knowledge manifest", () => {
  it("contains only explicit public, current, sanitized sources", async () => {
    expect(await validateKnowledge()).toEqual([]);
  });
});
