import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { StatusToggleChip } from './StatusToggleChip';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('StatusToggleChip', () => {
  it('shows initial active state', () => {
    renderWithTheme(<StatusToggleChip defaultActive onToggle={() => {}} />);
    expect(screen.getByText('Activo')).toBeInTheDocument();
  });

  it('toggles state on click and emits event', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(<StatusToggleChip defaultActive onToggle={handle} />);
    await user.click(screen.getByRole('button'));
    expect(handle).toHaveBeenCalledWith(false);
    expect(screen.getByText('Archivado')).toBeInTheDocument();
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(<StatusToggleChip defaultActive disabled onToggle={handle} />);
    const chip = screen.getByRole('button');
    expect(chip).toHaveAttribute('aria-disabled', 'true');
    await expect(user.click(chip)).rejects.toThrow();
    expect(handle).not.toHaveBeenCalled();
  });

  it('shows spinner when loading', () => {
    renderWithTheme(<StatusToggleChip loading onToggle={() => {}} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('shows lock icon without permission', () => {
    renderWithTheme(<StatusToggleChip hasPermission={false} onToggle={() => {}} />);
    expect(screen.getAllByLabelText('Sin permiso')[0]).toBeInTheDocument();
  });
});
