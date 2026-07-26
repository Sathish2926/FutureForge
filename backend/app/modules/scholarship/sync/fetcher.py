"""HTTP fetcher for scholarship sources."""

from __future__ import annotations

import logging
from typing import Any
from urllib import error, request

logger = logging.getLogger(__name__)


class ScholarshipFetcher:
    """Download raw scholarship source content with retries and logging."""

    def __init__(self, timeout: float = 30.0, retries: int = 3) -> None:
        self.timeout = timeout
        self.retries = retries

    def fetch(self, url: str) -> dict[str, Any]:
        last_error: Exception | None = None
        for attempt in range(1, self.retries + 1):
            try:
                req = request.Request(url, headers={"User-Agent": "FutureForgeScholarshipSync/1.0"})
                with request.urlopen(req, timeout=self.timeout) as response:
                    body = response.read().decode("utf-8", errors="replace")
                    return {
                        "url": url,
                        "status_code": getattr(response, "status", 200),
                        "headers": dict(response.headers.items()),
                        "text": body,
                    }
            except Exception as exc:  # noqa: BLE001
                last_error = exc
                logger.warning("Scholarship fetch failed attempt=%s url=%s error=%s", attempt, url, exc)

        raise RuntimeError(f"Unable to fetch scholarship source {url}") from last_error
