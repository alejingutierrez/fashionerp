# Guía para Agentes / Desarrolladores

## Propósito  
Unificar criterios de **arquitectura, estilo, seguridad y flujos de trabajo** para quienes colaboren (personas o IA). Si eres un agente autónomo, sigue esta referencia antes de escribir o modificar una sola línea de código.

---

### 1. Convenciones de commit (`Conventional Commits`)
feat(ventas): soporte multi-moneda en checkout
fix(inventario): corrige desbordamiento al reservar stock
docs(agents): aclara flujo de revisión para IA Codex

### 2. Flujo Git
1. **branch** = `<issue-id>-<slug>` → PR ↔ `develop`
2. PR gatilla CI (lint + tests + build).
3. Min. 1 review humano + 1 review IA (`/review`).
4. Merge squash; `develop` se despliega a **staging** automáticamente.
5. Ramas protegidas: `main` y `develop` requieren PR con CI verde.

### 3. Front-end
| Requisito | Norma |
|-----------|-------|
| Componentes | Atomic Design (atoms → molecules → organisms → templates → pages) |
| Styling | solo MUI v6 (`sx` / styled API); **nunca CSS suelto** |
| Accesibilidad | score Lighthouse ≥ 90 (WCAG 2.2 AA) |
| Storybook | toda nueva prop documentada con MDX & Controls |
| Tests | React Testing Library + Jest (≥ 80 % lines) |

### 4. Back-end
* **FastAPI** “REST-first”; versión en ruta `/api/v1/*`.
* **Pydantic v2** para validación; usa `field_validators` cuando aplique.
* DB **PostgreSQL** → SQLAlchemy 2 (async); migraciones = Alembic.
* Seguridad: OAuth2 + JWT; hash de pass = `bcrypt`.
* CORS activado solo para orígenes listados en `.env` (`ALLOWED_ORIGINS`).
* Observabilidad OTel: cada request genera trace-id propagado a front.
* Dependencias separadas: `requirements.txt` (runtime) y `requirements.dev.txt` (lint, tests, mypy).

### 5. Infra & Dev Ops
* Docker: un proceso por contenedor; `docker-compose -f docker-compose.dev.yml up`.
* CI = GitHub Actions: lint → tests → build Docker → push a ECR (staging).
* Secrets via GitHub Secrets (nunca en el repo).
* RPO ≤ 15 min, RTO ≤ 30 min (ver runbooks en `/docs/dr`).
* Gestor Node = PNPM; habilita `corepack` para versiones homogéneas.
* Dependabot alerts activos para actualizar dependencias de Node y Python.

### 6. Estilo de código
* **Python**: `ruff` + `black --line-length 88` + `isort`.
* **TypeScript**: `eslint` base Airbnb + `prettier`.
* Naming: snake_case en Python, camelCase en TS; nada de abreviaturas crípticas.
* Comentarios: escribe **por qué**, no **qué**.

### 7. IA Codex (este agente)
* Respeta siempre esta guía y el backlog “Single Source of Truth”.
* Antes de generar código, **razona**: ¿impacta seguridad? ¿escala?
* Al crear componentes React: genera archivo `.stories.tsx` y prueba básica.
* Al crear endpoint FastAPI: genera test con `TestClient`.

---

> **Actualiza este documento** cada vez que cambie una norma o se añada tooling nuevo.  
> Última revisión: 2025-06-08
