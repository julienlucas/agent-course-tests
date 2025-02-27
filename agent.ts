import { HfAgent, LLMFromHub, defaultTools } from "@huggingface/agents";
import type { Tool } from "@huggingface/agents/src/types";
import dotenv from "dotenv";

dotenv.config();

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

// define the tool
const uppercaseTool: Tool = {
  name: "uppercase",
  description: "uppercase the input string and returns it ",
  examples: [
    {
      prompt: "uppercase the string: hello world",
      code: `const output = uppercase("hello world")`,
      tools: ["uppercase"],
    },
  ],
  call: async (input) => {
    const data = await input;
    if (typeof data !== "string") {
      throw new Error("Input must be a string");
    }
    return data.toUpperCase();
  },
};

// pass it in the agent
const agent = new HfAgent(
  HF_ACCESS_TOKEN,
  LLMFromHub(HF_ACCESS_TOKEN, "mistralai/Mixtral-8x7B-Instruct-v0.1"),
  [uppercaseTool, ...defaultTools]
);

//// you can generate the code, inspect it and then run it
// const code = await agent.generateCode(
//   "What is the capital of France?"
// );
// console.log(code);
// const messages = await agent.evaluateCode(code);
// console.log(messages); // contains the data

// or you can run the code directly, however you can't check that the code is safe to execute this way, use at your own risk.
const messages = await agent.run("What is the capital of France?");
console.log(messages);