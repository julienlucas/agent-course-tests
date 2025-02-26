import { textGeneration } from "@huggingface/inference";

import dotenv from 'dotenv';
dotenv.config();

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

const prompt = `
  <|begin_of_text|><|start_header_id|>user<|end_header_id|>
  La capitale de la France est<|eot_id|><|start_header_id|>assistant<|end_header_id|>
`;

let output = await textGeneration({
  accessToken: HF_ACCESS_TOKEN,
  model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  inputs: prompt,
  stream: false,
  max_new_tokens: 100,
});

console.log(output);