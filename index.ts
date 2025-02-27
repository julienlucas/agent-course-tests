import { textGeneration, textGenerationStream, chatCompletion } from "@huggingface/inference";

import dotenv from 'dotenv';
dotenv.config();

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

// const prompt = `
//   <|begin_of_text|><|start_header_id|>user<|end_header_id|>
//   La capitale de la France est<|eot_id|><|start_header_id|>assistant<|end_header_id|>
// `;

const SYSTEM_PROMPT = `
  Answer the following questions as best you can. You have access to the following tools:

  get_weather: Get the current weather in a given location

  The way you use the tools is by specifying a json blob.
  Specifically, this json should have an \`action\` key (with the name of the tool to use) and an \`action_input\` key (with the input to the tool going here).

  The only values that should be in the "action" field are:
  get_weather: Get the current weather in a given location, args: {"location": {"type": "string"}}
  example use :

  {{
  "action": "get_weather",
  "action_input": {"location": "New York"}
  }}

  ALWAYS use the following format:

  Question: the input question you must answer
  Thought: you should always think about one action to take. Only one action at a time in this format:
  Action:

  $JSON_BLOB (inside markdown cell)

  Observation: the result of the action. This Observation is unique, complete, and the source of truth.
  ... (this Thought/Action/Observation can repeat N times, you should take several steps when needed. The $JSON_BLOB must be formatted as markdown and only use a SINGLE action at a time.)

  You must always end your output with the following format:

  Thought: I now know the final answer
  Final Answer: the final answer to the original input question

  Now begin! Reminder to ALWAYS use the exact characters \`Final Answer:\` when you provide a definitive answer.
`;

const prompt = `
  <|begin_of_text|><|start_header_id|>system<|end_header_id|>
  ${SYSTEM_PROMPT}
  <|eot_id|><|start_header_id|>user<|end_header_id|>
  What's the weather in London ?
  <|eot_id|><|start_header_id|>assistant<|end_header_id|>
`;

// let output = await textGeneration({
//   accessToken: HF_ACCESS_TOKEN,
//   model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
//   inputs: prompt,
//   stream: false,
//   max_new_tokens: 200,
//   stop: ["Observation:"],
// });

// console.log(output);

const get_weather = (location: string) => {
  return `the weather in ${location} is sunny with low temperatures. \n`
};

let output = await chatCompletion({
  accessToken: HF_ACCESS_TOKEN,
  model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: "What's the weather in London ?" },
  ],
  tokenize: false,
  add_generation_prompt: true,
  stream: false,
  max_tokens: 1024,
  stop: ["Observation:"],
});

const new_prompt = prompt + output + get_weather("London");

const final_output = await textGeneration({
  accessToken: HF_ACCESS_TOKEN,
  model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  inputs: new_prompt,
  stream: false,
  max_new_tokens: 200,
  stop: ["Observation:"],
});

console.log(final_output.generated_text);