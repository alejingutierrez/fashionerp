import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Checkbox', () => {
  it('reflects checked prop and calls onChange', () => {
    const handleChange = jest.fn();
    renderWithTheme(<Checkbox checked={false} onChange={handleChange} />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(false);
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders checked state', () => {
    renderWithTheme(<Checkbox checked onChange={() => {}} />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('shows indeterminate state', () => {
    renderWithTheme(<Checkbox indeterminate onChange={() => {}} />);
    const input = screen.getByRole('checkbox');
    expect(input.getAttribute('data-indeterminate')).toBe('true');
  });

  it('is disabled when disabled prop true', () => {
    const handleChange = jest.fn();
    renderWithTheme(<Checkbox checked disabled onChange={handleChange} />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input).toBeDisabled();
    input.click();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
