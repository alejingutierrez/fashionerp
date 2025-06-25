import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Alert, AlertProps } from './Alert';
// Asumimos que el ThemeProvider de la app ya está configurado,
// pero para pruebas de modo claro/oscuro, crearemos temas específicos.

const shadowsMock = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)', // shadows[1]
  '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)', // shadows[2]
  // ... Completar hasta 25 si es necesario para evitar warnings de MUI, o usar `shadows: theme.shadows` si se basa en un tema real.
  ...Array(22).fill('none'),
];

const shapeMock = {
  borderRadius: 8,
};

// Definición de colores de severidad que Alert.tsx esperaría del tema
const severityColors = {
  info: { main: 'rgb(0, 48, 73)', contrastText: 'rgb(253, 240, 213)', dark: 'rgb(28, 73, 102)', contrastTextDark: 'rgb(224, 247, 250)' },
  success: { main: 'rgb(42, 157, 143)', contrastText: 'rgb(253, 240, 213)', dark: 'rgb(46, 125, 50)', contrastTextDark: 'rgb(232, 245, 233)' },
  warning: { main: 'rgb(233, 196, 106)', contrastText: 'rgb(0, 48, 73)', dark: 'rgb(255, 160, 0)', contrastTextDark: 'rgb(0, 0, 0)' },
  error: { main: 'rgb(120, 0, 0)', contrastText: 'rgb(253, 240, 213)', dark: 'rgb(211, 47, 47)', contrastTextDark: 'rgb(255, 235, 238)' },
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#c1121f' }, // Ejemplo, no usado directamente por Alert a menos que sea una severidad
    info: severityColors.info,
    success: severityColors.success,
    warning: severityColors.warning,
    error: severityColors.error,
    grey: {
      100: '#f5f5f5', // Usado en standard variant background light
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
    },
    background: { // Necesario para que MUI no dé warnings
      paper: '#fff',
      default: '#fff',
    }
  },
  shadows: shadowsMock as any,
  shape: shapeMock,
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#c1121f' }, // Ejemplo
    info: severityColors.info, // El componente Alert usará .dark y .contrastTextDark de aquí
    success: severityColors.success,
    warning: severityColors.warning,
    error: severityColors.error,
    grey: {
      700: '#616161', // Usado en standard variant background dark
    },
    text: {
      primary: '#ffffff',
    },
    background: { // Necesario
      paper: '#121212',
      default: '#121212',
    }
  },
  shadows: shadowsMock as any,
  shape: shapeMock,
});

// Helper para renderizar con un tema específico (claro u oscuro)
function renderWithMode(ui: React.ReactElement, mode: 'light' | 'dark' = 'light') {
  const themeToUse = mode === 'dark' ? darkTheme : lightTheme;
  return render(<MuiThemeProvider theme={themeToUse}>{ui}</MuiThemeProvider>);
}


describe('Alert', () => {
  it('renders message text', () => {
    renderWithMode(<Alert severity="error">Mensaje de error</Alert>);
    expect(screen.getByText('Mensaje de error')).toBeInTheDocument();
  });

  it('renders close button and calls onClose', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    renderWithMode(
      <Alert severity="error" onClose={handleClose}>
        Cerrar
      </Alert>,
    );
    const button = screen.getByRole('button', { name: /close/i });
    await user.click(button);
    expect(handleClose).toHaveBeenCalled();
  });

  it('is not rendered when open is false', () => {
    const { container } = renderWithMode(<Alert open={false}>No me ves</Alert>);
    // El componente Collapse añade un div, si no hay nada, está oculto.
    // O podemos buscar por el texto que no debería estar.
    expect(screen.queryByText('No me ves')).not.toBeInTheDocument();
    // MuiCollapse-root es la clase del contenedor de Collapse
    // Si open es false y unmountOnExit es true (default en nuestro Collapse), el MuiAlert no estará.
    expect(container.querySelector('.MuiAlert-root')).not.toBeInTheDocument();
  });

  it('renders with transition components when open', () => {
    const { container } = renderWithMode(<Alert open={true}>Animado</Alert>);
    expect(container.querySelector('.MuiCollapse-root')).toBeInTheDocument();
    // Slide y Fade son más difíciles de testear directamente por su naturaleza,
    // pero la presencia de Collapse y el MuiAlert-root ya es un buen indicio.
    expect(container.querySelector('.MuiAlert-root')).toBeInTheDocument();
  });


  it('applies severity and variant classes', () => {
    const { container } = renderWithMode(
      <Alert severity="success" variant="outlined">
        Ok
      </Alert>,
    );
    // El primer hijo de Collapse es Fade, luego Slide, luego MuiAlert
    const root = container.querySelector('.MuiAlert-root');
    expect(root).toHaveClass('MuiAlert-outlinedSuccess');
  });

  it('renders title when provided', () => {
    renderWithMode(
      <Alert severity="error" title="Error:">
        Falló
      </Alert>,
    );
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Falló')).toBeInTheDocument();
  });

  it('hides icon when hideIcon is true', () => {
    const { container } = renderWithMode(<Alert hideIcon>Sin icono</Alert>);
    expect(container.querySelector('.MuiAlert-icon')).toBeNull();
  });

  it('auto hides after specified duration with animation', () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();
    const animationDuration = 300;
    renderWithMode(
      <Alert onClose={handleClose} autoHideDuration={2000}>
        Desaparece
      </Alert>,
    );
    // Avanza el tiempo hasta que se dispare la animación de salida
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    // En este punto, internalOpen debería ser false, pero onClose aún no se llama.
    expect(handleClose).not.toHaveBeenCalled();

    // Avanza el tiempo de la animación
    act(() => {
      jest.advanceTimersByTime(animationDuration);
    });
    expect(handleClose).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('renders close button and calls onClose after animation', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const handleClose = jest.fn();
    const animationDuration = 300;
    renderWithMode(
      <Alert severity="error" onClose={handleClose}>
        Cerrar
      </Alert>,
    );
    const button = screen.getByRole('button', { name: /close/i });
    await user.click(button);

    expect(handleClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(animationDuration);
    });
    expect(handleClose).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('applies small size styles', () => {
    const { container } = renderWithMode(<Alert size="small">Pequeña</Alert>);
    const root = container.querySelector('.MuiAlert-root');
    expect(root).toHaveStyle('font-size: 0.875rem');
    expect(root).toHaveStyle('padding-top: 4px'); // theme.spacing(0.5) es 4px si spacing es 8.
    expect(root).toHaveStyle('padding-left: 12px'); // theme.spacing(1.5) es 12px
  });

  it('applies borderRadius from theme', () => {
    const { container } = renderWithMode(<Alert>Con borde</Alert>);
    const root = container.querySelector('.MuiAlert-root');
    expect(root).toHaveStyle(`border-radius: ${shapeMock.borderRadius}px`);
  });

  it('renders action when provided', () => {
    const actionText = 'Deshacer';
    renderWithMode(<Alert action={<button>{actionText}</button>}>Con acción</Alert>);
    expect(screen.getByRole('button', { name: actionText })).toBeInTheDocument();
  });

  it('does not render close button if onClose is not provided', () => {
    renderWithMode(<Alert>Sin onClose</Alert>);
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  it('applies sx prop overrides', () => {
    const { container } = renderWithMode(<Alert sx={{ backgroundColor: 'rgb(1, 2, 3)' }}>Con sx</Alert>);
    const root = container.querySelector('.MuiAlert-root');
    expect(root).toHaveStyle('background-color: rgb(1, 2, 3)');
    // Nota: Este override de sx puede ser sobreescrito por los estilos de variante si sx se aplica antes.
    // La implementación actual aplica sx al final: sx={{ ...alertStyles(theme), ...sizeStyles, ...sx }}
    // por lo que el sx del usuario debería tener precedencia para las props que define.
  });


  // Pruebas de Estilo Específicas (Modo Claro/Oscuro, Sombras, Bordes)
  describe('Enhanced Styling', () => {
    const testSeverity = 'info'; // Usar una severidad para probar estilos comunes
    const currentSeverityColors = severityColors[testSeverity];

    // FILLED
    describe('Filled Variant', () => {
      it('applies correct filled styles in light mode', () => {
        const { container } = renderWithMode(
          <Alert severity={testSeverity} variant="filled">Filled Light</Alert>,
          'light',
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`background-color: ${currentSeverityColors.main}`);
        expect(root).toHaveStyle(`color: ${currentSeverityColors.contrastText}`);
        expect(root).toHaveStyle(`box-shadow: ${shadowsMock[2]}`);
        const icon = container.querySelector('.MuiAlert-icon');
        expect(icon).toHaveStyle(`color: ${currentSeverityColors.contrastText}`);
      });

      it('applies correct filled styles in dark mode', () => {
        const { container } = renderWithMode(
          <Alert severity={testSeverity} variant="filled">Filled Dark</Alert>,
          'dark',
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`background-color: ${currentSeverityColors.dark}`);
        expect(root).toHaveStyle(`color: ${currentSeverityColors.contrastTextDark}`);
        expect(root).toHaveStyle(`box-shadow: ${shadowsMock[2]}`);
        const icon = container.querySelector('.MuiAlert-icon');
        expect(icon).toHaveStyle(`color: ${currentSeverityColors.contrastTextDark}`);
      });
    });

    // STANDARD
    describe('Standard Variant', () => {
      it('applies correct standard styles in light mode', () => {
        const { container } = renderWithMode(
          <Alert severity={testSeverity} variant="standard">Standard Light</Alert>,
          'light',
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`background-color: ${lightTheme.palette.grey[100]}`);
        expect(root).toHaveStyle(`color: ${lightTheme.palette.text.primary}`);
        expect(root).toHaveStyle(`border-left: 4px solid ${currentSeverityColors.main}`);
        expect(root).toHaveStyle(`box-shadow: ${shadowsMock[2]}`);
        const icon = container.querySelector('.MuiAlert-icon');
        expect(icon).toHaveStyle(`color: ${currentSeverityColors.main}`); // Icon color matches severity main color
      });

      it('applies correct standard styles in dark mode', () => {
        const { container } = renderWithMode(
          <Alert severity={testSeverity} variant="standard">Standard Dark</Alert>,
          'dark',
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`background-color: ${darkTheme.palette.grey[700]}`);
        expect(root).toHaveStyle(`color: ${darkTheme.palette.text.primary}`);
        expect(root).toHaveStyle(`border-left: 4px solid ${currentSeverityColors.dark}`);
        expect(root).toHaveStyle(`box-shadow: ${shadowsMock[2]}`);
        const icon = container.querySelector('.MuiAlert-icon');
        expect(icon).toHaveStyle(`color: ${currentSeverityColors.contrastTextDark}`); // CHANGED: Icon color uses contrast text in dark mode for standard
      });
    });

    // OUTLINED
    describe('Outlined Variant', () => {
      it('applies correct outlined styles in light mode', () => {
        const { container } = renderWithMode(
          <Alert severity={testSeverity} variant="outlined">Outlined Light</Alert>,
          'light',
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle('background-color: transparent');
        expect(root).toHaveStyle(`color: ${lightTheme.palette.text.primary}`);
        expect(root).toHaveStyle(`border: 1px solid ${currentSeverityColors.main}`);
        expect(root?.style.boxShadow).toBe(shadowsMock[0]); // Default elevation 0 for outlined
        const icon = container.querySelector('.MuiAlert-icon');
        expect(icon).toHaveStyle(`color: ${currentSeverityColors.main}`);
      });

      it('applies correct outlined styles in dark mode', () => {
        const { container } = renderWithMode(
          <Alert severity={testSeverity} variant="outlined">Outlined Dark</Alert>,
          'dark',
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle('background-color: transparent');
        expect(root).toHaveStyle(`color: ${darkTheme.palette.text.primary}`);
        expect(root).toHaveStyle(`border: 1px solid ${currentSeverityColors.dark}`);
        expect(root?.style.boxShadow).toBe(shadowsMock[0]); // Elevation 0 = 'none'
        const icon = container.querySelector('.MuiAlert-icon');
        expect(icon).toHaveStyle(`color: ${currentSeverityColors.contrastTextDark}`); // CHANGED: Icon color uses contrast text in dark mode for outlined
      });
    });

    // ELEVATION PROP
    describe('Elevation Prop', () => {
      it('applies no shadow to filled variant when elevation is 0', () => {
        const { container } = renderWithMode(
          <Alert severity="success" variant="filled" elevation={0}>Filled No Shadow</Alert>,
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`box-shadow: ${shadowsMock[0]}`);
      });

      it('applies custom shadow to filled variant when elevation is provided', () => {
        const { container } = renderWithMode(
          <Alert severity="success" variant="filled" elevation={3}>Filled Custom Shadow</Alert>,
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`box-shadow: ${shadowsMock[3]}`); // Asumiendo que shadowsMock[3] está definido
      });

      it('applies no shadow to standard variant when elevation is 0', () => {
        const { container } = renderWithMode(
          <Alert severity="info" variant="standard" elevation={0}>Standard No Shadow</Alert>,
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`box-shadow: ${shadowsMock[0]}`);
      });

      it('applies shadow to outlined variant when elevation is provided', () => {
        const { container } = renderWithMode(
          <Alert severity="warning" variant="outlined" elevation={1}>Outlined With Shadow</Alert>,
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`box-shadow: ${shadowsMock[1]}`);
      });

      it('uses default shadow for filled variant if elevation is not provided', () => {
        const { container } = renderWithMode(
            <Alert severity="error" variant="filled">Filled Default Shadow</Alert>,
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`box-shadow: ${shadowsMock[2]}`); // Default es 2
      });

      it('uses default shadow for standard variant if elevation is not provided', () => {
        const { container } = renderWithMode(
            <Alert severity="info" variant="standard">Standard Default Shadow</Alert>,
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`box-shadow: ${shadowsMock[2]}`); // Default es 2
      });

      it('uses no shadow for outlined variant if elevation is not provided', () => {
        const { container } = renderWithMode(
            <Alert severity="success" variant="outlined">Outlined Default No Shadow</Alert>,
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`box-shadow: ${shadowsMock[0]}`); // Default es 0 (none)
      });
    });
  });
});
