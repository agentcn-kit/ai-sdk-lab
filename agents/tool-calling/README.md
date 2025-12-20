# File System Agent (Next.js 16 + Vercel AI SDK)

A fully autonomous **File System Agent** that can create, edit, read, and manage files in a sandboxed environment. Built with the [Vercel AI SDK](https://sdk.vercel.ai/docs) and [Anthropic Claude 3.5 Haiku](https://docs.anthropic.com/en/docs/models-overview).




https://github.com/user-attachments/assets/e9a8f710-9583-4956-b8d1-8dcc89c75e86




## Features

- **Autonomous Agent Loop**: Uses `stopWhen: [stepCountIs(10)]` to allow the agent to "think, act, and observe" in a loop, enabling multi-step tasks like "Create a file and then verify its contents".
- **File System Toolset**: A sandboxed toolset giving the agent capabilities to:
  - `writeFile` / `readFile`
  - `listDirectory` / `createDirectory`
  - `deletePath` / `exists`
  - `searchFiles`

- **Modern UI**: Streaming chat interface with drag-and-drop file attachment support.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **AI SDK**: [Vercel AI SDK (Core + React)](https://sdk.vercel.ai/docs)
- **Model Provider**: [Anthropic](https://anthropic.com) (`claude-3-5-haiku-20241022`)
- **Agent Architecture**: Feature-based agent separation (`agents/file-agent`) logic vs. API routes (`app/api/chat`).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + `tailwindcss-animate`
- **Linting/Formatting**: [Biome](https://biomejs.dev/)

## File Structure & How it Works

### Agent Logic (`agents/file-agent/`)
- **`agent.ts`**: The "Brain". Configures the model, tools, and the critical **agent loop** (via `stopWhen`).
- **`prompt.ts`**: Defines "Cadi", the system persona, ensuring the agent behaves like a helpful file management expert.
- **`index.ts`**: Helper exports.

### Tools (`tools/file-system/`)
- Contains the Zod-schema definitions and implementation for all file system operations.

### API (`app/api/chat/route.ts`)
- Serves as the interface between the frontend and the agent.
- Receives messages, calls `fileAgent(messages)`, and streams the result back.

## Prerequisites

- **Node.js 20+**
- **pnpm** (recommended) or npm
- An **Anthropic API Key**

## Setup & Running Locally

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd tool-calling
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```bash
   ANTHROPIC_API_KEY=your_key_here
   ```

4. **Start the Development Server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## key Commands

| Command | Description |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm lint` | Check code quality with Biome |
| `pnpm format` | Auto-format code with Biome |

## License

MIT

---

Built with ❤️ by [Anayat](https://anayat.xyz)
