import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from './TextField';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('TextField', () => {
  it('renders label', () => {
    renderWithTheme(<TextField label="Nombre" />);
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
  });

  it('shows value and calls onChange', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<TextField label="Nombre" value="Juan" onChange={handleChange} />);
    const input = screen.getByLabelText(/nombre/i) as HTMLInputElement;
    expect(input.value).toBe('Juan');
    await user.type(input, 'p');
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders helper text in error state', () => {
    renderWithTheme(<TextField label="Nombre" error helperText="Campo requerido" />);
    expect(screen.getByText('Campo requerido')).toBeInTheDocument();
    const input = screen.getByLabelText(/nombre/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders disabled state', async () => {
    const handleChange = jest.fn();
    renderWithTheme(<TextField label="Nombre" disabled onChange={handleChange} />);
    const input = screen.getByLabelText(/nombre/i);
    expect(input).toBeDisabled();
    await userEvent.type(input, 'a');
    expect(handleChange).not.toHaveBeenCalled();
  });
});
