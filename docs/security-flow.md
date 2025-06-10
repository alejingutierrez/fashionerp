# Flujo de Seguridad Básica

Este documento resume las tareas mínimas para mantener seguro el proyecto.

## 1. Monitoreo continuo
- **Dependabot** está habilitado para Python y Node.
- Cada alerta genera un PR automático que debe revisarse en 24 horas.

## 2. Gestión de credenciales
- Las claves se almacenan en **GitHub Secrets** y nunca se versionan.
- Revisa periódicamente los permisos de los colaboradores.

## 3. Respuesta ante vulnerabilidades
- Sigue la guía de `SECURITY.md` para reportar problemas.
- Usa `pytest` y `pnpm test` para validar los parches antes de desplegar.

## 4. Auditoría
- Ejecuta `ruff` y `eslint` como parte de la CI.
- Los resultados se almacenan en el historial de GitHub Actions.
