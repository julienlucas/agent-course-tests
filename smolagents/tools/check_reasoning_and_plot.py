from smolagents.utils import encode_image_base64, make_image_url
from smolagents import OpenAIServerModel
from PIL import Image
import os

def check_reasoning_and_plot(final_answer, agent_memory):
  final_answer
  multimodal_model = OpenAIServerModel("gpt-4o", max_tokens=8096)
  filepath = "saved_map.png"
  assert os.path.exists(filepath), "Make sure to save the plot under saved_map.png!"
  image = Image.open(filepath)
  prompt = (
    f"Here is a user-given task and the agent steps: {agent_memory.get_succinct_steps()}. Now here is the plot that was made."
    "Please check that the reasoning process and plot are correct: do they correctly answer the given task?"
    "First list reasons why yes/no, then write your final decision: PASS in caps lock if it is satisfactory, FAIL if it is not."
    "Don't be harsh: if the plot mostly solves the task, it should pass."
    "To pass, a plot should be made using px.scatter_map and not any other method (scatter_map looks nicer)."
  )
  messages = [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": prompt,
        },
        {
          "type": "image_url",
          "image_url": {"url": make_image_url(encode_image_base64(image))},
        },
      ],
    }
  ]
  output = multimodal_model(messages).content
  print("Feedback: ", output)
  if "FAIL" in output:
      raise Exception(output)
  return True
