from app.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_health_status_code() -> None:
    response = client.get("/health")
    assert response.status_code == 200
