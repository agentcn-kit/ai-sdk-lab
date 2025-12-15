# Context Window Stress Test (LLM Fundamentals)

This project demonstrates the **massive context window** capabilities of **Google's Gemini 2.0 Flash Lite** by programmatically generating a large input and sending it to the model via the Vercel AI SDK.

## 🎯 Objective

Modern LLMs like Gemini 1.5 Pro and Gemini 2.0 Flash have extended context windows (up to 1M or 2M tokens). This script:
1.  Generates a synthetic dataset of **~10 million items**.
2.  Calculates the token count locally using `js-tiktoken` (using `o200k_base` as a reference tokenizer).
3.  Sends this massive prompt to `gemini-2.0-flash-lite` to verify it can accept and process the input without error.

## 🚀 Features

- **Google Gemini Integration**: Uses `@ai-sdk/google` to access the `gemini-2.0-flash-lite` model.
- **Massive Payload Generation**: efficiently creates a multi-million token string in memory.
- **Local Token Estimation**: Uses `js-tiktoken` to estimate the payload size before sending.
- **Error Handling**: Configures `maxRetries: 0` to fail fast if the limit is exceeded.

## 🛠️ Prerequisites

- **Node.js** (Latest LTS recommended)
- **Google Generative AI API Key**: You need an active API key from [Google AI Studio](https://aistudio.google.com/).

## 📦 Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env` file in the root directory and add your Google API Key:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...
   ```

## 🏃‍♂️ Usage

1. **Run the Script**:
   ```bash
   npm start
   ```

2. **What Happens**:
   - The script will pause while it generates the massive string in memory.
   - It will print the local token count estimation.
   - It will attempt to send the request to Google.
   - If successful, the script completes (or errors if the limit is hit).

   **Example Output:**
   ```text
   Tokens length: 10000000
   ```

## 🧠 Code Overview

The core logic is in [`src/main.ts`](./src/main.ts):

- **Data Generation**: A loop appends "foo " to a string 10,000,000 times.
- **Tokenization**: We use `js-tiktoken` to count the tokens of this generated string.
- **AI Request**: `generateText` sends this massive prompt to `google('gemini-2.0-flash-lite')`.

>**Note on Tokenizers**: We use `o200k_base` (GPT-4o tokenizer) for local counting as a proxy. While Gemini uses a different tokenizer, this gives us a consistent "unit" of measurement for the payload size.
