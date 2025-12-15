# Prompt Caching Simulation (LLM Fundamentals)

A minimal, focused example demonstrating the concept of **Prompt Caching** in Large Language Models (LLMs) using TypeScript and [`js-tiktoken`](https://github.com/dqbd/tiktoken).

This project simulates how an LLM provider might detect and reuse cached tokens when a user's prompt shares a common prefix with a previously processed request. It uses the **`o200k_base`** encoding (GPT-4o).

## 🚀 Features

- **Cache Hit Simulation**: logic to detect shared token prefixes between requests.
- **Visual Output**: Uses terminal colors to distinguish between **cached** (green) and **uncached** (red) tokens.
- **GPT-4o Tokenizer**: Uses the state-of-the-art `o200k_base` encoding rank.
- **TypeScript Support**: Fully typed implementation with modern TS configuration.

## 🛠️ Prerequisites

- **Node.js** (Latest LTS recommended)
- **npm** (comes with Node.js)

## 📦 Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## 🏃‍♂️ Usage

1. **Run the Script**:
   Execute the simulation using the start script:

   ```bash
   npm start
   ```

2. **View Output**:
   The script will print the number of cached tokens and the reconstructed text:
   - **Green Text**: Represents the part of the prompt that was found in the "cache" (processed without re-tokenizing/computing).
   - **Red Text**: Represents the new part of the prompt that needed to be processed.

   **Example Output:**
   ```text
   Cached tokens: 30
   On the edge of a violet nebula drifts Aeloria, an imaginary planet where gravity hums softly and the sky shifts color with the planet’s mood. What a story
   ```
   *(Note: In your terminal, the first sentence will be green, and "What a story" will be red.)*

## 🧠 How It Works

The core logic is located in [`src/main.ts`](./src/main.ts):

1. **Setup**: We initialize a tokenizer for the GPT-4o model (`o200k_base`).
2. **Mock Cache**: We define a `tokensInCache` array representing a previously processed prompt.
3. **Comparison**: When a new prompt (`inputTokens`) is received, the script iterates through the tokens to find the length of the matching prefix.
4. **Visualization**:
   - Matches are treated as "cached" (Green).
   - The remainder is treated as "new/uncached" (Red).

This simple integer comparison demonstrates the fundamental mechanism behind prompt caching optimizations used by LLM providers to reduce latency and costs.

## 📄 License

This project is licensed under the ISC License.
