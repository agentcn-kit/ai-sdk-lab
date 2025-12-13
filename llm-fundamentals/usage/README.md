# Token Usage Example (LLM Fundamentals)

This example demonstrates how to generate text using the **Vercel AI SDK** with **Anthropic's Claude** model, while specifically focusing on **streaming responses** and **monitoring token usage**.

It uses `claude-3-5-haiku-20241022` to answer a prompt and reports the exact number of tokens used for the request (prompt) and the response (completion).

## 🚀 Features

- **Vercel AI SDK Core**: Uses `streamText` for efficient text generation.
- **Anthropic Integration**: Connects to Claude 3.5 Haiku via `@ai-sdk/anthropic`.
- **Real-time Streaming**: Streams the text output directly to the console as it generates.
- **Token Usage Analytics**: captures and displays the total token consumption (prompt vs. completion) after generation.

## 🛠️ Prerequisites

- **Node.js** (Latest LTS recommended)
- **Anthropic API Key**: You need an active API key from [Anthropic Console](https://console.anthropic.com/).

## 📦 Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and add your Anthropic API Key:
   ```env
   ANTHROPIC_API_KEY=sk-ant-...
   ```

## 🏃‍♂️ Usage

Run the application:

```bash
npm start
```

### Expected Output

1. **The content** will stream to your terminal:
   > Germany is widely considered the country that makes the best sausages, boasting over 1,500 distinct varieties...

2. **The usage stats** will be printed at the end:
   ```js
   {
     promptTokens: 18,
     completionTokens: 85,
     totalTokens: 103
   }
   ```

## 🧠 Code Overview

The logic is contained in [`src/main.ts`](./src/main.ts):

- **`streamText`**: Initiates the request to the model.
- **`process.stdout.write`**: Writes each text chunk immediately to standard out, creating the streaming effect.
- **`await output.usage`**: Retreives the final token counts from the provider once the stream is complete.
