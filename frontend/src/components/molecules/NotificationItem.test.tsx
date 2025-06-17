import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { NotificationItem } from './NotificationItem';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('NotificationItem', () => {
  it('shows warning icon when type is warning', () => {
    const { container } = renderWithTheme(
      <NotificationItem type="warning" message="Atención" />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('MuiSvgIcon-colorWarning');
  });

  it('renders message and timestamp', () => {
    renderWithTheme(<NotificationItem message="Nuevo pedido" timestamp="hace 1 h" />);
    expect(screen.getByText('Nuevo pedido')).toBeInTheDocument();
    expect(screen.getByText('hace 1 h')).toBeInTheDocument();
  });

  it('hides unread dot when read', () => {
    const { container } = renderWithTheme(<NotificationItem message="Leído" read />);
    const badge = container.querySelector('.MuiBadge-badge') as HTMLElement;
    expect(badge).toHaveClass('MuiBadge-invisible');
  });

  it('calls onDismiss when dismiss button clicked', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(<NotificationItem message="X" onDismiss={handle} />);
    await user.click(screen.getByRole('button', { name: /dismiss notification/i }));
    expect(handle).toHaveBeenCalled();
  });
});
