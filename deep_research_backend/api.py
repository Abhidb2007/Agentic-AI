from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from deep_research_backend.models import UserQueryRequest, AgentResponse
from deep_research_backend.execution_engine import app as runner
from deep_research_backend.config import get_settings

settings = get_settings()
app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return RedirectResponse(url="/docs")


@app.post("/query", response_model=AgentResponse)
async def run_query(request: UserQueryRequest):
    try:
        inputs = {"user_query": request.query, "ignore_cache": False}
        result = await runner.ainvoke(inputs)

        return AgentResponse(
            query=request.query,
            answer=result["final_answer"],
            trace=result["plan"].steps if result.get("plan") else [],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
def health():
    return {"status": "ok", "version": "0.1.0"}
