import { render, screen } from '@testing-library/react';
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
});
