# Tokenization Example (LLM Fundamentals)

A minimal, focused example demonstrating how to tokenize text for Large Language Models (LLMs) using TypeScript and [`js-tiktoken`](https://github.com/dqbd/tiktoken).

This project specifically demonstrates the **`o200k_base`** encoding, which is the tokenizer used by OpenAI's latest flagship model, **GPT-4o**.

## 🚀 Features

- **GPT-4o Tokenizer**: Uses the state-of-the-art `o200k_base` encoding rank.
- **TypeScript Support**: Fully typed implementation with modern TS configuration (`nodenext`).
- **File Processing**: Automatically reads and tokenizes text from a local markdown file.
- **Analysis Stats**: reports character counts vs. token counts to demonstrate compression ratios.

## 🛠️ Prerequisites

- **Node.js** (Latest LTS recommended)
- **npm** (comes with Node.js)

## 📦 Installation

Clone the repository and install the dependencies:

```bash
npm install
```

## 🏃‍♂️ Usage

1. **Prepare Input**:
   Ensure you have your text in `src/input.md`. You can edit this file to test different text inputs.

2. **Run the Script**:
   Execute the tokenizer using the start script:

   ```bash
   npm start
   ```

3. **View Output**:
   The script will print the results to your console:
   - Total character length.
   - Total token count.
   - A raw array of the generated token integers (truncated for readability).

   **Example Output:**
   ```text
   Content length in characters: 2295
    Number of tokens: 484
    [
        2,   623, 101774, 131147,
        ...
    ]
   ```

## 🧠 How It Works

The core logic is located in [`src/main.ts`](./src/main.ts):

1. **Initialization**: We import `Tiktoken` and the `o200k_base` rank arrays.
2. **Setup**: A `tokenizer` instance is created specifically for the GPT-4o model family.
3. **Execution**: The script reads `src/input.md` from the disk, encodes the string into token integers, and logs the analysis.

## 📄 License

This project is licensed under the ISC License.
