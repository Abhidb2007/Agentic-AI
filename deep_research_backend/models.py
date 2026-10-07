from pydantic import BaseModel
from typing import List, Optional, Any, Dict


class ResearchStep(BaseModel):
    step_id: int
    description: str
    tool: str
    query: str
    status: str = "pending"
    result: Optional[str] = None


class ResearchPlan(BaseModel):
    goal: str
    steps: List[ResearchStep]


class UserQueryRequest(BaseModel):
    query: str


class AgentResponse(BaseModel):
    query: str
    answer: str
    trace: List[ResearchStep]
