import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NumberInput } from './NumberInput';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('NumberInput', () => {
  it('renders with value and calls onChange for numbers', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<NumberInput value={1} onChange={handleChange} />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input.value).toBe('1');
    await user.type(input, '2');
    expect(handleChange).toHaveBeenCalled();
  });

  it('ignores non numeric characters', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<NumberInput value={0} onChange={handleChange} />);
    const input = screen.getByRole('spinbutton');
    await user.type(input, 'a');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders disabled state', async () => {
    const handleChange = jest.fn();
    renderWithTheme(<NumberInput value={0} disabled onChange={handleChange} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toBeDisabled();
    await userEvent.type(input, '1');
    expect(handleChange).not.toHaveBeenCalled();
  });
});
