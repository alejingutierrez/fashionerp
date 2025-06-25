import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from '../../theme';
import { NumberStepper } from './NumberStepper';

function Wrapper(props: React.ComponentProps<typeof NumberStepper>) {
  const [val, setVal] = React.useState(props.value);
  return (
    <NumberStepper
      {...props}
      value={val}
      onChange={(v) => {
        setVal(v);
        props.onChange?.(v);
      }}
    />
  );
}

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('NumberStepper', () => {
  it('shows the initial value', () => {
    renderWithTheme(<NumberStepper value={3} onChange={() => {}} />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input.value).toBe('3');
  });

  it('increments value on button click', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<NumberStepper value={0} onChange={handleChange} />);
    await user.click(screen.getByRole('button', { name: /increment/i }));
    expect(handleChange).toHaveBeenLastCalledWith(1);
  });

  it('decrements value on button click', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<NumberStepper value={0} onChange={handleChange} />);
    await user.click(screen.getByRole('button', { name: /decrement/i }));
    expect(handleChange).toHaveBeenLastCalledWith(-1);
  });

  it('does not decrement below min', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<NumberStepper value={0} min={0} onChange={handleChange} />);
    const dec = screen.getByRole('button', { name: /decrement/i });
    await expect(user.click(dec)).rejects.toThrow();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('does not increment above max', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<NumberStepper value={1} max={1} onChange={handleChange} />);
    const inc = screen.getByRole('button', { name: /increment/i });
    await expect(user.click(inc)).rejects.toThrow();
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('normalizes manual input on blur', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<Wrapper value={0} min={0} max={5} onChange={handleChange} />);
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
