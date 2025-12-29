# LLM as a Judge with Evalite

A focused example project demonstrating how to use an "LLM as a Judge" evaluator using [Evalite](https://evalite.dev) and the [Vercel AI SDK](https://sdk.vercel.ai/).

This specific example evaluates a model's ability to answer questions about the "Chain of Thought Prompting" paper, ensuring it provides accurate attributions and quotes.

## Features

- **Efficient Evaluation**: Uses `evalite` for fast, real-time evaluation feedback.
- **AI SDK Integration**: Seamlessly works with `@ai-sdk/anthropic` to generate text for evaluation.
- **Scorers**:
  - **Includes Quotes**: A deterministic scorer that checks if the output contains quotes (`"`) as requested by the system prompt.
  - **Attribution (LLM as a Judge)**: Uses an LLM (Claude 3.5 Haiku) to grade the answer on a scale from A-D based on whether it is backed up by the paper's content.

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

The project includes an evaluation (`src/question-answerer.eval.ts`) that tests a model's ability to answer questions about the CoT paper.

- **Inputs**:
  - "What is chain of thought prompting?"
  - "Why do the authors of the paper think that chain of thought prompting produces improvements?"
- **Context**: The model is provided with the `chain-of-thought-prompting.pdf` file.
- **System Prompt**: "ALWAYS use quotes from the paper when answering the question."
- **Scoring**:
  1. **Includes Quotes**: Pass/Fail based on presence of quotes.
  2. **Attribution**: LLM-based grading:
     - **A (1.0)**: Use accurate sources/backups.
     - **B (0.5)**: Somewhat backed up or misattributed.
     - **C (0.0)**: Misconstrues intention.
     - **D (0.0)**: No sources provided.

## License

ISC
