import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { LabeledTextField } from './LabeledTextField';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('LabeledTextField', () => {
  it('associates label and input', () => {
    renderWithTheme(<LabeledTextField label="Nombre" />);
    const input = screen.getByLabelText('Nombre');
    expect(input).toBeInTheDocument();
  });

  it('updates value on change', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<LabeledTextField label="Nombre" onChange={handleChange} />);
    const input = screen.getByLabelText('Nombre') as HTMLInputElement;
    await user.type(input, 'Juan');
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders disabled state', async () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <LabeledTextField label="Nombre" disabled onChange={handleChange} />,
    );
    const input = screen.getByLabelText('Nombre');
    expect(input).toBeDisabled();
    await userEvent.type(input, 'a');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows helper text in error state', () => {
    renderWithTheme(
      <LabeledTextField label="Nombre" error helperText="Campo requerido" />,
    );
    expect(screen.getByText('Campo requerido')).toBeInTheDocument();
    const input = screen.getByLabelText('Nombre');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
