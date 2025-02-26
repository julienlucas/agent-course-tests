"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inference_1 = require("@huggingface/inference");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;
var result = await (0, inference_1.textGeneration)({
    accessToken: HF_ACCESS_TOKEN,
    model: "gpt2",
    inputs: "La capitale de la France est",
    max_new_tokens: 100,
});
console.log(result);
/* { generated_text: 'The answer to the universe is not to be found in the universe itself, but in the universe itself' } */ 
