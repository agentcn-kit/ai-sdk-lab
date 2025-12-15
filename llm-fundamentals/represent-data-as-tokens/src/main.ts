import { Tiktoken } from "js-tiktoken/lite";
import o200k_base from "js-tiktoken/ranks/o200k_base";
import {DATA} from "../src/data.ts"
const tokenizer = new Tiktoken(
  // NOTE: o200k_base is the tokenizer for GPT-4o
  o200k_base
);

const tokenize = (text: string) => {
  return tokenizer.encode(text);
};


const asXML = DATA.map(
  (item) =>
    `<item url="${item.url}" title="${item.title}"></item>
     <div>
      <img src="${item.url}" />
      <h1>${item.title}</h1>
   </div>
  `
).join("\n");

const asJSON = JSON.stringify(DATA, null, 2);

const asMarkdown = DATA.map(
  (item) => `- [${item.title}](${item.url})
    # ${item.title}
    ![${item.title}](${item.url})
  `
).join("\n");

console.log("Markdown tokens:", tokenize(asMarkdown).length);
console.log(asMarkdown);
console.log("--------------------------------");
console.log("XML tokens:", tokenize(asXML).length);
console.log(asXML);
console.log("--------------------------------");
console.log("JSON tokens:", tokenize(asJSON).length);
console.log(asJSON);
