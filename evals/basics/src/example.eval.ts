import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { evalite } from 'evalite';

evalite('Capitals', {
  data: () => [
    {
      input: 'What is the capital of France?',
      expected: 'Paris',
    },
    {
      input: 'What is the capital of Germany?',
      expected: 'Berlin',
    },
    {
      input: 'What is the capital of Italy?',
      expected: 'Rome',
    },
  ],
  task: async (input) => {
    const capitalResult = await generateText({
      model: anthropic('claude-3-5-haiku-20241022'),
      prompt: `
        You are a helpful assistant that can answer questions about the capital of countries.

        <question>
        ${input}
        </question>

        Answer the question.
        Reply only with the capital of the country.
      `,
    });

    return capitalResult.text;
  },
  scorers: [
    {
      name: 'includes',
      scorer: ({ input, output, expected }) => {
        return output.includes(expected!) ? 1 : 0;
      },
    },
  ],
});
