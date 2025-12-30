# Vercel AI SDK Lab

A collection of quick-start examples, experiments, and reference implementations for the [Vercel AI SDK](https://sdk.vercel.ai/docs). Each example is kept small and focused so you can copy, run, and adapt it to your needs.

## Examples

### 🤖 Agents

Autonomous agents capable of multi-step reasoning and tool use.

- **[MCP Tool Calling Agent](agents/mcp-calling/)** – Hybrid agent combining local file system control with GitHub MCP capabilities (running via Docker).
- **[File System Agent](agents/tool-calling/)** – Autonomous agent capable of creating, editing, and managing files in a sandboxed environment.

### ⚖️ Evaluations (Evals)

Tools and patterns for evaluating LLM outputs using [Evalite](https://evalite.dev).

- **[LLM as a Judge](evals/llm-as-a-judge/)** – Using a smaller model (Claude 3.5 Haiku) to grade complex answers (e.g., verifying citations in a paper).
- **[Deterministic Evals](evals/deterministic/)** – Running regex checks, length constraints, and other rule-based evaluations.

### 💬 Chat Interfaces

Full-stack Next.js applications demonstrating UI patterns.

- **[Streaming to UI](streaming-to-a-ui/)** – Next.js 16 chat UI that streams Anthropic responses via the AI SDK.
- **[Multi-Modal Chat](passing-images-and-files/)** – Chat interface supporting text, image previews, and file attachments with context preservation.

### 🧠 LLM Fundamentals

Focused scripts demonstrating core LLM concepts.

- **[Context Window](llm-fundamentals/context-window/)** – Managing and visualizing context window limits.
- **[Tokens](llm-fundamentals/tokens/)** – Understanding tokenization and its impact on costs and limits.
- **[Prompt Caching](llm-fundamentals/prompt-caching/)** – Techniques for caching prompts to reduce latency and cost.
- **[Data Representation](llm-fundamentals/represent-data-as-tokens/)** – Strategies for representing structured data as tokens.
- **[Usage Tracking](llm-fundamentals/usage/)** – Monitoring and calculating token usage.

### 🔧 Context Engineering

Patterns for structuring prompts and context.

- **[Web Agent Context](context-engineering/web/)** – Example system prompt and context configuration for a web-capable agent.

## Getting Started

1.  **Choose an example folder** from the list above.
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```
3.  **Configure Environment**:
    - Copy `.env.example` to `.env` (or `.env.local` depending on the project).
    - Add required keys (usually `ANTHROPIC_API_KEY`).
4.  **Run the project**:
    - For Next.js apps: `pnpm dev`
    - For scripts: `pnpm start` or `npx tsx src/index.ts` (check package.json).

## License

MIT
