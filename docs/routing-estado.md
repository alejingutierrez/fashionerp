# Estrategia de Enrutamiento y Estado Global

Este proyecto usa **React 19** junto a **React Router v6** para el enrutamiento.
Todo el estado relacionado con datos remotos se maneja con **React Query**.

## Enrutamiento

1. `BrowserRouter` envuelve la SPA.
2. Se definen rutas anidadas usando componentes de plantilla.
3. Cada página vive bajo `src/pages` y sigue Atomic Design.

## Estado con React Query

- Los hooks de datos (`useQuery`, `useMutation`) residen en `src/hooks`.
- La caché de React Query actúa como fuente de verdad para datos provenientes de la API (`/api/v1/*`).
- La invalidación y refetch se coordinan por dominio (Ventas, Inventario, etc.).

## Estado local

- El estado efímero o de UI (modales, toggles) se mantiene en componentes o contextos locales.
- Compartir estado simple entre páginas puede resolverse con contextos ligeros.

## ¿Cuándo escalar a Redux o Zustand?

- **Redux** es recomendable cuando se necesita orquestar múltiples
  "slices" de estado con lógica compleja, middleware (logging,
  persistencia) y time travel debugging. Útil para flujos grandes
  (checkout, POS) donde varias partes de la app deben reaccionar a las
  mismas acciones.
- **Zustand** se sugiere para casos donde el estado global es pequeño pero
  requiere ser accesible en cualquier ruta sin el boilerplate de Redux,
  como asistentes multi‑paso o configuradores.
- Mientras el 80 % del estado esté cubierto por React Query o contexto y
  no haya dependencias cruzadas complicadas, se mantiene la estrategia
  base.

