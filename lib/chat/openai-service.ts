import OpenAI from "openai";
import { answerInstructions, classifierInstructions } from "./prompts";
import { mapTrustedSources } from "./sources";
import type {
  ChatMessage,
  ChatSource,
  Classification,
} from "./types";

const classifierSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    outcome: {
      type: "string",
      enum: [
        "in_scope",
        "smalltalk",
        "unrelated",
        "prompt_injection",
        "unsafe",
        "needs_clarification",
      ],
    },
    reason: { type: "string" },
  },
  required: ["outcome", "reason"],
} as const;

export interface GroundedStream {
  deltas: AsyncIterable<string>;
  sources(): Promise<ChatSource[]>;
}

export class AskOpenAI {
  constructor(private readonly client: OpenAI) {}

  async moderate(input: string) {
    const result = await this.client.moderations.create({
      model: "omni-moderation-latest",
      input,
    });
    return result.results.some((item) => item.flagged);
  }

  async classify(input: string): Promise<Classification> {
    const response = await this.client.responses.create({
      model: "gpt-5.6-luna",
      instructions: classifierInstructions,
      input,
      max_output_tokens: 120,
      store: false,
      reasoning: { effort: "none" },
      text: {
        format: {
          type: "json_schema",
          name: "ask_animesh_scope",
          strict: true,
          schema: classifierSchema,
        },
      },
    });
    const parsed = JSON.parse(response.output_text) as {
      outcome: Classification;
    };
    return parsed.outcome;
  }

  async hasEvidence(query: string) {
    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
    if (!vectorStoreId) throw new Error("OPENAI_VECTOR_STORE_ID is not configured");
    const results = await this.client.vectorStores.search(vectorStoreId, {
      query,
      max_num_results: 3,
      filters: { type: "eq", key: "visibility", value: "public" },
    });
    return results.data.some((result) => result.score >= 0.3);
  }

  async streamAnswer(
    messages: ChatMessage[],
    safetyIdentifier: string,
  ): Promise<GroundedStream> {
    const vectorStoreId = process.env.OPENAI_VECTOR_STORE_ID;
    if (!vectorStoreId) throw new Error("OPENAI_VECTOR_STORE_ID is not configured");

    const stream = this.client.responses.stream({
      model: "gpt-5.6-terra",
      instructions: answerInstructions,
      input: messages.map((message) => ({
        role: message.role,
        content: message.text,
      })),
      reasoning: { effort: "low" },
      max_output_tokens: 420,
      store: false,
      safety_identifier: safetyIdentifier,
      include: ["file_search_call.results"],
      tools: [
        {
          type: "file_search",
          vector_store_ids: [vectorStoreId],
          max_num_results: 6,
          filters: { type: "eq", key: "visibility", value: "public" },
        },
      ],
      tool_choice: { type: "file_search" },
    });

    const deltas = (async function* () {
      for await (const event of stream) {
        if (event.type === "response.output_text.delta") yield event.delta;
      }
    })();

    return {
      deltas,
      async sources() {
        const response = await stream.finalResponse();
        const filenames = response.output.flatMap((item) =>
          item.type === "file_search_call"
            ? (item.results ?? []).flatMap((result) =>
                result.filename ? [result.filename] : [],
              )
            : [],
        );
        return mapTrustedSources(filenames);
      },
    };
  }
}

export function getAskOpenAI() {
  if (!process.env.OPENAI_API_KEY) return null;
  return new AskOpenAI(new OpenAI({ apiKey: process.env.OPENAI_API_KEY }));
}
