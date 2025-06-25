from __future__ import annotations

import time
from typing import Callable

from loguru import logger
from opentelemetry import trace
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response


class ObservabilityMiddleware(BaseHTTPMiddleware):
    """Capture response times and trace identifiers."""

    async def dispatch(
        self, request: Request, call_next: Callable[[Request], Response]
    ) -> Response:
        tracer = trace.get_tracer("app.middleware")
        with tracer.start_as_current_span(f"{request.method} {request.url.path}"):
            start = time.perf_counter()
            response = await call_next(request)
            duration_ms = (time.perf_counter() - start) * 1000
            span = trace.get_current_span()
            trace_id = f"{span.get_span_context().trace_id:032x}"
            logger.bind(
                path=request.url.path,
                method=request.method,
                status_code=response.status_code,
                duration_ms=round(duration_ms, 2),
                trace_id=trace_id,
            ).info("request_completed")
            response.headers["X-Response-Time"] = f"{duration_ms:.2f}ms"
            response.headers["X-Trace-Id"] = trace_id
            return response
