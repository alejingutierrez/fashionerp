import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { ProductListItem } from './ProductListItem';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ProductListItem', () => {
  it('renders image, name, price and status', () => {
    renderWithTheme(
      <ProductListItem
        name="Camisa Polo"
        price={49.99}
        status="available"
        src="polo.png"
      />,
    );
    expect(screen.getByRole('img', { name: /camisa polo/i })).toHaveAttribute(
      'src',
      'polo.png',
    );
    expect(screen.getByText('Camisa Polo')).toBeInTheDocument();
    expect(screen.getByText('$49.99')).toBeInTheDocument();
    expect(screen.getByText('Disponible')).toBeInTheDocument();
  });

  it('shows initials when image missing', () => {
    renderWithTheme(
      <ProductListItem name="Zapatos XY" price={89.5} status="out_of_stock" />,
    );
    expect(screen.getByText('ZX')).toBeInTheDocument();
  });

  it('formats price with currency', () => {
    renderWithTheme(
      <ProductListItem
        name="Pantal\u00F3n"
        price={1000}
        currency="EUR"
        status="promotion"
      />,
    );
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(1000);
    expect(screen.getByText(formatted)).toBeInTheDocument();
  });

  it('uses correct color for out of stock status', () => {
    const { container } = renderWithTheme(
      <ProductListItem name="Test" price={1} status="out_of_stock" />,
    );
    const chip = container.querySelector('.MuiChip-root') as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorError');
  });

  it('fires onClick when item is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    renderWithTheme(<ProductListItem name="Botas" price={50} onClick={handleClick} />);
    await user.click(screen.getByText('Botas'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
