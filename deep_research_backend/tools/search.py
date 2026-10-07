from typing import List, Dict
import logging

logger = logging.getLogger(__name__)


class SearchTool:
    def __init__(self):
        pass

    def search(self, query: str) -> List[Dict[str, str]]:
        logger.info(f"Executing search for: {query}")
        return [
            {"title": f"Result for {query} 1", "content": "Detailed technical content about " + query, "url": "http://example.com/1"},
            {"title": f"Result for {query} 2", "content": "More engineering details on " + query, "url": "http://example.com/2"},
        ]


class ArxivTool:
    def search(self, query: str) -> List[Dict[str, str]]:
        logger.info(f"Searching Arxiv for: {query}")
        return [
            {"title": "Paper on " + query, "summary": "Abstract of paper...", "url": "http://arxiv.org/abs/1234.5678"}
        ]
