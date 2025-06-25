import React from 'react';
import { CssBaseline, IconButton, Tooltip, useTheme as useMuiTheme } from '@mui/material';
import { AppThemeProvider, useColorMode } from '../src/theme';
import type { Preview, Decorator } from '@storybook/react';
import { Brightness4, Brightness7 } from '@mui/icons-material';

// Componente que se renderizará en el toolbar.
// Necesita acceso al contexto del tema para funcionar (useColorMode)
// y al tema MUI actual para cambiar el icono (useMuiTheme).
const ToolbarThemeToggleRendered = () => {
  const { toggleColorMode } = useColorMode();
  const muiTheme = useMuiTheme(); // Hook de MUI para acceder al tema actual
  const isDark = muiTheme.palette.mode === 'dark';

  return (
    <Tooltip title="Toggle theme">
      <IconButton onClick={toggleColorMode} color="inherit" sx={{ marginRight: 1 }}>
        {isDark ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};

// Decorador principal que envuelve todas las historias con AppThemeProvider.
// Esto asegura que ToolbarThemeToggleRendered (y las historias) tengan acceso al contexto.
const ThemedStoryDecorator: Decorator = (Story, context) => {
  return (
    <AppThemeProvider>
      <CssBaseline />
      {/* El ToolbarThemeToggleRendered se renderiza a través de preview.toolbar,
          pero necesita que el contexto de AppThemeProvider esté disponible globalmente
          para cuando Storybook lo renderice. Storybook anida los decoradores,
          así que el contexto estará disponible. */}
      <Story {...context} />
    </AppThemeProvider>
  );
};

const preview: Preview = {
  decorators: [ThemedStoryDecorator],
  // globalTypes opcional si otros addons lo necesitan o si se quiere un selector de tema adicional.
  // Para el botón de toggle simple, no es estrictamente necesario si el botón maneja todo.
  // globalTypes: {
  //   theme: {
  //     name: 'Theme',
  //     description: 'Global theme for components',
  //     defaultValue: 'light',
  //     toolbar: {
  //       icon: 'circlehollow',
  //       items: [
  //         { value: 'light', icon: 'sun', title: 'Light' },
  //         { value: 'dark', icon: 'moon', title: 'Dark' },
  //       ],
  //       showName: true,
  //     },
  //   },
  // },
  toolbar: {
    items: [
      // 'theme', // Esto añadiría el selector de tema de globalTypes si estuviera definido.
      {
        title: 'Theme Toggle',
        // Renderiza nuestro componente React.
        // Storybook se encarga de que el contexto de los decoradores esté disponible.
        render: () => <ToolbarThemeToggleRendered />,
      },
    ],
  },
};

export default preview;
