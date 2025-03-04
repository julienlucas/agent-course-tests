from dotenv import load_dotenv
from PIL import Image
from smolagents import CodeAgent, GoogleSearchTool, HfApiModel, VisitWebpageTool
from multi_agent.calculate_cargo_travel_time import calculate_cargo_travel_time

load_dotenv(override=True)

task = """Find all Batman filming locations in the world, calculate the time to transfer via cargo plane to here (we're in Gotham, 40.7128° N, 74.0060° W), and return them to me as a pandas dataframe.
Also give me some supercar factories with the same cargo plane transfer time."""

model = HfApiModel(model_id="Qwen/Qwen2.5-Coder-32B-Instruct", provider="together")

agent = CodeAgent(
  model=model,
  tools=[
    GoogleSearchTool(),
    VisitWebpageTool(),
    calculate_cargo_travel_time
  ],
  additional_authorized_imports=["pandas"],
  max_steps=20
)

result = agent.run(task)
print(result)