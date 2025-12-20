import { InferUITools, type ModelMessage, type UIMessage, convertToModelMessages } from "ai";
import { type NextRequest } from "next/server";
import { fileAgent } from "@/agents/file-agent";


export async function POST(request: NextRequest) {
  const body = await request.json();

  const messages: UIMessage[] = body.messages;
  const modelMessages: ModelMessage[] = convertToModelMessages(messages);

  const result = fileAgent(modelMessages);

  return result.toUIMessageStreamResponse();
}
