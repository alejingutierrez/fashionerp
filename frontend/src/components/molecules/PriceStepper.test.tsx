import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from '../../theme';
import { PriceStepper } from './PriceStepper';

function Wrapper(props: React.ComponentProps<typeof PriceStepper>) {
  const [val, setVal] = React.useState(props.value);
  return (
    <PriceStepper
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

describe('PriceStepper', () => {
  it('shows the initial value', () => {
    renderWithTheme(<PriceStepper value={1.23} onChange={() => {}} />);
    const input = screen.getByRole('spinbutton') as HTMLInputElement;
    expect(input.value).toBe('1.23');
  });

  it('increments up to max', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(<Wrapper value={0} max={0.05} onChange={handle} />);
    const inc = screen.getByRole('button', { name: /incrementar/i });
    for (let i = 0; i < 10; i++) {
      try {
        await user.click(inc);
      } catch {
        /* ignore */
      }
    }
    expect(handle).toHaveBeenLastCalledWith(0.05);
  });

  it('normalizes out of range input', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Wrapper value={0} min={0} max={1} />);
    const input = screen.getByRole('spinbutton');
    await user.clear(input);
    await user.type(input, '10');
    fireEvent.blur(input);
    expect(input).toHaveValue(1);
  });

  it('emits numeric value', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(<PriceStepper value={0} onChange={handle} />);
    await user.click(screen.getByRole('button', { name: /incrementar/i }));
    expect(handle).toHaveBeenLastCalledWith(0.01);
  });

  it('handles arrow key increments', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(<Wrapper value={0} onChange={handle} />);
    const input = screen.getByRole('spinbutton');
    await user.click(input);
    await user.keyboard('{ArrowUp}');
    expect(handle).toHaveBeenLastCalledWith(0.01);
    await user.keyboard('{ArrowDown}');
    expect(handle).toHaveBeenLastCalledWith(0);
  });
});
