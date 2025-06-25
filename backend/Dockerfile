FROM python:3.12-slim

# Create a non-root user to run the app
RUN addgroup --system app && \
    adduser --system --group app

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Switch to the non-root user
USER app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
