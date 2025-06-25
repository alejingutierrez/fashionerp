import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { Alert, AlertProps } from './Alert';
// Asumimos que el ThemeProvider de la app ya está configurado,
// pero para pruebas de modo claro/oscuro, crearemos temas específicos.

const shadows = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)', // shadows[1]
  '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)', // shadows[2] - Ejemplo, ajustar al real
  // ... más sombras si es necesario
];

const shape = {
  borderRadius: 8,
};

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    // Añadir grises y otros colores necesarios para que el Alert funcione
    grey: {
      100: '#f5f5f5', // Usado en standard variant background light
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
    },
    // Podríamos añadir aquí los colores corporativos si Alert.tsx los leyera del tema
  },
  shadows: shadows as any, // MUI espera un array de 25 sombras
  shape,
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    grey: {
      700: '#616161', // Usado en standard variant background dark
    },
    text: {
      primary: '#ffffff',
    },
  },
  shadows: shadows as any,
  shape,
});

// Helper para renderizar con un tema específico (claro u oscuro)
function renderWithMode(ui: React.ReactElement, mode: 'light' | 'dark' = 'light') {
  const themeToUse = mode === 'dark' ? darkTheme : lightTheme;
  return render(<MuiThemeProvider theme={themeToUse}>{ui}</MuiThemeProvider>);
}


describe('Alert', () => {
  // Colores corporativos definidos en Alert.tsx para referencia en tests
  const corporateColors = {
    info: { lightRgb: 'rgb(0, 48, 73)', darkRgb: 'rgb(28, 73, 102)', contrastText: { lightRgb: 'rgb(253, 240, 213)', darkRgb: 'rgb(224, 247, 250)' } },
    success: { lightRgb: 'rgb(42, 157, 143)', darkRgb: 'rgb(46, 125, 50)', contrastText: { lightRgb: 'rgb(253, 240, 213)', darkRgb: 'rgb(232, 245, 233)' } },
    warning: { lightRgb: 'rgb(233, 196, 106)', darkRgb: 'rgb(255, 160, 0)', contrastText: { lightRgb: 'rgb(0, 48, 73)', darkRgb: 'rgb(0, 0, 0)' } },
    error: { lightRgb: 'rgb(120, 0, 0)', darkRgb: 'rgb(211, 47, 47)', contrastText: { lightRgb: 'rgb(253, 240, 213)', darkRgb: 'rgb(255, 235, 238)' } },
  };


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

  it('auto hides after specified duration', () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();
    renderWithMode(
      <Alert onClose={handleClose} autoHideDuration={2000}>
        Desaparece
      </Alert>,
    );
    act(() => {
      jest.advanceTimersByTime(2000);
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
    expect(root).toHaveStyle(`border-radius: ${shape.borderRadius}px`);
  });

  // Pruebas de Estilo Específicas (Modo Claro/Oscuro, Sombras, Bordes)
  describe('Enhanced Styling', () => {
    const testSeverity = 'info'; // Usar una severidad para probar estilos comunes

    // FILLED
    describe('Filled Variant', () => {
      it('applies correct filled styles in light mode', () => {
        const { container } = renderWithMode(
          <Alert severity={testSeverity} variant="filled">Filled Light</Alert>,
          'light',
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`background-color: ${corporateColors[testSeverity].lightRgb}`);
        expect(root).toHaveStyle(`color: ${corporateColors[testSeverity].contrastText.lightRgb}`);
        expect(root).toHaveStyle(`box-shadow: ${shadows[2]}`);
        const icon = container.querySelector('.MuiAlert-icon');
        expect(icon).toHaveStyle(`color: ${corporateColors[testSeverity].contrastText.lightRgb}`);
      });

      it('applies correct filled styles in dark mode', () => {
        const { container } = renderWithMode(
          <Alert severity={testSeverity} variant="filled">Filled Dark</Alert>,
          'dark',
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`background-color: ${corporateColors[testSeverity].darkRgb}`);
        expect(root).toHaveStyle(`color: ${corporateColors[testSeverity].contrastText.darkRgb}`);
        expect(root).toHaveStyle(`box-shadow: ${shadows[2]}`);
        const icon = container.querySelector('.MuiAlert-icon');
        expect(icon).toHaveStyle(`color: ${corporateColors[testSeverity].contrastText.darkRgb}`);
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
        expect(root).toHaveStyle(`background-color: ${lightTheme.palette.grey[100]}`); // Ejemplo
        expect(root).toHaveStyle(`color: ${lightTheme.palette.text.primary}`);
        expect(root).toHaveStyle(`border-left: 4px solid ${corporateColors[testSeverity].lightRgb}`);
        expect(root).toHaveStyle(`box-shadow: ${shadows[2]}`);
        const icon = container.querySelector('.MuiAlert-icon');
        expect(icon).toHaveStyle(`color: ${corporateColors[testSeverity].lightRgb}`);
      });

      it('applies correct standard styles in dark mode', () => {
        const { container } = renderWithMode(
          <Alert severity={testSeverity} variant="standard">Standard Dark</Alert>,
          'dark',
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle(`background-color: ${darkTheme.palette.grey[700]}`); // Ejemplo
        expect(root).toHaveStyle(`color: ${darkTheme.palette.text.primary}`);
        expect(root).toHaveStyle(`border-left: 4px solid ${corporateColors[testSeverity].darkRgb}`);
        expect(root).toHaveStyle(`box-shadow: ${shadows[2]}`);
        const icon = container.querySelector('.MuiAlert-icon');
        expect(icon).toHaveStyle(`color: ${corporateColors[testSeverity].darkRgb}`);
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
        expect(root).toHaveStyle(`border: 1px solid ${corporateColors[testSeverity].lightRgb}`); // Mui default es 1px
        expect(root?.style.boxShadow).toBeFalsy(); // o .toBe('')
        const icon = container.querySelector('.MuiAlert-icon');
        expect(icon).toHaveStyle(`color: ${corporateColors[testSeverity].lightRgb}`);
      });

      it('applies correct outlined styles in dark mode', () => {
        const { container } = renderWithMode(
          <Alert severity={testSeverity} variant="outlined">Outlined Dark</Alert>,
          'dark',
        );
        const root = container.querySelector('.MuiAlert-root');
        expect(root).toHaveStyle('background-color: transparent');
        expect(root).toHaveStyle(`color: ${darkTheme.palette.text.primary}`);
        expect(root).toHaveStyle(`border: 1px solid ${corporateColors[testSeverity].darkRgb}`);
        expect(root?.style.boxShadow).toBeFalsy();
        const icon = container.querySelector('.MuiAlert-icon');
        expect(icon).toHaveStyle(`color: ${corporateColors[testSeverity].darkRgb}`);
      });
    });
  });
});
