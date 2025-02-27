import yaml
import os
from smolagents import GradioUI, CodeAgent, HfApiModel

# Get current directory path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

from tools.web_search import DuckDuckGoSearchTool as WebSearch
from tools.visit_webpage import VisitWebpageTool as VisitWebpage
from tools.suggest_menu import SimpleTool as SuggestMenu
from tools.catering_service_tool import SimpleTool as CateringServiceTool
from tools.superhero_party_theme_generator import SuperheroPartyThemeTool as SuperheroPartyThemeGenerator
from tools.final_answer import FinalAnswerTool as FinalAnswer



model = HfApiModel(
model_id='Qwen/Qwen2.5-Coder-32B-Instruct',
provider=None,
)

web_search = WebSearch()
visit_webpage = VisitWebpage()
suggest_menu = SuggestMenu()
catering_service_tool = CateringServiceTool()
superhero_party_theme_generator = SuperheroPartyThemeGenerator()
final_answer = FinalAnswer()


with open(os.path.join(CURRENT_DIR, "prompts.yaml"), 'r') as stream:
  prompt_templates = yaml.safe_load(stream)

agent = CodeAgent(
  model=model,
  tools=[web_search, visit_webpage, suggest_menu, catering_service_tool, superhero_party_theme_generator],
  managed_agents=[],
  max_steps=10,
  verbosity_level=2,
  grammar=None,
  planning_interval=None,
  name=None,
  description=None,
  prompt_templates=prompt_templates
)
if __name__ == "__main__":
  GradioUI(agent).launch()