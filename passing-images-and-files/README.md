# Passing Images & Files (Next.js 16 + Vercel AI SDK)

A modern, streaming chat application that demonstrates **multi-modal capabilities** (text, images, and files) using the [Vercel AI SDK](https://sdk.vercel.ai/docs) and [Anthropic Claude 3.5 Haiku](https://docs.anthropic.com/en/docs/models-overview).

The application features a polished UI with a custom prompt input, file attachments, and a pirate-themed system prompt to keep things entertaining.

## Features

- **Multi-modal Chat**: Send text, images, and files in a single message.
- **Streaming Responses**: Real-time text streaming from the LLM.
- **Custom Input Component**: A reusable, auto-resizing textarea with file attachment support (`PromptInput`).
- **Modern UI**: Built with Tailwind CSS, customized with animations (shimmer, glow) and a clean design.
- **Pirate Persona**: The default system prompt instructs the model to speak like a pirate (customizable).
- **Next.js 16**: Leveraging the latest Next.js features and App Router.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **AI SDK**: [Vercel AI SDK (Core + React)](https://sdk.vercel.ai/docs) 
- **Model Provider**: [Anthropic](https://anthropic.com) (`claude-3-5-haiku-20241022`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + `tailwindcss-animate`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting/Formatting**: [Biome](https://biomejs.dev/)

## File Structure & How it Works

### Frontend (`app/page.tsx`)
- Uses the `useChat` hook from `@ai-sdk/react` to manage chat state.
- Handles file selection via `FileReader` to convert files to Data URLs.
- Constructs multi-modal messages by defining `parts` (text parts and file parts) before sending them via `sendMessage`.
- Displays attached files with previews and removal options.

### Backend (`app/api/chat/route.ts`)
- An Edge-compatible Route Handler that receives the chat history.
- Uses `convertToModelMessages` to standardise the incoming messages (including file attachments) for the model.
- Calls `streamText` with the Anthropic provider.
- Streams the response back to the client using `createUIMessageStreamResponse`.

### Components
- **`components/ui/prompt-input.tsx`**: A sophisticated input component that handles auto-resizing, file attachments, and loading states. It uses a context-based approach for flexibility.
- **`components/message.tsx`**: Renders the chat messages, supporting markdown rendering via `react-markdown`.
- **`prompts/prompts.ts`**: Contains the system prompt (Pirate persona).

## Prerequisites

- **Node.js 20+**
- **pnpm** (recommended) or npm
- An **Anthropic API Key**

## Setup & Running Locally

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-url>
   cd passing-images-and-files
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your Anthropic API key:
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
| copy | data |
| `pnpm dev` | Start development server with Turbopack |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Check code quality with Biome |
| `pnpm format` | Auto-format code with Biome |
| `pnpm clean` | Remove `.next`, `.turbo`, and `node_modules` |

## Customization

### Changing the Model
To use a different model (e.g., GPT-4o or a different Claude model), update `app/api/chat/route.ts`:

```typescript
import { openai } from "@ai-sdk/openai";

// ... inside POST function
const streamTextResult = streamText({
  model: openai("gpt-4o"), // or anthropic("claude-3-5-sonnet-20240620")
  messages: modelMessages,
});
```

### Changing the Persona
Edit `prompts/prompts.ts` to change the `SYSTEM_PROMPT`.

```typescript
export const SYSTEM_PROMPT = `You are a helpful coding assistant.`;
```

## License

MIT

---

Built with ❤️ by [Anayat](https://anayat.xyz)
