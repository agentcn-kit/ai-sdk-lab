# Streaming UI Demo (Next.js 16 + Vercel AI SDK)

Simple chat experience that streams Anthropic responses into the UI using the Vercel AI SDK, with a custom prompt that keeps the bot talking like a pirate.


https://github.com/user-attachments/assets/d76e3393-411d-4dc7-a2c6-15ac1e282f4c



## How it works (quick tour)

- `app/page.tsx` – client page using `useChat` to manage state and send messages. UI supports file selection (not yet forwarded to the API) and a compact composer with enter-to-send UX.
- `components/ui/prompt-input.tsx` – shared input shell with autosizing textarea, action buttons, and tooltips.
- `components/message.tsx` – renders streamed text parts with `ReactMarkdown`.
- `app/api/chat/route.ts` – server Route Handler that converts UI messages, calls `streamText` with `anthropic("claude-3-5-haiku-20241022")`, applies the system prompt, and returns a streaming response.
- `prompts/prompts.ts` – pirate system prompt used for every reply.

```12:24:app/page.tsx
const { messages, sendMessage, status } = useChat({});
...
<PromptInputTextarea
  placeholder="Ask me anything about streaming, UI patterns, or the SDK..."
/>
```

```12:25:app/api/chat/route.ts
const streamTextResult = streamText({
  model: anthropic("claude-3-5-haiku-20241022"),
  messages: modelMessages,
  system: SYSTEM_PROMPT,
});
```

## Prerequisites

- Node.js 20+
- pnpm (recommended) or npm
- An Anthropic API key with access to `claude-3-5-haiku-20241022`

## Setup & run locally

1) Install deps  
`pnpm install`

2) Add environment variables in `.env.local`  
`ANTHROPIC_API_KEY=your_key_here`

3) Start the dev server  
`pnpm dev`  
Then open `http://localhost:3000`.

## Usage

- Type a prompt and press Enter to send (Shift+Enter for a newline).  
- The model always responds in pirate-speak per the system prompt.  
- File pickers only update local UI today; adjust the API route if you want to upload or forward them.

## Common commands

- `pnpm dev` – run locally with Turbopack  
- `pnpm lint` – Biome lint/format check  
- `pnpm format` – auto-format with Biome  
- `pnpm build` / `pnpm start` – production build and serve  
- `pnpm clean` – remove build artifacts

## Customization

- Swap the model/provider in `app/api/chat/route.ts` (e.g., OpenAI/Google via the AI SDK adapters).  
- Change the system prompt in `prompts/prompts.ts`.  
- Extend `Message` to render images/tools, or forward uploaded files through the API.

## License

MIT

---

Built with ❤️ by [Anayat](https://anayat.xyz)
