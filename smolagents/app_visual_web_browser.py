import argparse
import helium
from dotenv import load_dotenv
from selenium import webdriver

from smolagents import CodeAgent, DuckDuckGoSearchTool, OpenAIServerModel
from smolagents.cli import load_model
from tools.search_item_ctrl_f import search_item_ctrl_f, go_back, close_popups
from tools.save_screenshot import save_screenshot

# load_dotenv(override=True)

# image_urls = [
#   "https://upload.wikimedia.org/wikipedia/commons/e/e8/The_Joker_at_Wax_Museum_Plus.jpg", # Joker image
#   "https://upload.wikimedia.org/wikipedia/en/9/98/Joker_%28DC_Comics_character%29.jpg" # Joker image
# ]

# images = []
# for url in image_urls:
#   response = requests.get(url)
#   image = Image.open(BytesIO(response.content)).convert("RGB")
#   images.append(image)

# Instantiate the agent
# agent = CodeAgent(
#   tools=[DuckDuckGoSearchTool(), go_back, close_popups, search_item_ctrl_f],
#   model=model,
#   additional_authorized_imports=["helium"],
#   step_callbacks=[save_screenshot],
#   max_steps=20,
#   verbosity_level=2,
# )

helium_instructions = """
  Use your web_search tool when you want to get Google search results.
  Then you can use helium to access websites. Don't use helium for Google search, only for navigating websites!
  Don't bother about the helium driver, it's already managed.
  We've already ran "from helium import *"
  Then you can go to pages!
  Code:
  ```py
  go_to('github.com/trending')
  ```<end_code>

  You can directly click clickable elements by inputting the text that appears on them.
  Code:
  ```py
  click("Top products")
  ```<end_code>

  If it's a link:
  Code:
  ```py
  click(Link("Top products"))
  ```<end_code>

  If you try to interact with an element and it's not found, you'll get a LookupError.
  In general stop your action after each button click to see what happens on your screenshot.
  Never try to login in a page.

  To scroll up or down, use scroll_down or scroll_up with as an argument the number of pixels to scroll from.
  Code:
  ```py
  scroll_down(num_pixels=1200) # This will scroll one viewport down
  ```<end_code>

  When you have pop-ups with a cross icon to close, don't try to click the close icon by finding its element or targeting an 'X' element (this most often fails).
  Just use your built-in tool `close_popups` to close them:
  Code:
  ```py
  close_popups()
  ```<end_code>

  You can use .exists() to check for the existence of an element. For example:
  Code:
  ```py
  if Text('Accept cookies?').exists():
      click('I accept')
  ```<end_code>

  Proceed in several steps rather than trying to solve the task in one shot.
  And at the end, only when you have your answer, return your final answer.
  Code:
  ```py
  final_answer("YOUR_ANSWER_HERE")
  ```<end_code>

  If pages seem stuck on loading, you might have to wait, for instance `import time` and run `time.sleep(5.0)`. But don't overuse this!
  To list elements on page, DO NOT try code-based element searches like 'contributors = find_all(S("ol > li"))': just look at the latest screenshot you have and read it visually, or use your tool search_item_ctrl_f.
  Of course, you can act on buttons like a user would do when navigating.
  After each code blob you write, you will be automatically provided with an updated screenshot of the browser and the current browser url.
  But beware that the screenshot will only be taken at the end of the whole action, it won't see intermediate states.
  Don't kill the browser.
  When you have modals or cookie banners on screen, you should get rid of them before you can click anything else.
"""

# response = agent.run("""
# I am Alfred, the butler of Wayne Manor, responsible for verifying the identity of guests at party. A superhero has arrived at the entrance claiming to be Wonder Woman, but I need to confirm if she is who she says she is.

# Please search for images of Wonder Woman and generate a detailed visual description based on those images. Additionally, navigate to Wikipedia to gather key details about her appearance. With this information, I can determine whether to grant her access to the event.
# """ + helium_instructions)

alfred_guest_list_request = """
  I am Alfred, the butler of Wayne Manor, responsible for verifying the identity of guests at party. A superhero has arrived at the entrance claiming to be Wonder Woman, but I need to confirm if she is who she says she is.
  Please search for images of Wonder Woman and generate a detailed visual description based on those images. Additionally, navigate to Wikipedia to gather key details about her appearance. With this information, I can determine whether to grant her access to the event.
"""

def parse_arguments():
  parser = argparse.ArgumentParser(description="Run a web browser automation script with a specified model.")
  parser.add_argument(
    "prompt",
    type=str,
    nargs="?",  # Makes it optional
    default=alfred_guest_list_request,
    help="The prompt to run with the agent",
  )
  parser.add_argument(
    "--model-type",
    type=str,
    default="LiteLLMModel",
    help="The model type to use (e.g., OpenAIServerModel, LiteLLMModel, TransformersModel, HfApiModel)",
  )
  parser.add_argument(
    "--model-id",
    type=str,
    default="gpt-4o",
    help="The model ID to use for the specified model type",
  )
  return parser.parse_args()

def initialize_driver():
  """Initialize the Selenium WebDriver."""
  chrome_options = webdriver.ChromeOptions()
  chrome_options.add_argument("--force-device-scale-factor=1")
  chrome_options.add_argument("--window-size=1000,1350")
  chrome_options.add_argument("--disable-pdf-viewer")
  chrome_options.add_argument("--window-position=0,0")
  return helium.start_chrome(headless=False, options=chrome_options)

def initialize_agent(model):
  """Initialize the CodeAgent with the specified model."""

  return CodeAgent(
    tools=[DuckDuckGoSearchTool(), go_back, close_popups, search_item_ctrl_f],
    model=model,
    additional_authorized_imports=["helium"],
    step_callbacks=[save_screenshot],
    max_steps=20,
    verbosity_level=2,
  )

def main():
  # Load environment variables
  load_dotenv()

  # Parse command line arguments
  args = parse_arguments()

  # Initialize the model based on the provided arguments
  model = OpenAIServerModel(model_id="gpt-4o")

  global driver
  driver = initialize_driver()
  agent = initialize_agent(model)

  # Run the agent with the provided prompt
  agent.python_executor("from helium import *", agent.state)
  agent.run(args.prompt + helium_instructions)

if __name__ == "__main__":
  main()