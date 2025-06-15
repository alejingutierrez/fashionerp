import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CurrencyField } from './CurrencyField';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('CurrencyField', () => {
  it('formats value on blur', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CurrencyField value={1000} onChange={() => {}} currency="USD" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await user.click(input);
    await user.tab();
    expect(input.value).toBe(
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(1000),
    );
  });

  it('ignores non numeric characters', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<CurrencyField value={0} onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'a');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders disabled state', async () => {
    const handleChange = jest.fn();
    renderWithTheme(<CurrencyField value={0} disabled onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    await userEvent.type(input, '1');
    expect(handleChange).not.toHaveBeenCalled();
  });
});
