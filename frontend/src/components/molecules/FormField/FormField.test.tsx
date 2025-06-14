import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../../theme';
import { FormField } from './FormField';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('FormField', () => {
  it('renders label associated with input', () => {
    renderWithTheme(<FormField label="Nombre" />);
    const input = screen.getByLabelText('Nombre');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<FormField label="Nombre" onChange={handleChange} />);
    const input = screen.getByLabelText('Nombre') as HTMLInputElement;
    await user.type(input, 'Juan');
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error message and styles in error state', () => {
    renderWithTheme(<FormField label="Nombre" error errorMessage="Campo requerido" />);
    expect(screen.getByText('Campo requerido')).toBeInTheDocument();
    const input = screen.getByLabelText('Nombre');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
