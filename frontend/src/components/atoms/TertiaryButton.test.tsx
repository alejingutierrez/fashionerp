import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TertiaryButton } from './TertiaryButton';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('TertiaryButton', () => {
  it('renders the provided text', () => {
    renderWithTheme(<TertiaryButton>Cancelar</TertiaryButton>);
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('calls onClick when enabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    renderWithTheme(<TertiaryButton onClick={handleClick}>Aceptar</TertiaryButton>);
    await user.click(screen.getByRole('button', { name: /aceptar/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <TertiaryButton disabled onClick={handleClick}>
        Disabled
      </TertiaryButton>,
    );
    const btn = screen.getByRole('button', { name: /disabled/i });
    expect(btn).toBeDisabled();
    btn.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders as link when href is provided', () => {
    renderWithTheme(<TertiaryButton href="https://example.com">Link</TertiaryButton>);
    const link = screen.getByRole('link', { name: /link/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('shows spinner when loading', () => {
    renderWithTheme(<TertiaryButton loading>Loading</TertiaryButton>);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
