import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SaveIcon from '@mui/icons-material/Save';
import { ThemeProvider } from '../../theme';
import { IconLabelButton } from './IconLabelButton';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('IconLabelButton', () => {
  it('shows icon and text', () => {
    const { container } = renderWithTheme(
      <IconLabelButton icon={<SaveIcon />} label="Guardar" />,
    );
    expect(screen.getByText('Guardar')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    renderWithTheme(
      <IconLabelButton icon={<SaveIcon />} label="Save" onClick={handleClick} />,
    );
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not fire onClick when disabled', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <IconLabelButton
        icon={<SaveIcon />}
        label="Save"
        onClick={handleClick}
        disabled
      />,
    );
    const btn = screen.getByRole('button', { name: /save/i });
    btn.click();
    expect(btn).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders icon after text when iconPosition="right"', () => {
    const { container } = renderWithTheme(
      <IconLabelButton
        icon={<SaveIcon data-testid="icon" />}
        label="Enviar"
        iconPosition="right"
      />,
    );
    const btn = screen.getByRole('button', { name: /enviar/i });
    const icon = screen.getByTestId('icon');
    expect(btn.lastElementChild).toContainElement(icon);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders only icon when no label', () => {
    const { container } = renderWithTheme(
      <IconLabelButton icon={<SaveIcon />} ariaLabel="guardar" />,
    );
    expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
