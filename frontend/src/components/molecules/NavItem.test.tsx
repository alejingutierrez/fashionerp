import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { ThemeProvider } from '../../theme';
import { NavItem } from './NavItem';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('NavItem', () => {
  it('renders icon and text', () => {
    renderWithTheme(<NavItem icon={<Inventory2Icon />} label="Inventario" />);
    expect(screen.getByText('Inventario')).toBeInTheDocument();
    expect(screen.getByLabelText('Inventario')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    renderWithTheme(
      <NavItem icon={<Inventory2Icon />} label="Inventario" onClick={handleClick} />,
    );
    await user.click(screen.getByText('Inventario'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies aria-current when active', () => {
    renderWithTheme(
      <NavItem icon={<Inventory2Icon />} label="Inventario" href="#" active />,
    );
    expect(screen.getByRole('link', { name: 'Inventario' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('shows tooltip when collapsed', async () => {
    const user = userEvent.setup();
    renderWithTheme(<NavItem icon={<Inventory2Icon />} label="Inventario" collapsed />);
    const icon = screen.getByLabelText('Inventario');
    await user.hover(icon);
    expect(await screen.findByText('Inventario')).toBeInTheDocument();
  });

  it('does not trigger click when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    renderWithTheme(
      <NavItem
        icon={<Inventory2Icon />}
        label="Inventario"
        onClick={handleClick}
        disabled
      />,
    );
    await user.click(screen.getByLabelText('Inventario'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
