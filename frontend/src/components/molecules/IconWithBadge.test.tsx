import { render, screen } from '@testing-library/react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ThemeProvider } from '../../theme';
import { IconWithBadge } from './IconWithBadge';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('IconWithBadge', () => {
  it('hides badge when count is zero by default', () => {
    const { container } = renderWithTheme(
      <IconWithBadge icon={<NotificationsIcon />} label="notificaciones" />,
    );
    const badge = container.querySelector('.MuiBadge-badge') as HTMLElement;
    expect(badge).toHaveClass('MuiBadge-invisible');
  });

  it('shows badge with count text', () => {
    renderWithTheme(
      <IconWithBadge icon={<NotificationsIcon />} label="notificaciones" count={5} />,
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows overflow text when count exceeds max', () => {
    renderWithTheme(
      <IconWithBadge
        icon={<NotificationsIcon />}
        count={150}
        max={99}
        label="notificaciones"
      />,
    );
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('applies custom position class', () => {
    const { container } = renderWithTheme(
      <IconWithBadge
        icon={<NotificationsIcon />}
        count={1}
        position="bottom-left"
        label="notificaciones"
      />,
    );
    const badge = container.querySelector('.MuiBadge-badge') as HTMLElement;
    expect(badge).toHaveClass('MuiBadge-anchorOriginBottomLeftCircular');
  });

  it('sets combined aria-label', () => {
    renderWithTheme(
      <IconWithBadge icon={<NotificationsIcon />} label="notificaciones" count={2} />,
    );
    expect(screen.getByLabelText('2 notificaciones')).toBeInTheDocument();
  });
});
