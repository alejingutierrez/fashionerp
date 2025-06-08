# Sistema de Diseño

Este proyecto adopta **Atomic Design** y MUI como base para los componentes de interfaz. Todos los elementos de UI se clasifican en cinco niveles jerárquicos:

1. **Átomos**
2. **Moléculas**
3. **Organismos**
4. **Plantillas**
5. **Páginas**

Cada capa tiene una responsabilidad específica y ayuda a mantener la consistencia visual. La siguiente sección resume el criterio utilizado.

## Convención átomos → moléculas → organismos → plantillas → páginas

| Nivel       | Descripción |
|-------------|-------------|
| **Átomos** | Elementos básicos sin dependencia de otros componentes (botones, campos de texto, iconos). |
| **Moléculas** | Combinación pequeña de átomos que juntos cumplen una función (input con label, avatar con nombre). |
| **Organismos** | Bloques más complejos formados por átomos y moléculas; representan secciones de la UI (cabecera, menú lateral). |
| **Plantillas** | Disposición de organismos para definir una estructura de página sin datos reales. |
| **Páginas** | Implementaciones de plantillas con contenido real según el flujo o escenario. |

Los componentes se ubican bajo `frontend/src` siguiendo la misma categoría. Por ejemplo:

```
src/
  components/
    atoms/
    molecules/
    organisms/
  templates/
  pages/
```

Utiliza la API `sx` o `styled` de MUI para todo el estilizado. No se permiten archivos CSS sueltos.

## Historias de Storybook

Las historias de Storybook se agrupan usando el mismo esquema de niveles. La ruta de cada historia determina su categoría en la interfaz de Storybook.

```tsx
// ejemplo de un botón
export default {
  title: 'atoms/Button',
  component: Button,
};
```

En este ejemplo `atoms/Button` aparece bajo la sección **atoms**. Usa la jerarquía:

- `atoms/` para componentes básicos
- `molecules/` para combinaciones de átomos
- `organisms/` para secciones complejas
- `templates/` para estructuras sin contenido
- `pages/` para vistas concretas

Cada propiedad expuesta por un componente debe documentarse con controles de Storybook (MDX o CSF). Así se mantiene una referencia interactiva y organizada.

