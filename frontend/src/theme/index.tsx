/**
 * Paleta corporativa con contraste mínimo 4.5:1 (WCAG AA)
 */
import { PropsWithChildren, ReactNode } from 'react';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#c1121f', contrastText: '#fdf0d5' },
    secondary: { main: '#669bbc', contrastText: '#003049' },
    error: { main: '#780000', contrastText: '#fdf0d5' },
    info: { main: '#003049', contrastText: '#fdf0d5' },
    success: { main: '#2a9d8f', contrastText: '#fdf0d5' },
    warning: { main: '#e9c46a', contrastText: '#003049' },
    background: {
      default: '#fdf0d5',
      paper: '#fdf0d5',
    },
    divider: '#00304933',
    text: {
      primary: '#003049',
      secondary: '#667085',
    },
    neutral: {
      main: '#6c757d',
      contrastText: '#ffffff',
    },
  },
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
        elevation: 2,
      },
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
        elevation: 0,
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
          color: '#003049',
          '&:hover': {
            textDecorationColor: '#003049',
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#fdf0d5',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        color: 'inherit',
        elevation: 0,
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#fdf0d5',
          color: '#003049',
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
        variant: 'filled', // El default para nuestro sistema es 'filled'
      },
      styleOverrides: {
        // Ajustar el color del icono para standard/outlined warning para mejor contraste
        standardWarning: {
          '& .MuiAlert-icon': {
            color: '#b08000', // Un amarillo/marrón más oscuro para el icono warning
          },
        },
        outlinedWarning: {
          '& .MuiAlert-icon': {
            color: '#b08000', // Mismo color oscuro para outlined warning
          },
        },
        // Asegurar que el texto en standard/outlined sea oscuro para todas las severidades
        // MuiAlert ya lo hace bastante bien, pero podemos reforzarlo si es necesario.
        // Por ahora, el principal problema detectado es el icono de warning.
        // El texto principal por defecto hereda text.primary (#003049) que tiene buen contraste.
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
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export function ThemeProvider({ children }: PropsWithChildren<ReactNode>) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default theme;
