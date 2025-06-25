import { render, screen, fireEvent } from '@testing-library/react';
import { RadioButton } from './RadioButton';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('RadioButton', () => {
  it('reflects checked prop and calls onChange when clicked', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <>
        <RadioButton checked={false} value="op1" onChange={handleChange} />
        <RadioButton checked value="op2" onChange={() => {}} />
      </>,
    );
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios[0].checked).toBe(false);
    expect(radios[1].checked).toBe(true);
    fireEvent.click(radios[0]);
    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when disabled prop true', () => {
    const handleChange = jest.fn();
    renderWithTheme(<RadioButton disabled onChange={handleChange} />);
    const input = screen.getByRole('radio') as HTMLInputElement;
    expect(input).toBeDisabled();
    input.click();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
