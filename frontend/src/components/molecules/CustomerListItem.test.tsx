import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { CustomerListItem } from './CustomerListItem';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('CustomerListItem', () => {
  it('renders avatar image, name and chip', () => {
    renderWithTheme(
      <CustomerListItem
        name="Ana Gomez"
        src="avatar.png"
        typeLabel="VIP"
        typeColor="warning"
      />,
    );
    expect(screen.getByRole('img', { name: /ana gomez/i })).toHaveAttribute(
      'src',
      'avatar.png',
    );
    expect(screen.getByText('Ana Gomez')).toBeInTheDocument();
    expect(screen.getByText('VIP')).toBeInTheDocument();
  });

  it('shows initials when image missing', () => {
    renderWithTheme(<CustomerListItem name="Juan Perez" />);
    expect(screen.getByText('JP')).toBeInTheDocument();
  });

  it('applies inactive styles', () => {
    const { container } = renderWithTheme(
      <CustomerListItem name="Ana" status="inactive" />,
    );
    const badge = container.querySelector('.MuiBadge-badge') as HTMLElement;
    expect(badge).not.toHaveClass('MuiBadge-colorSuccess');
    const name = screen.getByText('Ana');
    expect(name).toHaveStyle({ color: 'rgba(0, 0, 0, 0.38)' });
  });
});
