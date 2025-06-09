from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_status_code() -> None:
    response = client.get("/health")
    assert response.status_code == 200
