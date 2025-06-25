import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { ToggleSwitchField } from './ToggleSwitchField';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ToggleSwitchField', () => {
  it('associates label and switch', () => {
    renderWithTheme(
      <ToggleSwitchField label="Activo" checked={false} onChange={() => {}} />,
    );
    const input = screen.getByLabelText('Activo');
    expect(input).toBeInTheDocument();
  });

  it('toggles on click and emits change', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <ToggleSwitchField label="Activo" checked={false} onChange={handleChange} />,
    );
    await user.click(screen.getByLabelText('Activo'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('toggles with keyboard', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <ToggleSwitchField label="Activo" checked={false} onChange={handleChange} />,
    );
    await user.tab();
    await user.keyboard('[Space]');
    expect(handleChange).toHaveBeenCalled();
  });

  it('does not change when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <ToggleSwitchField
        label="Activo"
        checked={false}
        disabled
        onChange={handleChange}
      />,
    );
    const input = screen.getByLabelText('Activo');
    expect(input).toBeDisabled();
    await expect(user.click(input)).rejects.toThrow();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
