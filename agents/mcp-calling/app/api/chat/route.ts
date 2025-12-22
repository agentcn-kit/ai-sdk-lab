import {
  InferUITools,
  type ModelMessage,
  ToolSet,
  type UIMessage,
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
} from "ai";
import { type NextRequest } from "next/server";
import { fileSystemToolset } from "@/tools/file-system";
import { SYSTEM_PROMPT as FILE_AGENT_PROMPT } from "@/agents/file-agent/prompt";

import { experimental_createMCPClient as createMCPClient } from "ai";
import { Experimental_StdioMCPTransport as StdioMCPTransport } from "ai/mcp-stdio";
import { anthropic } from "@ai-sdk/anthropic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const messages: UIMessage[] = body.messages;
  const modelMessages: ModelMessage[] = convertToModelMessages(messages);

  const mcpClient = await createMCPClient({
    transport: new StdioMCPTransport({
      command: "docker",
      args: [
        "run",
        "-i",
        "--rm",
        "-e",
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server",
      ],
      env: {
        GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
      },
    }),
  });

  const mcpTools = await mcpClient.tools();

  const result = streamText({
    model: anthropic("claude-3-5-haiku-20241022"),
    messages: modelMessages,
    system: `
      You are a helpful assistant that can use the GitHub API to interact with the user's GitHub account.
      
      ${FILE_AGENT_PROMPT}
    `,

    tools: {
      ...mcpTools,
      ...fileSystemToolset,
    },
    stopWhen: [stepCountIs(10)],
  });

  return result.toUIMessageStreamResponse({
    onFinish: async () => mcpClient.close(),
  });
}
