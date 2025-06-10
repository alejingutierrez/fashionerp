import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Select', () => {
  const options = [
    { value: 'a', label: 'Opción A' },
    { value: 'b', label: 'Opción B' },
  ];

  it('renders label and selected option', () => {
    renderWithTheme(
      <Select label="Estado" options={options} value="a" onChange={() => {}} />,
    );
    const select = screen.getByLabelText(/estado/i);
    expect(select).toHaveTextContent('Opción A');
  });

  it('calls onChange when selecting another option', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <Select
        label="Estado"
        options={options}
        value="a"
        onChange={handleChange}
      />,
    );
    const button = screen.getByLabelText(/estado/i);
    fireEvent.mouseDown(button);
    await user.click(screen.getByRole('option', { name: 'Opción B' }));
    expect(handleChange).toHaveBeenCalled();
    const event = handleChange.mock.calls[0][0];
    expect(event.target.value).toBe('b');
  });

  it('renders helper text in error state', () => {
    renderWithTheme(
      <Select
        label="Estado"
        options={options}
        value="a"
        error
        helperText="Requerido"
        onChange={() => {}}
      />,
    );
    expect(screen.getByText('Requerido')).toBeInTheDocument();
    const select = screen.getByLabelText(/estado/i);
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders disabled state', async () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Select
        label="Estado"
        options={options}
        value="a"
        disabled
        onChange={handleChange}
      />,
    );
    const button = screen.getByLabelText(/estado/i);
    expect(button).toHaveAttribute('aria-disabled', 'true');
    fireEvent.mouseDown(button);
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
