# Represent Data As Tokens (LLM Fundamentals)

This project compares the **token efficiency** of different data serialization formats (Markdown, XML/HTML, and JSON) when preparing data for Large Language Models (LLMs).

Using OpenAI's latest tokenizer, **`o200k_base`** (used by **GPT-4o**), this script demonstrates how the choice of format impacts the number of tokens required to represent the same underlying information.

## 🎯 Objective

In LLM applications, reducing token count is critical for:
- **Cost Efficiency**: Lower API costs.
- **Latency**: Faster generation and processing.
- **Context Window**: Fitting more data into the model's limited memory.

This project empirically measures which format is most efficient for a list of simple data objects.

## 🧪 Experiment

We take a dataset of links (Title + URL) and format it in three ways:
1. **Markdown**: Standard link and image syntax.
2. **XML / HTML**: Semantic tags (`<item>`, `<div>`, `<h1>`).
3. **JSON**: Standard key-value pairs.

### Results (GPT-4o Tokenizer)

| Format | Token Count | Efficiency |
|--------|-------------|------------|
| **JSON** | **142** | ✅ Most Efficient |
| **Markdown** | 178 | ⚠️ Moderate |
| **XML / HTML** | 296 | ❌ Least Efficient |

> **Note**: While Markdown is often preferred for human readability and LLM generation, JSON can be surprisingly token-efficient for structured data due to its minimal syntax overhead compared to verbose HTML tags.

## 🛠️ Tech Stack

- **TypeScript**: Typed implementation with `nodenext` configuration.
- **js-tiktoken**: A JavaScript port of OpenAI's `tiktoken` library.
- **o200k_base**: The encoding rank used by GPT-4o.

## 📦 Installation

Prerequisites: Node.js (v18+)

```bash
git clone <repository_url>
cd represent-data-as-tokens
npm install
```

## 🚀 Usage

Run the analysis script to see the live comparison:

```bash
npm start
```

## 📂 Code Overview

- **`src/data.ts`**: Contains the raw dataset (array of objects with `url` and `title`).
- **`src/main.ts`**:
  - Initializes the `Tiktoken` tokenizer with `o200k_base`.
  - Converts the raw data into Markdown, XML, and JSON strings.
  - Encodes each string into tokens and prints the count.

## 📄 License

ISC
