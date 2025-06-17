import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { OrderListItem } from './OrderListItem';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('OrderListItem', () => {
  it('renders number, date, customer, total and status', () => {
    renderWithTheme(
      <OrderListItem
        orderNumber={1001}
        date="2025-06-12"
        customer="Ana"
        total={50}
        status="pending"
      />,
    );
    expect(screen.getByText('#1001')).toBeInTheDocument();
    expect(screen.getByText('12/06/2025')).toBeInTheDocument();
    expect(screen.getByText('Ana')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
  });

  it('uses correct color for delivered status', () => {
    const { container } = renderWithTheme(
      <OrderListItem orderNumber={1} date="2025-06-12" status="delivered" />,
    );
    const chip = container.querySelector('.MuiChip-root') as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorSuccess');
  });

  it('hides customer and total in compact variant', () => {
    renderWithTheme(
      <OrderListItem
        orderNumber={1}
        date="2025-06-12"
        customer="Ana"
        total={10}
        variant="compact"
      />,
    );
    expect(screen.queryByText('Ana')).toBeNull();
    expect(screen.queryByText('$10.00')).toBeNull();
  });

  it('fires onClick when item clicked', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(
      <OrderListItem orderNumber={1} date="2025-06-12" onClick={handle} />,
    );
    await user.click(screen.getByText('#1'));
    expect(handle).toHaveBeenCalled();
  });
});
