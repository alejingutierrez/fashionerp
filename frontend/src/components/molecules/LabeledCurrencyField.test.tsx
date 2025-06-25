import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { LabeledCurrencyField } from './LabeledCurrencyField';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('LabeledCurrencyField', () => {
  it('associates label and input', () => {
    renderWithTheme(
      <LabeledCurrencyField label="Precio" value={0} onChange={() => {}} />,
    );
    const input = screen.getByLabelText('Precio');
    expect(input).toBeInTheDocument();
  });

  it('formats value on blur', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <LabeledCurrencyField label="Precio" value={1000} onChange={() => {}} />,
    );
    const input = screen.getByLabelText('Precio');
    await user.click(input);
    await user.tab();
    expect((input as HTMLInputElement).value).toBe(
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(1000),
    );
  });

  it('ignores non numeric characters', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <LabeledCurrencyField label="Precio" value={0} onChange={handleChange} />,
    );
    const input = screen.getByLabelText('Precio');
    await user.type(input, 'a');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders disabled state', async () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <LabeledCurrencyField
        label="Precio"
        value={0}
        disabled
        onChange={handleChange}
      />,
    );
    const input = screen.getByLabelText('Precio');
    expect(input).toBeDisabled();
    await userEvent.type(input, '1');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows error when value is out of range', () => {
    renderWithTheme(
      <LabeledCurrencyField
        label="Precio"
        value={10}
        min={0}
        max={5}
        onChange={() => {}}
      />,
    );
    const input = screen.getByLabelText('Precio');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
