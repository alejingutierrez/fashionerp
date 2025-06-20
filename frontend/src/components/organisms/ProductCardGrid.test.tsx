import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from '../../theme';
import { ProductCardGrid, ProductCard } from './ProductCardGrid';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ProductCardGrid', () => {
  const product: ProductCard = {
    id: '1',
    name: 'Producto',
    price: 10,
    status: 'available',
    src: 'img.png',
  };

  it('renders product names', () => {
    renderWithTheme(<ProductCardGrid products={[product]} />);
    expect(screen.getByText('Producto')).toBeInTheDocument();
  });

  it('fires onSelect when pressing Enter', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(<ProductCardGrid products={[product]} onSelect={handle} />);
    const card = screen.getAllByRole('button')[0];
    card.focus();
    await user.keyboard('{Enter}');
    expect(handle).toHaveBeenCalledWith('1');
  });

  it('calls onAdd when clicking plus button', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(<ProductCardGrid products={[product]} onAdd={handle} />);
    const add = screen.getByRole('button', {
      name: /Agregar Producto al carrito/i,
    });
    await user.click(add);
    expect(handle).toHaveBeenCalledWith('1');
  });
});
