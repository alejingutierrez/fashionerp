from fastapi import FastAPI

app = FastAPI(title="Fashion ERP API")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
