"""Logging helpers."""

from __future__ import annotations

import sys

from loguru import logger


def configure_logging(level: str, json_logs: bool) -> None:
    """Configure global structured logging.

    Parameters
    ----------
    level:
        Desired log level (e.g. ``"INFO"``).
    json_logs:
        When ``True`` logs are serialized as JSON.
    """

    logger.remove()
    logger.add(
        sys.stdout,
        level=level,
        serialize=json_logs,
        enqueue=True,
        backtrace=True,
        diagnose=False,
    )
