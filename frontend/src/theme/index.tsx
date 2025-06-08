/**
 * Paleta corporativa con contraste mínimo 4.5:1 (WCAG AA)
 */
import { PropsWithChildren, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#c1121f', contrastText: '#fdf0d5' },
    secondary: { main: '#669bbc', contrastText: '#003049' },
    error: { main: '#780000', contrastText: '#fdf0d5' },
    info: { main: '#003049', contrastText: '#fdf0d5' },
    background: {
      default: '#fdf0d5',
      paper: '#fdf0d5',
    },
  },
  typography: {
    fontFamily: `'Google Sans', sans-serif`,
  },
});

export function ThemeProvider({ children }: PropsWithChildren<ReactNode>) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export default theme;
