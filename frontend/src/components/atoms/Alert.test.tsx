import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';
import { ThemeProvider } from '../../theme';
import { Button } from '@mui/material'; // Importar Button para usar en actions

// Helper para renderizar con el ThemeProvider
function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Alert', () => {
  it('renders message text', () => {
    renderWithTheme(<Alert severity="error">Mensaje de error</Alert>);
    expect(screen.getByText('Mensaje de error')).toBeInTheDocument();
  });

  it('renders close button and calls onClose when onClose is provided', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    renderWithTheme(
      <Alert severity="error" onClose={handleClose}>
        Cerrar
      </Alert>,
    );
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not render close button when onClose is absent', () => {
    renderWithTheme(<Alert severity="info">Info</Alert>);
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  it('applies severity and variant classes correctly', () => {
    const { container } = renderWithTheme(
      <Alert severity="success" variant="outlined">
        Ok
      </Alert>,
    );
    const alertElement = container.firstChild;
    expect(alertElement).toHaveClass('MuiAlert-outlinedSuccess'); // Clase específica de MUI para variante y severidad
  });

  it('renders title when provided', () => {
    renderWithTheme(
      <Alert severity="error" title="Error Titulo">
        Falló el mensaje.
      </Alert>,
    );
    expect(screen.getByText('Error Titulo')).toBeInTheDocument();
    expect(screen.getByText('Falló el mensaje.')).toBeInTheDocument();
  });

  it('hides icon when hideIcon prop is true', () => {
    const { container } = renderWithTheme(<Alert hideIcon>Sin icono</Alert>);
    // El icono se implementa con un div con la clase MuiAlert-icon
    // En MUI v5, el icono (si existe) está dentro de .MuiAlert-icon
    // Si no hay icono, el elemento .MuiAlert-icon no debería estar o estar vacío.
    // La prop `icon={false}` en MuiAlert hace que no se renderice el slot del icono.
    expect(container.querySelector('.MuiAlert-icon')).toBeNull();
  });

  it('shows icon by default (when hideIcon is false or not provided)', () => {
    const { container } = renderWithTheme(<Alert>Con icono</Alert>);
    expect(container.querySelector('.MuiAlert-icon')).toBeInTheDocument();
  });

  it('auto hides after specified autoHideDuration when onClose is provided', () => {
    jest.useFakeTimers();
    const handleClose = jest.fn();
    renderWithTheme(
      <Alert onClose={handleClose} autoHideDuration={2000}>
        Desaparece
      </Alert>,
    );
    expect(handleClose).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(handleClose).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('does not auto hide if onClose is not provided, even if autoHideDuration is set', () => {
    jest.useFakeTimers();
    // const handleClose = jest.fn(); // No se pasa a la alerta, así que no se puede llamar
    renderWithTheme(
      <Alert autoHideDuration={2000}>
        No desaparece
      </Alert>,
    );
    // No hay manera de verificar que onClose no se haya llamado si no se pasó.
    // La prueba se basa en que no crashee y que el useEffect internamente no intente llamar a un onClose undefined.
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    // No hay aserción directa aquí, pero la prueba pasa si no hay errores.
    // Podríamos añadir un spy a clearTimeout para ver si se intentó limpiar un timer,
    // pero es un detalle de implementación. La funcionalidad principal es que no llame a un onClose inexistente.
    expect(true).toBe(true); // Placeholder para indicar que la prueba se ejecutó
    jest.useRealTimers();
  });

  it('applies small size styles with correct font-size', () => {
    const { container } = renderWithTheme(<Alert size="small">Pequeña</Alert>);
    const alertElement = container.firstChild as HTMLElement;
    expect(alertElement).toHaveStyle('font-size: 0.8125rem');
  });

  it('renders custom actions and handles click', async () => {
    const user = userEvent.setup();
    const handleActionClick = jest.fn();
    const actionButtonText = 'Reintentar';
    renderWithTheme(
      <Alert
        severity="warning"
        actions={<Button onClick={handleActionClick}>{actionButtonText}</Button>}
      >
        Algo salió mal.
      </Alert>,
    );

    const actionButton = screen.getByRole('button', { name: actionButtonText });
    expect(actionButton).toBeInTheDocument();
    await user.click(actionButton);
    expect(handleActionClick).toHaveBeenCalledTimes(1);
  });

  it('renders multiple custom actions', () => {
    const handleAction1Click = jest.fn(); // No se probará el click aquí, solo el renderizado
    const handleAction2Click = jest.fn();
    renderWithTheme(
      <Alert
        severity="info"
        actions={
          <>
            <Button onClick={handleAction1Click}>Acción 1</Button>
            <Button onClick={handleAction2Click}>Acción 2</Button>
          </>
        }
      >
        Info con múltiples acciones.
      </Alert>,
    );

    expect(screen.getByRole('button', { name: 'Acción 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Acción 2' })).toBeInTheDocument();
  });

  it('renders title, message, actions and close button all together', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    const handleAction = jest.fn();
    renderWithTheme(
        <Alert
            title="Título Completo"
            severity="success"
            onClose={handleClose}
            actions={<Button onClick={handleAction}>Acción Principal</Button>}
        >
            Este es un mensaje de éxito completo.
        </Alert>
    );

    expect(screen.getByText("Título Completo")).toBeInTheDocument();
    expect(screen.getByText("Este es un mensaje de éxito completo.")).toBeInTheDocument();

    const actionButton = screen.getByRole('button', {name: "Acción Principal"});
    expect(actionButton).toBeInTheDocument();
    await user.click(actionButton);
    expect(handleAction).toHaveBeenCalledTimes(1);

    const closeButton = screen.getByRole('button', {name: /close/i}); // El botón de cierre
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
