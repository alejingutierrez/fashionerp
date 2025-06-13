import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from './Switch';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Switch', () => {
  it('reflects checked prop and calls onChange', () => {
    const handleChange = jest.fn();
    renderWithTheme(<Switch checked={false} onChange={handleChange} />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(false);
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders checked state', () => {
    renderWithTheme(<Switch checked onChange={() => {}} />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('is disabled when disabled prop true', () => {
    const handleChange = jest.fn();
    renderWithTheme(<Switch checked disabled onChange={handleChange} />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input).toBeDisabled();
    input.click();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
