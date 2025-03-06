import { textGeneration, chatCompletion } from "@huggingface/inference";
import dotenv from 'dotenv';

dotenv.config();

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;

// const prompt = `
//   <|begin_of_text|><|start_header_id|>user<|end_header_id|>
//   La capitale de la France est<|eot_id|><|start_header_id|>assistant<|end_header_id|>
// `;

const SYSTEM_PROMPT = `
  Réponds aux questions suivantes du mieux que tu peux. Tu as accès aux outils suivants :

  get_weather : Obtenir la météo actuelle pour un lieu donné

  La manière d’utiliser ces outils consiste à spécifier un objet JSON.
  Plus précisément, ce JSON doit comporter une clé \`action\` (contenant le nom de l’outil à utiliser) et une clé \`action_input\` (contenant l’entrée pour l’outil ici).

  Les seules valeurs possibles pour le champ "action" sont :
  get_weather : Obtenir la météo actuelle pour un lieu donné, args: {"location": {"type": "string"}}
  Exemple d’utilisation :

  {{
  "action": "get_weather",
  "action_input": {"location": "New York"}
  }}

  UTILISE TOUJOURS le format suivant :

  Question : la question d'entrée à laquelle tu dois répondre
  Thought : tu dois toujours réfléchir à une action à entreprendre. Une seule action à la fois dans ce format :
  Action:

  $JSON_BLOB (à l'intérieur d'une cellule markdown)

  Observation : le résultat de l'action. Cette Observation est unique, complète, et constitue la source de vérité.
  ... (cette séquence Thought/Action/Observation peut se répéter N fois, tu dois effectuer plusieurs étapes si nécessaire. Le $JSON_BLOB doit être formaté en markdown et n'utiliser qu'une SEULE action à la fois.)

  Tu dois toujours terminer ta sortie avec le format suivant :

  Thought : Je connais maintenant la réponse finale
  Final Answer: la réponse finale à la question d'entrée initiale

  Commence maintenant ! Rappel : UTILISE TOUJOURS les caractères exacts \`Final Answer:\` lorsque tu fournis une réponse définitive.
`;

const prompt = `
  <|begin_of_text|><|start_header_id|>system<|end_header_id|>
  ${SYSTEM_PROMPT}
  <|eot_id|><|start_header_id|>user<|end_header_id|>
  Quel est le temps à Paris?
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
  return `le temps à ${location} est ensoleillé avec des températures basses. \n`
};

let output = await chatCompletion({
  accessToken: HF_ACCESS_TOKEN,
  model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
  messages: [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: "Quel est le temps à Paris ?" },
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