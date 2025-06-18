import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { DismissibleAlert } from './DismissibleAlert';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('DismissibleAlert', () => {
  it('shows message text', () => {
    renderWithTheme(<DismissibleAlert severity="success">Guardado</DismissibleAlert>);
    expect(screen.getByText('Guardado')).toBeInTheDocument();
  });

  it('applies severity class', () => {
    const { container } = renderWithTheme(
      <DismissibleAlert severity="error">Error</DismissibleAlert>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('MuiAlert-standardError');
  });

  it('hides alert when close button clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<DismissibleAlert severity="info">Info</DismissibleAlert>);
    const btn = screen.getByRole('button', { name: /cerrar alerta/i });
    await user.click(btn);
    expect(screen.queryByText('Info')).toBeNull();
  });

  it('calls onClose callback', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(
      <DismissibleAlert severity="info" onClose={handle}>
        Hola
      </DismissibleAlert>,
    );
    await user.click(screen.getByRole('button', { name: /cerrar alerta/i }));
    expect(handle).toHaveBeenCalled();
  });
});
