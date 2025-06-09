from loguru import logger


def configure_logging(level: str) -> None:
    """Configure global logging."""
    logger.remove()
    logger.add(lambda msg: print(msg, end=""), level=level)
