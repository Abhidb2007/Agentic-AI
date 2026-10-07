from abc import ABC, abstractmethod
from typing import Optional
import json
import os
import logging

logger = logging.getLogger(__name__)


class BaseHistory(ABC):
    @abstractmethod
    async def get(self, query: str) -> Optional[str]:
        pass

    @abstractmethod
    async def set(self, query: str, answer: str):
        pass


class FileHistory(BaseHistory):
    def __init__(self, storage_file: str = "query_history.json"):
        self.storage_file = storage_file
        self._cache = self._load()

    def _load(self):
        if os.path.exists(self.storage_file):
            try:
                with open(self.storage_file, "r") as f:
                    return json.load(f)
            except Exception:
                return {}
        return {}

    def _save(self):
        try:
            with open(self.storage_file, "w") as f:
                json.dump(self._cache, f, indent=2)
        except Exception as e:
            logger.error(f"Save failed: {e}")

    async def get(self, query: str) -> Optional[str]:
        return self._cache.get(query.strip().lower())

    async def set(self, query: str, answer: str):
        self._cache[query.strip().lower()] = answer
        self._save()


def get_history_manager(db_url: str = None) -> BaseHistory:
    return FileHistory()
