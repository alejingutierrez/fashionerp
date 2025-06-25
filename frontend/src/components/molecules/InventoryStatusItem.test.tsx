import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { InventoryStatusItem } from './InventoryStatusItem';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('InventoryStatusItem', () => {
  it('shows name and stock', () => {
    renderWithTheme(<InventoryStatusItem name="Polo Azul" stock={10} />);
    expect(screen.getByText('Polo Azul')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('displays out of stock status', () => {
    const { container } = renderWithTheme(
      <InventoryStatusItem name="Chaqueta" stock={0} />,
    );
    expect(screen.getByText('Sin stock')).toBeInTheDocument();
    const chip = container.querySelector('.MuiChip-root') as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorError');
  });

  it('displays low stock when below threshold', () => {
    const { container } = renderWithTheme(
      <InventoryStatusItem name="Jeans" stock={3} lowStockThreshold={5} />,
    );
    expect(screen.getByText('Stock bajo')).toBeInTheDocument();
    const chip = container.querySelector('.MuiChip-root') as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorWarning');
  });

  it('displays in stock when above threshold', () => {
    const { container } = renderWithTheme(
      <InventoryStatusItem name="Camisa" stock={8} lowStockThreshold={5} />,
    );
    expect(screen.getByText('En stock')).toBeInTheDocument();
    const chip = container.querySelector('.MuiChip-root') as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorSuccess');
  });

  it('calls onStockChange when editable', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <InventoryStatusItem
        name="Zapatos"
        stock={2}
        editable
        onStockChange={handleChange}
      />,
    );
    const input = screen.getByRole('spinbutton');
    await user.type(input, '5');
    expect(handleChange).toHaveBeenCalled();
  });
});
