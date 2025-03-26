import asyncio
import random
from llama_index.core.workflow import Context, Event, StartEvent, StopEvent, Workflow, step
from llama_index.utils.workflow import draw_all_possible_flows


class ProcessingEvent(Event):
    intermediate_result: str

class LoopEvent(Event):
    loop_output: str

class MyWorkflow(Workflow):
    @step
    async def query(self, ctx: Context, ev: StartEvent) -> StopEvent:
        # store query in the context
        await ctx.set("query", "What is the capital of France?")

        # do something with context and event
        val = ...

        # retrieve query from the context
        query = await ctx.get("query")
        return StopEvent(result=val)

    @step
    async def step_one(self, ev: StartEvent | LoopEvent) -> ProcessingEvent | LoopEvent:
        if random.randint(0, 1) == 0:
            print("Bad thing happened")
            return LoopEvent(loop_output="Back to step one.")
        else:
            print("Good thing happened")
            return ProcessingEvent(intermediate_result="First step complete.")

    @step
    async def step_two(self, ev: ProcessingEvent) -> StopEvent:
        # Use the intermediate result
        final_result = f"Finished processing: {ev.intermediate_result}"
        return StopEvent(result=final_result)


async def main():
    w = MyWorkflow(timeout=10, verbose=False)
    result = await w.run()
    draw_all_possible_flows(w, "./llama-index/flow.html")
    return print(result)

# Lancer main en asynchrone
if __name__ == "__main__":
    asyncio.run(main())