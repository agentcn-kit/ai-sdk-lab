# Deterministic Evals with Evalite

A focused example project demonstrating how to run deterministic evaluations on Large Language Model (LLM) outputs using [Evalite](https://evalite.dev) and the [Vercel AI SDK](https://sdk.vercel.ai/).

This specific example evaluates a model's ability to answer questions about TypeScript release notes succinctly and with correct markdown links.

## Features

- **Efficient Evaluation**: Uses `evalite` for fast, real-time evaluation feedback.
- **AI SDK Integration**: Seamlessly works with `@ai-sdk/anthropic` to generate text for evaluation.
- **Deterministic Scorers**:
  - **Includes Markdown Links**: Checks if the output contains valid markdown links using Regex.
  - **Output length**: Verifies that the answer is succinct (under 500 characters).

## Prerequisites

- **Node.js** (Latest LTS recommended)
- **Anthropic API Key**: Required for the `claude-3-5-haiku-20241022` model.

## Installation

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and add your Anthropic API key:

   ```env
   ANTHROPIC_API_KEY=your_key_here
   ```

## Usage

Run the evaluation script in watch mode:

```bash
npm run eval:dev
```

This will start the Evalite runner, where you can view your evaluation results in real-time.

### Example Evaluation

The project includes an example evaluation (`src/example.eval.ts`) that tests a model's ability to provide information about TypeScript releases.

- **Tasks**:
  - "Tell me about the TypeScript 5.8 release"
  - "Tell me about the TypeScript 5.2 release"
- **Context**: The model is provided with a list of TypeScript release note URLs.
- **Scorers**:
  1. **Includes Markdown Links**: Pass if the regex `\[.*?\]\((.*?)\)` finds matches.
  2. **Output length**: Pass if the response length is < 500 characters.

## License

ISC
