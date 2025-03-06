from dotenv import load_dotenv
from smolagents import CodeAgent, GoogleSearchTool, HfApiModel, VisitWebpageTool
from tools.calculate_cargo_travel_time import calculate_cargo_travel_time
from tools.check_reasoning_and_plot import check_reasoning_and_plot

load_dotenv(override=True)

task = """Find all Batman filming locations in the world, calculate the time to transfer via cargo plane to here (we're in Gotham, 40.7128° N, 74.0060° W), and return them to me as a pandas dataframe.
Also give me some supercar factories with the same cargo plane transfer time."""
# task = """Tu es un gamer. Tu joue aux jeux vidéo. Trouves-moi la soluce en ligne sur le livre de nécromentie ou nécromentien dans le jeu vidéo Baldur's Gate 3, et donnes-moi la solution pour déchifrer ce livre. Donnes-moi non pas une liste de liens, mais directement les étapes à suivre pour déchiffrer ce livre."""

model = HfApiModel(model_id="Qwen/Qwen2.5-Coder-32B-Instruct", provider="together", max_tokens=8096)

agent = CodeAgent(
  model=model,
  tools=[
    GoogleSearchTool(),
    VisitWebpageTool(),
    calculate_cargo_travel_time
  ],
  name="web_agent",
  description="Browses the web to find information",
  additional_authorized_imports=["pandas"],
  max_steps=10
)

manager_agent = CodeAgent(
  model=HfApiModel("deepseek-ai/DeepSeek-R1", provider="together", max_tokens=8096),
  tools=[calculate_cargo_travel_time],
  managed_agents=[agent],
  additional_authorized_imports=[
    "geopandas",
    "plotly",
    "shapely",
    "json",
    "pandas",
    "numpy",
  ],
  planning_interval=5,
  verbosity_level=2,
  final_answer_checks=[check_reasoning_and_plot],
  max_steps=15,
)

# manager_agent.visualize()

manager_agent.run("""
  Find all Batman filming locations in the world, calculate the time to transfer via cargo plane to here (we're in Gotham, 40.7128° N, 74.0060° W).
  Also give me some supercar factories with the same cargo plane transfer time. You need at least 6 points in total.
  Represent this as spatial map of the world, with the locations represented as scatter points with a color that depends on the travel time, and save it to saved_map.png!

  Here's an example of how to plot and return a map:
  import plotly.express as px
  df = px.data.carshare()
  fig = px.scatter_map(df, lat="centroid_lat", lon="centroid_lon", text="name", color="peak_hour", size=100,
      color_continuous_scale=px.colors.sequential.Magma, size_max=15, zoom=1)
  fig.show()
  fig.write_image("saved_image.png")
  final_answer(fig)

  Never try to process strings using code: when you have a string to read, just print it and you'll see it.
""")

# manager_agent.python_executor.state["fig"]