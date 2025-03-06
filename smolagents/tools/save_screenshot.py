from PIL import Image
from smolagents import CodeAgent, ActionStep, tool
import helium
from io import BytesIO
from time import sleep

def save_screenshot(step_log: ActionStep, agent: CodeAgent) -> None:
  sleep(1.0)  # Let JavaScript animations happen before taking the screenshot
  driver = helium.get_driver()
  current_step = step_log.step_number
  if driver is not None:
      for step_logs in agent.logs:  # Remove previous screenshots from logs for lean processing
          if isinstance(step_log, ActionStep) and step_log.step_number <= current_step - 2:
              step_logs.observations_images = None
      png_bytes = driver.get_screenshot_as_png()
      image = Image.open(BytesIO(png_bytes))
      print(f"Captured a browser screenshot: {image.size} pixels")
      step_log.observations_images = [image.copy()]  # Create a copy to ensure it persists, important!

  # Update observations with current URL
  url_info = f"Current url: {driver.current_url}"
  step_log.observations = url_info if step_logs.observations is None else step_log.observations + "\n" + url_info
  return
