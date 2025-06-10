import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextArea } from './TextArea';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('TextArea', () => {
  it('renders textarea element with label', () => {
    renderWithTheme(<TextArea label="Descripción" />);
    const textarea = screen.getByLabelText(/descripción/i) as HTMLTextAreaElement;
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('shows value and calls onChange', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <TextArea label="Descripción" value="Texto" onChange={handleChange} />,
    );
    const textarea = screen.getByLabelText(/descripción/i) as HTMLTextAreaElement;
    expect(textarea.value).toBe('Texto');
    await user.type(textarea, ' adicional');
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders helper text in error state', () => {
    renderWithTheme(
      <TextArea label="Descripción" error helperText="Campo requerido" />,
    );
    expect(screen.getByText('Campo requerido')).toBeInTheDocument();
    const textarea = screen.getByLabelText(/descripción/i);
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders disabled state', async () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <TextArea label="Descripción" disabled onChange={handleChange} />,
    );
    const textarea = screen.getByLabelText(/descripción/i);
    expect(textarea).toBeDisabled();
    await userEvent.type(textarea, 'a');
    expect(handleChange).not.toHaveBeenCalled();
  });
});
