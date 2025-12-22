# MCP Tool Calling Agent (Next.js 16 + Vercel AI SDK)

A powerful **Hybrid Agent** that combines local file system control with **GitHub MCP** capabilities. This project demonstrates how to use the [Vercel AI SDK's](https://sdk.vercel.ai/docs) experimental MCP (Model Context Protocol) support to bridge local tools and remote MCP servers (running via Docker) in a single autonomous agent.

Powered by [Anthropic Claude 3.5 Haiku](https://docs.anthropic.com/en/docs/models-overview).

## Features

- **Hybrid Toolset**: 
  - **Github MCP**: Connects to the official `github-mcp-server` running in Docker to manage repositories, issues, and PRs.
  - **Local File System**: a sandboxed toolset to `readFile`, `writeFile`, `listDirectory`, and more.
- **Autonomous Agent Loop**: Uses `stopWhen: [stepCountIs(10)]` to allow the agent to "think, act, and observe" in a loop (e.g., "List my PRs, create a summary markdown file, and then verify it").
- **MCP Client Integration**: Demonstrates `experimental_createMCPClient` with `StdioMCPTransport` to communicate with Dockerized MCP servers.
- **Modern UI**: Streaming chat interface built with Next.js 16 and Tailwind CSS.
- **Visual Feedback**: Real-time streaming of tool calls and responses.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **AI SDK**: [Vercel AI SDK](https://sdk.vercel.ai/docs)
  - `experimental_createMCPClient` for MCP integration
  - `streamText` with multi-step capability
- **Model Provider**: [Anthropic](https://anthropic.com) (`claude-3-5-haiku-20241022`)
- **MCP Transport**: Docker-based `StdioMCPTransport`.

## Prerequisites

- **Node.js 20+**
- **Docker** (must be installed and running to use the GitHub MCP server)
- **Anthropic API Key**
- **GitHub Personal Access Token** (PAT)

## Setup & Running Locally

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd agents/mcp-calling
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```bash
   ANTHROPIC_API_KEY=your_anthropic_key
   GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token
   ```

4. **Start the Development Server**:
   Ensure Docker is running, then start the app:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## How it Works

### The MCP Bridge (`app/api/chat/route.ts`)
The API route acts as the brain, initializing an MCP client that connects to a Docker container running the GitHub MCP server:

```typescript
const mcpClient = await createMCPClient({
  transport: new StdioMCPTransport({
    command: "docker",
    args: ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"],
    env: { GITHUB_PERSONAL_ACCESS_TOKEN: process.env.GITHUB_PERSONAL_ACCESS_TOKEN! },
  }),
});
```

It then merges these remote tools with local `fileSystemToolset` and passes them to Claude.

### Agent Logic
The agent uses a system prompt that combines the persona of a helpful assistant with specific file-system expertise. The `stopWhen` condition prevents infinite loops while allowing sufficient steps for complex tasks.

## Key Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm lint` | Check code quality with Biome |
| `pnpm format` | Auto-format code with Biome |

## License

MIT

---

Built with ❤️ by [Anayat](https://anayat.xyz)
