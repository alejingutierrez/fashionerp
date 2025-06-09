# One ERP – Retail & E-commerce Suite

> *Multi-tenant SaaS que integra ventas, inventario, contabilidad, POS, CRM y e-commerce.*

---

## Tabla de Contenido
1. [Visión](#visión)
2. [Arquitectura](#arquitectura)
3. [Requisitos previos](#requisitos-previos)
4. [Instalación rápida](#instalación-rápida)
5. [Scripts pnpm / CLI](#scripts-pnpm--cli)
6. [Estrategia Docker](#estrategia-docker)
7. [Entornos](#entornos)
8. [Contribuir](#contribuir)
9. [Licencia](#licencia)

---

## Visión
Un solo sistema para operar **retail omnicanal** en LATAM, con capas de IA (MMM, forecasting) y cumplimiento fiscal local (DIAN / Nómina electrónica).

## Arquitectura
```mermaid
graph TD
 subgraph Frontend (React 19 + MUI 6)
  A[SPA] -->|REST| B((API Gateway))
 end
 subgraph Backend (FastAPI)
  B --> C[Auth & RBAC]
  B --> D[Dominios: Ventas · Inventario · Contabilidad ...]
  D -->|SQLAlchemy| E[(PostgreSQL)]
 end
 subgraph Infra
  E --> F{Backups S3}
  B --> G[OpenTelemetry ➜ Grafana]
 end
```

## Requisitos previos

| Herramienta   | Versión mínima | Nota                        |
|---------------|----------------|-----------------------------|
| Node.js       | 20 LTS         | Front-end build (Vite)      |
| Python        | 3.12           | ASGI FastAPI                |
| Docker        | 24.x           | Contenedores                |
| Docker Compose| 2.20           | Entorno dev                 |

Las versiones de referencia se definen en `.nvmrc` (Node 20 LTS) y `.python-version` (Python 3.12).

## Instalación rápida
```bash
git clone https://github.com/<org>/fashionerp.git
cd fashionerp

# Front-end
cd frontend
pnpm install            # instala dependencias
pnpm run dev       # http://localhost:3000

# Back-end
cd ../backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt -r requirements.dev.txt
uvicorn app.main:app --reload  # http://localhost:8000/docs
```

## Scripts pnpm / CLI

| Comando                                           | Descripción                               |
|---------------------------------------------------|-------------------------------------------|
| `pnpm run dev`                                     | Arranca Vite con HMR en localhost:3000    |
| `pnpm run build`                                   | Compila la SPA en `dist/`                 |
| `pnpm run storybook`                               | Doc y sandbox de componentes (:6006)      |
| `pytest -q`                                       | Ejecuta tests backend                     |
| `docker-compose -f docker-compose.dev.yml up`     | Entorno completo (db, redis, front, back) |

## Ejecutar pruebas

```bash
cd backend
pytest -q
```


## Estrategia Docker
- Multi-stage build para imágenes pequeñas.
- Separación: frontend, backend, db, redis, storybook.
- Volúmenes montados solo en dev para hot-reload.
- Variables de entorno declaradas en `.env` (no commit real keys).

## Entornos

| Entorno | URL                        | Objetivo               |
|---------|----------------------------|------------------------|
| Local   | `localhost`                | Desarrollo diario      |
| Staging | `stage.one-erp.internal`   | QA, demo a negocio     |
| Prod    | `erp.midominio.com`        | Usuarios finales       |

## Ramas
- `main` → producción.
- `develop` → integración continua. Todas las PR se abren contra esta rama.


## Contribuir
1. Crea un issue o elige uno del backlog.
2. Haz fork / branch.
3. Sigue Conventional Commits.
4. PR contra `develop` (excepto hotfix directo a `main`).
5. CI verde + al menos 1 review antes de merge.

## Licencia
MIT © 2025 One Dentsu – Data & Creative

---

### ¿Algo más?

*Si necesitas que genere los `docker-compose*.yml`, `.env.example` o scripts de análisis de calidad, dímelo y los preparo en la próxima iteración.*

