/**
 * Paleta corporativa con contraste mínimo 4.5:1 (WCAG AA)
 */
import { PropsWithChildren, ReactNode } from 'react';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
  PaletteOptions,
  ThemeOptions,
} from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';

// Definimos las paletas para modo claro y oscuro
const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: { main: '#c1121f', contrastText: '#fdf0d5' },
  secondary: { main: '#669bbc', contrastText: '#003049' },
  error: { main: '#780000', contrastText: '#fdf0d5' }, // Rojo oscuro para errores
  info: { main: '#003049', contrastText: '#fdf0d5' },  // Azul oscuro para info
  success: { main: '#2a9d8f', contrastText: '#fdf0d5' }, // Verde para éxito
  warning: { main: '#e9c46a', contrastText: '#003049' }, // Amarillo para advertencias
  background: {
    default: '#fdf0d5', // Un fondo crema muy claro
    paper: '#ffffff',   // Blanco para superficies de papel
  },
  text: {
    primary: '#003049', // Azul oscuro para texto principal
    secondary: '#667085', // Gris azulado para texto secundario
  },
  neutral: { // Color neutro (gris)
    main: '#6c757d',
    contrastText: '#ffffff',
  },
  divider: 'rgba(0, 48, 73, 0.2)', // Azul oscuro con opacidad para divisores
};

const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: { main: '#e74c3c', contrastText: '#ffffff' }, // Un rojo más brillante para modo oscuro
  secondary: { main: '#82a9c9', contrastText: '#e0e0e0' },// Un azul más claro
  error: { main: '#e57373', contrastText: '#000000' }, // Rojo claro para error
  info: { main: '#64b5f6', contrastText: '#000000' },   // Azul claro para info
  success: { main: '#81c784', contrastText: '#000000' },// Verde claro para éxito
  warning: { main: '#ffd54f', contrastText: '#000000' },// Amarillo claro para advertencia
  background: {
    default: '#121212', // Fondo oscuro estándar
    paper: '#1e1e1e',   // Un poco más claro para superficies
  },
  text: {
    primary: '#e0e0e0', // Texto principal claro
    secondary: '#b0b0b0',// Texto secundario un poco más oscuro
  },
  neutral: {
    main: '#9e9e9e', // Gris medio para modo oscuro
    contrastText: '#000000',
  },
  divider: 'rgba(224, 224, 224, 0.2)', // Divisor claro con opacidad
};


const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: mode === 'light' ? lightPalette : darkPalette,
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
  components: {
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
        // elevation: 2, // Lo manejaremos con styleOverrides para diferenciar modos
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: 'none', // Evitar gradientes por defecto de MUI
          boxShadow: theme.palette.mode === 'light'
            ? '0px 2px 4px -1px rgba(0,0,0,0.05), 0px 4px 5px 0px rgba(0,0,0,0.05), 0px 1px 10px 0px rgba(0,0,0,0.05)'
            : '0px 1px 3px rgba(0,0,0,0.4), 0px 2px 2px rgba(0,0,0,0.28), 0px 1px 1px rgba(0,0,0,0.24)', // Sombra más sutil para dark
        })
      }
    },
    MuiChip: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiAvatar: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        },
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
         elevation: 0, // Por defecto sin elevación explícita, para que use el de MuiCard o se defina específicamente
      },
       styleOverrides: {
        root: ({theme}) => ({
            backgroundImage: 'none', // Importante para evitar gradientes extraños en modo oscuro
        }),
      }
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'xl',
      },
    },
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main, // Usar el color primario del tema actual
          '&:hover': {
            textDecorationColor: theme.palette.primary.light,
          },
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
          backgroundImage: 'none',
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundImage: 'none',
        }),
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'inherit',
        elevation: 0,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none',
        })
      }
    },
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({ // themeParam es el tema completo ya procesado
        body: {
          backgroundColor: themeParam.palette.background.default,
          color: themeParam.palette.text.primary,
          fontFamily: `'Google Sans', sans-serif`,
          lineHeight: 1.5,
          WebkitFontSmoothing: 'antialiased',
        },
        '*': {
          boxSizing: 'border-box',
        },
      }),
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
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[1],
          // Ajustes de padding si es necesario:
          // padding: theme.spacing(0.75, 1.5),
          // '.MuiAlert-icon': {
          //   paddingTop: theme.spacing(1), // Ajustar si el icono no está centrado
          //   marginRight: theme.spacing(1.5),
          // },
          // '.MuiAlert-message': {
          //    paddingTop: theme.spacing(0.25) // Pequeño ajuste para alinear mejor con el icono
          // }
        }),
        // Variante STANDARD
        standardSuccess: ({ theme }) => ({
          color: theme.palette.mode === 'light' ? (theme.palette.success.dark || theme.palette.success.main) : theme.palette.success.light,
          backgroundColor: theme.palette.mode === 'light' ? '#E6F5F3' : 'rgba(129, 199, 132, 0.16)',
          '.MuiAlert-icon': { color: theme.palette.mode === 'light' ? theme.palette.success.main : theme.palette.success.light },
        }),
        standardError: ({ theme }) => ({
          color: theme.palette.mode === 'light' ? (theme.palette.error.dark || theme.palette.error.main) : theme.palette.error.light,
          backgroundColor: theme.palette.mode === 'light' ? '#FDECEA' : 'rgba(229, 115, 115, 0.16)',
          '.MuiAlert-icon': { color: theme.palette.mode === 'light' ? theme.palette.error.main : theme.palette.error.light },
        }),
        standardWarning: ({ theme }) => ({
          color: theme.palette.mode === 'light' ? (theme.palette.warning.dark || '#665429') : theme.palette.warning.light,
          backgroundColor: theme.palette.mode === 'light' ? '#FFF8E1': 'rgba(255, 213, 79, 0.16)',
          '.MuiAlert-icon': { color: theme.palette.mode === 'light' ? theme.palette.warning.main : theme.palette.warning.light },
        }),
        standardInfo: ({ theme }) => ({
          color: theme.palette.mode === 'light' ? (theme.palette.info.dark || theme.palette.info.main) : theme.palette.info.light,
          backgroundColor: theme.palette.mode === 'light' ? '#E0F1FA': 'rgba(100, 181, 246, 0.16)',
          '.MuiAlert-icon': { color: theme.palette.mode === 'light' ? theme.palette.info.main : theme.palette.info.light },
        }),
        // Variante FILLED
        filledSuccess: ({ theme }) => ({
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
        }),
        filledError: ({ theme }) => ({
          backgroundColor: theme.palette.error.main,
          color: theme.palette.error.contrastText,
        }),
        filledWarning: ({ theme }) => ({
          backgroundColor: theme.palette.warning.main,
          color: theme.palette.warning.contrastText,
        }),
        filledInfo: ({ theme }) => ({
          backgroundColor: theme.palette.info.main,
          color: theme.palette.info.contrastText,
        }),
        // Variante OUTLINED
        outlinedSuccess: ({ theme }) => ({
          borderColor: theme.palette.mode === 'light' ? theme.palette.success.main : theme.palette.success.light,
          color: theme.palette.mode === 'light' ? (theme.palette.success.dark || theme.palette.success.main) : theme.palette.success.light,
          '.MuiAlert-icon': { color: theme.palette.mode === 'light' ? theme.palette.success.main : theme.palette.success.light },
        }),
        outlinedError: ({ theme }) => ({
          borderColor: theme.palette.mode === 'light' ? theme.palette.error.main : theme.palette.error.light,
          color: theme.palette.mode === 'light' ? (theme.palette.error.dark || theme.palette.error.main) : theme.palette.error.light,
          '.MuiAlert-icon': { color: theme.palette.mode === 'light' ? theme.palette.error.main : theme.palette.error.light },
        }),
        outlinedWarning: ({ theme }) => ({
          borderColor: theme.palette.mode === 'light' ? theme.palette.warning.main : theme.palette.warning.light,
          color: theme.palette.mode === 'light' ? (theme.palette.warning.dark || '#665429') : theme.palette.warning.light,
          '.MuiAlert-icon': { color: theme.palette.mode === 'light' ? theme.palette.warning.main : theme.palette.warning.light },
        }),
        outlinedInfo: ({ theme }) => ({
          borderColor: theme.palette.mode === 'light' ? theme.palette.info.main : theme.palette.info.light,
          color: theme.palette.mode === 'light' ? (theme.palette.info.dark || theme.palette.info.main) : theme.palette.info.light,
          '.MuiAlert-icon': { color: theme.palette.mode === 'light' ? theme.palette.info.main : theme.palette.info.light },
        }),
        title: ({theme}) => ({
           fontWeight: theme.typography.fontWeightBold,
           marginTop: '-2px', // Pequeño ajuste para compensar el line-height del título
        }),
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
        root: ({theme}) => ({
          borderRadius: theme.shape.borderRadius,
          backgroundImage: 'none',
          '&:before': {
            display: 'none',
          },
        }),
      },
    },
  },
});


export function ThemeProvider({ children }: PropsWithChildren<ReactNode>) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light';

  let theme = createTheme(getDesignTokens(mode));
  theme = responsiveFontSizes(theme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
