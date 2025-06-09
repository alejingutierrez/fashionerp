# Dependencias del Backend

Las librerías de Python se agrupan en dos archivos para simplificar la gestión de entornos.

- `requirements.txt`: **dependencias de runtime** necesarias para ejecutar la API en producción.
- `requirements.dev.txt`: herramientas de **desarrollo** (lint, type checking, pruebas).

Para instalar todo en un entorno local se combinan ambos archivos:

```bash
pip install -r requirements.txt -r requirements.dev.txt
```

## Actualización sin romper imágenes Docker

1. Actualiza y fija versiones en ambos archivos.
2. Construye nuevamente la imagen del backend para que Docker cachee las capas de `pip install`:
   ```bash
   docker compose build backend
   ```
3. Ejecuta los tests (`pytest`) antes de publicar la nueva imagen.
4. Si la imagen ya está publicada, incrementa la etiqueta de versión para evitar conflictos de cache en los entornos desplegados.
