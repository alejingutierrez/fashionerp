import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from './Chip';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Chip', () => {
  it('renders the label', () => {
    renderWithTheme(<Chip label="Etiqueta" />);
    expect(screen.getByText('Etiqueta')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    renderWithTheme(<Chip label="Etiqueta" onClick={handleClick} />);
    await user.click(screen.getByRole('button', { name: /etiqueta/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when delete icon clicked', async () => {
    const user = userEvent.setup();
    const handleDelete = jest.fn();
    const { container } = renderWithTheme(<Chip label="Tag" onDelete={handleDelete} />);
    const icon = container.querySelector('.MuiChip-deleteIcon') as HTMLElement;
    await user.click(icon);
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('renders disabled state', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Chip label="Dis" disabled onClick={handleClick} />);
    const chip = screen.getByRole('button', { name: /dis/i });
    expect(chip).toHaveAttribute('aria-disabled', 'true');
  });

  it('applies color class when color prop used', () => {
    const { container } = renderWithTheme(<Chip label="color" color="primary" />);
    const chip = container.firstChild as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorPrimary');
  });

  it('applies outlined variant', () => {
    const { container } = renderWithTheme(<Chip label="outline" variant="outlined" />);
    const chip = container.firstChild as HTMLElement;
    expect(chip).toHaveClass('MuiChip-outlined');
  });
});
