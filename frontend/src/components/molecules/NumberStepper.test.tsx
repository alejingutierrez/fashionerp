import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from '../../theme';
import { NumberStepper } from './NumberStepper';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('NumberStepper', () => {
  it('shows the initial value', () => {
    renderWithTheme(<NumberStepper defaultValue={3} />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input.value).toBe('3');
  });

  it('increments value on button click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<NumberStepper defaultValue={0} />);
    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
  });

  it('decrements value on button click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<NumberStepper defaultValue={0} />);
    await user.click(screen.getByRole('button', { name: /decrement/i }));
    expect(screen.getByRole('spinbutton')).toHaveValue(-1);
  });

  it('does not decrement below min', async () => {
    const user = userEvent.setup();
    renderWithTheme(<NumberStepper defaultValue={0} min={0} />);
    const dec = screen.getByRole('button', { name: /decrement/i });
    await expect(user.click(dec)).rejects.toThrow();
    expect(screen.getByRole('spinbutton')).toHaveValue(0);
  });

  it('does not increment above max', async () => {
    const user = userEvent.setup();
    renderWithTheme(<NumberStepper defaultValue={1} max={1} />);
    const inc = screen.getByRole('button', { name: /increment/i });
    await expect(user.click(inc)).rejects.toThrow();
    expect(screen.getByRole('spinbutton')).toHaveValue(1);
  });

  it('normalizes manual input on blur', async () => {
    const user = userEvent.setup();
    renderWithTheme(<NumberStepper defaultValue={0} min={0} max={5} />);
    const input = screen.getByRole('spinbutton');
    await user.click(input);
    await user.clear(input);
    await user.type(input, '10');
    fireEvent.blur(input);
    expect(input).toHaveValue(5);
  });

  it('is disabled when prop disabled', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<NumberStepper value={1} onChange={handleChange} disabled />);
    const input = screen.getByRole('spinbutton');
    const inc = screen.getByRole('button', { name: /increment/i });
    const dec = screen.getByRole('button', { name: /decrement/i });
    expect(input).toBeDisabled();
    expect(inc).toBeDisabled();
    expect(dec).toBeDisabled();
    await expect(user.click(inc)).rejects.toThrow();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
