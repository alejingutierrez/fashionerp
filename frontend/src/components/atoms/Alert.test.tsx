import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Alert', () => {
  it('renders message text', () => {
    renderWithTheme(<Alert severity="error">Mensaje de error</Alert>);
    expect(screen.getByText('Mensaje de error')).toBeInTheDocument();
  });

  it('renders close button and calls onClose', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    renderWithTheme(
      <Alert severity="error" onClose={handleClose}>
        Cerrar
      </Alert>,
    );
    const button = screen.getByRole('button', { name: /close/i });
    await user.click(button);
    expect(handleClose).toHaveBeenCalled();
  });

  it('does not render close button when onClose is absent', () => {
    renderWithTheme(<Alert severity="info">Info</Alert>);
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  it('applies severity and variant classes', () => {
    const { container } = renderWithTheme(
      <Alert severity="success" variant="outlined">
        Ok
      </Alert>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('MuiAlert-outlinedSuccess');
  });

  it('renders title when provided', () => {
    renderWithTheme(
      <Alert severity="error" title="Error:">
        Falló
      </Alert>,
    );
    expect(screen.getByText('Error:')).toBeInTheDocument();
    expect(screen.getByText('Falló')).toBeInTheDocument();
  });

  it('hides icon when hideIcon is true', () => {
    const { container } = renderWithTheme(<Alert hideIcon>Sin icono</Alert>);
    expect(container.querySelector('.MuiAlert-icon')).toBeNull();
  });

  it('auto hides after specified duration', () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();
    renderWithTheme(
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
    const { container } = renderWithTheme(<Alert size="small">Pequeña</Alert>);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveStyle('font-size: 0.875rem'); // py: 0.5, px: 1.5
    expect(root).toHaveStyle('padding-top: 0.25rem'); // theme.spacing(0.5) is 4px with spacing = 8. py: 0.5 means paddingTop and paddingBottom
    expect(root).toHaveStyle('padding-left: 0.75rem'); // theme.spacing(1.5) is 12px
  });

  it('renders action when provided', () => {
    renderWithTheme(
      <Alert action={<button type="button">Acción</button>}>Con acción</Alert>,
    );
    expect(screen.getByRole('button', { name: 'Acción' })).toBeInTheDocument();
  });

  it('applies borderRadius from theme', () => {
    const { container } = renderWithTheme(<Alert>Con borde</Alert>);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveStyle('border-radius: 8px'); // theme.shape.borderRadius
  });

  it('applies boxShadow for standard variant', () => {
    const { container } = renderWithTheme(
      <Alert variant="standard">Sombra standard</Alert>,
    );
    const root = container.firstChild as HTMLElement;
    // Este es theme.shadows[1] por defecto en MUI
    expect(root).toHaveStyle(
      'box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    );
  });

  it('applies boxShadow for filled variant', () => {
    const { container } = renderWithTheme(
      <Alert variant="filled">Sombra filled</Alert>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveStyle(
      'box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    );
  });

  it('does not apply boxShadow for outlined variant', () => {
    const { container } = renderWithTheme(
      <Alert variant="outlined">Sin Sombra outlined</Alert>,
    );
    const root = container.firstChild as HTMLElement;
    // MUI outlined alerts might have 'none' or just not have the property.
    // Checking it's not the specific shadow is safer.
    expect(root.style.boxShadow).not.toBe(
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    );
  });

  describe('Corporate Colors', () => {
    // El tema tiene MuiAlert: defaultProps: { variant: 'filled' }
    // por lo que no es necesario especificar variant="filled" para probar colores de filled.

    it('applies error colors for error severity (filled)', () => {
      const { container } = renderWithTheme(<Alert severity="error">Error</Alert>);
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveStyle('background-color: rgb(120, 0, 0)'); // #780000
      expect(root).toHaveStyle('color: rgb(253, 240, 213)'); // #fdf0d5
    });

    it('applies info colors for info severity (filled)', () => {
      const { container } = renderWithTheme(<Alert severity="info">Info</Alert>);
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveStyle('background-color: rgb(0, 48, 73)'); // #003049
      expect(root).toHaveStyle('color: rgb(253, 240, 213)'); // #fdf0d5
    });

    it('applies success colors for success severity (filled)', () => {
      const { container } = renderWithTheme(
        <Alert severity="success">Success</Alert>,
      );
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveStyle('background-color: rgb(42, 157, 143)'); // #2a9d8f
      expect(root).toHaveStyle('color: rgb(253, 240, 213)'); // #fdf0d5
    });

    it('applies warning colors for warning severity (filled)', () => {
      const { container } = renderWithTheme(
        <Alert severity="warning">Warning</Alert>,
      );
      const root = container.firstChild as HTMLElement;
      expect(root).toHaveStyle('background-color: rgb(233, 196, 106)'); // #e9c46a
      expect(root).toHaveStyle('color: rgb(0, 48, 73)'); // #003049
    });

    // Para standard, el color principal afecta al icono y al texto, no al fondo.
    it('applies info color to icon for info severity (standard)', () => {
      const { container } = renderWithTheme(
        <Alert severity="info" variant="standard">
          Info Standard
        </Alert>,
      );
      const icon = container.querySelector('.MuiAlert-icon');
      expect(icon).toHaveStyle('color: rgb(0, 48, 73)'); // #003049
    });
  });
});
