import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { LabeledNumberField } from './LabeledNumberField';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('LabeledNumberField', () => {
  it('associates label and input', () => {
    renderWithTheme(
      <LabeledNumberField label="Cantidad" value={0} onChange={() => {}} />,
    );
    const input = screen.getByLabelText('Cantidad');
    expect(input).toBeInTheDocument();
  });

  it('updates value on change with numbers only', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <LabeledNumberField label="Cantidad" value={0} onChange={handleChange} />,
    );
    const input = screen.getByLabelText('Cantidad') as HTMLInputElement;
    await user.type(input, '5');
    expect(handleChange).toHaveBeenCalled();
  });

  it('ignores non numeric characters', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <LabeledNumberField label="Cantidad" value={0} onChange={handleChange} />,
    );
    const input = screen.getByLabelText('Cantidad');
    await user.type(input, 'a');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('renders disabled state', async () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <LabeledNumberField
        label="Cantidad"
        value={0}
        disabled
        onChange={handleChange}
      />,
    );
    const input = screen.getByLabelText('Cantidad');
    expect(input).toBeDisabled();
    await userEvent.type(input, '1');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows error when value is out of range', () => {
    renderWithTheme(
      <LabeledNumberField
        label="Cantidad"
        value={10}
        min={0}
        max={5}
        onChange={() => {}}
      />,
    );
    const input = screen.getByLabelText('Cantidad');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
