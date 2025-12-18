import { anthropic } from "@ai-sdk/anthropic";
import { streamText, type ModelMessage, stepCountIs } from "ai";
import { fileSystemToolset } from "@/tools/file-system";
import { SYSTEM_PROMPT } from "./prompt";

export function fileAgent(messages: ModelMessage[]) {
  return streamText({
    model: anthropic("claude-3-5-haiku-20241022"),
    system: SYSTEM_PROMPT,
    messages,
    tools: fileSystemToolset,
    stopWhen: [stepCountIs(10)],
  });
}
