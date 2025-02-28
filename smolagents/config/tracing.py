import os
import base64

from opentelemetry.sdk.trace import TracerProvider
from openinference.instrumentation.smolagents import SmolagentsInstrumentor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace.export import SimpleSpanProcessor

def setup_tracing():
  LANGFUSE_PUBLIC_KEY="pk-lf-d47707c9-63e2-4353-a910-d857175b11e6"
  LANGFUSE_SECRET_KEY="sk-lf-afcec8c0-8d47-4024-8984-97c2a8d0fcd0"
  LANGFUSE_ENDPOINT="https://cloud.langfuse.com/api/public/otel"
  LANGFUSE_AUTH=base64.b64encode(f"{LANGFUSE_PUBLIC_KEY}:{LANGFUSE_SECRET_KEY}".encode()).decode()

  os.environ["OTEL_EXPORTER_OTLP_ENDPOINT"] = f"{LANGFUSE_ENDPOINT}"
  os.environ["OTEL_EXPORTER_OTLP_HEADERS"] = f"Authorization=Basic {LANGFUSE_AUTH}"

  trace_provider = TracerProvider()
  trace_provider.add_span_processor(SimpleSpanProcessor(OTLPSpanExporter()))

  SmolagentsInstrumentor().instrument(tracer_provider=trace_provider)