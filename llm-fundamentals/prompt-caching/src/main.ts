import { Tiktoken } from 'js-tiktoken/lite';
import o200k_base from 'js-tiktoken/ranks/o200k_base';
import { styleText } from 'util';

const tokenizer = new Tiktoken(
  // NOTE: o200k_base is the tokenizer for GPT-4o
  o200k_base,
);

const tokenize = (text: string) => {
  return tokenizer.encode(text);
};

const tokensInCache = tokenize(
  `On the edge of a violet nebula drifts Aeloria, an imaginary planet where gravity hums softly and the sky shifts color with the planet’s mood.`,
);

console.log("TokenizeCache", tokensInCache)

/**
 * 
 * TokenizeCache [
    976,  4853, 19705,
  68347, 65613,  1072,
    290, 29082,  6446
]

TokenizeCache [
     51,   976,  4853,
  19705, 68347, 65613,
   1072,   290, 29082,
   6446
]
 */
const inputTokens = tokenize(
  // NOTE: Change this to change what the input is
  `On the edge of a violet nebula drifts Aeloria, an imaginary planet where gravity hums softly and the sky shifts color with the planet’s mood. What a story`,
);

let numberOfMatchingTokens = 0;
for (let i = 0; i < inputTokens.length; i++) {
  if (inputTokens[i] === tokensInCache[i]) {
    numberOfMatchingTokens++;
  } else {
    break;
  }
}

// The cached and uncached tokens
const cachedTokens = tokensInCache.slice(
  0,
  numberOfMatchingTokens,
);
const uncachedTokens = inputTokens.slice(numberOfMatchingTokens);

// The cached and uncached output text
const cachedText = tokenizer.decode(cachedTokens);
const uncachedText = tokenizer.decode(uncachedTokens);

console.log('Cached tokens:', cachedTokens.length);
console.log(
  styleText(['bold', 'green'], cachedText) +
    styleText(['red'], uncachedText),
);
