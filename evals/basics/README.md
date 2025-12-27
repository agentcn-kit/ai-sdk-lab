# Evals

A focused example project demonstrating how to evaluate Large Language Model (LLM) outputs using [Evalite](https://evalite.dev) and the [Vercel AI SDK](https://sdk.vercel.ai/).

## Features

- **Efficient Evaluation**: Uses `evalite` for fast, real-time evaluation feedback.
- **AI SDK Integration**: Seamlessly works with `@ai-sdk/anthropic` to generate text for evaluation.
- **Custom Scorers**: Demonstrates how to write custom scoring functions (e.g., checking if the output includes the expected answer).

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

The project includes an example evaluation (`evals/example.eval.ts`) that tests a model's ability to identify country capitals.

- **Input**: "What is the capital of [Country]?"
- **Expected Output**: The capital city.
- **Scorer**: Checks if the model's output includes the expected capital.

## License

ISC
