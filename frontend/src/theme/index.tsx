/**
 * Paleta corporativa con contraste mínimo 4.5:1 (WCAG AA)
 */
import { PropsWithChildren, ReactNode, createContext, useMemo, useState, useContext } from 'react';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
  PaletteOptions,
  ThemeOptions,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Definimos las paletas para modo claro y oscuro
const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: { main: '#c1121f', contrastText: '#fdf0d5' },
  secondary: { main: '#669bbc', contrastText: '#003049' },
  error: { main: '#780000', contrastText: '#fdf0d5' },
  info: { main: '#003049', contrastText: '#fdf0d5' },
  success: { main: '#2a9d8f', contrastText: '#fdf0d5' },
  warning: { main: '#e9c46a', contrastText: '#003049' },
  background: {
    default: '#fdf0d5', // Beige claro
    paper: '#ffffff', // Blanco para superficies de papel
  },
  divider: '#00304933', // Azul oscuro con opacidad
  text: {
    primary: '#003049', // Azul oscuro
    secondary: '#667085', // Gris azulado
  },
  neutral: {
    main: '#6c757d',
    contrastText: '#ffffff',
  },
  grey: { // Añadido para consistencia y control del color 'offline'
    '400': '#757575', // Originalmente MUI grey[600], buen contraste en light.
  }
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: { main: '#e74c3c', contrastText: '#ffffff' }, // Rojo más brillante para dark mode
  secondary: { main: '#82a5c4', contrastText: '#001f32' }, // Azul más claro
  error: { main: '#d32f2f', contrastText: '#ffffff' }, // Rojo error estándar
  info: { main: '#64b5f6', contrastText: '#001f32' }, // Azul info más claro
  success: { main: '#4caf50', contrastText: '#001f32' }, // Verde success estándar
  warning: { main: '#ffa726', contrastText: '#001f32' }, // Naranja warning estándar
  background: {
    default: '#121212', // Fondo oscuro estándar de Material Design
    paper: '#1e1e1e', // Superficies de papel un poco más claras
  },
  divider: '#fdf0d533', // Beige claro con opacidad
  text: {
    primary: '#fdf0d5', // Beige claro para texto principal
    secondary: '#a0a0a0', // Gris claro para texto secundario
  },
  neutral: {
    main: '#9e9e9e', // Gris medio
    contrastText: '#000000',
  },
  grey: { // Añadido para consistencia y control del color 'offline'
    '400': '#757575', // Mismo color que en light, buen contraste en dark paper.
  }
};

// Opciones comunes del tema que no dependen del modo
const commonThemeOptions: Omit<ThemeOptions, 'palette' | 'components'> = {
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  typography: {
    fontFamily: `'Google Sans', sans-serif`,
    h1: { fontSize: '2.25rem', fontWeight: 700 },
    h2: { fontSize: '1.875rem', fontWeight: 700 },
    h3: { fontSize: '1.5rem', fontWeight: 600 },
    h4: { fontSize: '1.25rem', fontWeight: 600 },
    h5: { fontSize: '1.125rem', fontWeight: 500 },
    h6: { fontSize: '1rem', fontWeight: 500 },
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
};

// Función para generar los overrides de componentes que dependen del modo
const getComponentOverrides = (mode: 'light' | 'dark'): ThemeOptions['components'] => ({
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        borderRadius: 8,
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      margin: 'normal',
      variant: 'outlined',
    },
  },
  MuiCard: {
    defaultProps: {
      elevation: mode === 'light' ? 2 : 1, // Menos elevación en modo oscuro
    },
    styleOverrides: {
      root: {
        // backgroundColor: mode === 'dark' ? darkPalette.background?.paper : lightPalette.background?.paper,
      }
    }
  },
  MuiChip: {
    defaultProps: {
      variant: 'outlined',
    },
  },
  MuiAvatar: {
    styleOverrides: {
      root: { // Estilos aplicados a la raíz del componente Avatar
        border: `1px solid ${mode === 'light' ? lightPalette.divider : darkPalette.divider}`,
        // Considerar un borde más sutil o condicional si el avatar es una imagen
        // Aplicar un boxShadow sutil para dar profundidad y modernidad
        boxShadow: mode === 'light'
          ? '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 1px 10px 0px rgba(0,0,0,0.06)'
          : '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 1px 10px 0px rgba(0,0,0,0.12)',
      },
      rounded: {
        borderRadius: 8, // Ya estaba, mantener.
      },
      colorDefault: { // Para avatares con iniciales o iconos
        // Modo Claro: Usar primary.main y primary.contrastText para asegurar contraste
        backgroundColor: mode === 'light' ? lightPalette.primary?.main : darkPalette.secondary?.main,
        color: mode === 'light' ? lightPalette.primary?.contrastText : darkPalette.secondary?.contrastText,
        // El borde general se maneja en `styleOverrides.root` usando el color `divider` del tema.
      }
    },
  },
  MuiTooltip: {
    defaultProps: {
      arrow: true,
    },
  },
  MuiListItem: {
    defaultProps: {
      dense: true,
    },
  },
  MuiTable: {
    defaultProps: {
      size: 'small',
    },
  },
  MuiFormControl: {
    defaultProps: {
      margin: 'normal',
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: mode === 'light' ? 0 : 1,
    },
  },
  MuiContainer: {
    defaultProps: {
      maxWidth: 'xl',
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        color: mode === 'light' ? lightPalette.text?.primary : darkPalette.text?.primary,
        '&:hover': {
          textDecorationColor: mode === 'light' ? lightPalette.text?.primary : darkPalette.text?.primary,
        },
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: mode === 'light' ? lightPalette.background?.default : darkPalette.background?.paper,
      },
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 8,
        // backgroundColor: mode === 'dark' ? darkPalette.background?.paper : lightPalette.background?.paper,
      },
    },
  },
  MuiAppBar: {
    defaultProps: {
      color: 'inherit',
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundColor: mode === 'light' ? lightPalette.background?.default : darkPalette.background?.paper,
      }
    }
  },
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: mode === 'light' ? lightPalette.background?.default : darkPalette.background?.default,
        color: mode === 'light' ? lightPalette.text?.primary : darkPalette.text?.primary,
        fontFamily: `'Google Sans', sans-serif`,
        lineHeight: 1.5,
        WebkitFontSmoothing: 'antialiased',
      },
      '*': {
        boxSizing: 'border-box',
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      color: 'text.primary',
    },
    styleOverrides: {
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
  },
  MuiAlert: {
    defaultProps: {
      variant: 'filled',
    },
    styleOverrides: {
      standardWarning: {
        '& .MuiAlert-icon': {
          color: mode === 'light' ? '#b08000' : darkPalette.warning?.main,
        },
      },
      outlinedWarning: {
        '& .MuiAlert-icon': {
          color: mode === 'light' ? '#b08000' : darkPalette.warning?.main,
        },
      },
    },
  },
  MuiSnackbar: {
    defaultProps: {
      anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    },
  },
  MuiTabs: {
    defaultProps: {
      indicatorColor: 'primary',
      textColor: 'primary',
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        '&:before': {
          display: 'none',
        },
        // backgroundColor: mode === 'dark' ? darkPalette.background?.paper : lightPalette.background?.paper,
      },
    },
  },
});


export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useColorMode() {
  return useContext(ColorModeContext);
}

export function AppThemeProvider({ children }: PropsWithChildren<ReactNode>) {
  // Podríamos usar useMediaQuery('(prefers-color-scheme: dark)') para el valor inicial
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  let theme = useMemo(() => {
    const currentPalette = mode === 'light' ? lightPalette : darkPalette;
    const themeOptions: ThemeOptions = {
      ...commonThemeOptions,
      palette: currentPalette,
      components: getComponentOverrides(mode),
    };
    return createTheme(themeOptions);
  }, [mode]);

  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline /> {/* CssBaseline debe estar dentro de MuiThemeProvider para acceder al tema */}
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}

// Exportamos el tema por defecto (light) para usos donde no haya provider, aunque es mejor usar el AppThemeProvider
const defaultTheme = responsiveFontSizes(createTheme({ ...commonThemeOptions, palette: lightPalette, components: getComponentOverrides('light') }));
export default defaultTheme;
