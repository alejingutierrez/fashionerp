# Contrato de Versionado de la API

Todas las rutas públicas expuestas por FastAPI se agrupan bajo el prefijo `/api/v1`. Esta convención se aplica tanto para dominios internos como para integraciones de terceros.

## Nomenclatura

- `v{n}` indica la versión **mayor**. Ejemplo: `v1`, `v2`, `v3`.
- Cambios menores o de seguridad no alteran el prefijo; se documentan en las notas de versión.
- Las nuevas versiones conviven con las anteriores para evitar rupturas inmediatas.

## Ciclo de deprecación

1. Cuando un endpoint vaya a retirarse se marcará con `deprecated: true` en el esquema OpenAPI y se enviará el encabezado `Deprecation: true`.
2. Cada versión mayor tendrá soporte durante al menos una release menor tras publicarse la siguiente.
3. La fecha de retiro definitivo se comunicará en los canales de release y en este documento.

## Ejemplo de rutas

```text
GET /api/v1/ventas/pedidos
GET /api/v2/ventas/pedidos
```

Al crear una nueva versión se definirá un nuevo router en FastAPI:

```python
router_v2 = APIRouter(prefix="/api/v2")
```

Esto garantiza que el front-end y clientes externos puedan migrar de forma gradual.
