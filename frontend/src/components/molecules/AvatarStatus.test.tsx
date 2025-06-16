import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { AvatarStatus } from './AvatarStatus';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('AvatarStatus', () => {
  it('positions badge at bottom right by default', () => {
    const { container } = renderWithTheme(<AvatarStatus name="Ana" status="online" />);
    const badge = container.querySelector('.MuiBadge-badge') as HTMLElement;
    expect(badge).toHaveClass('MuiBadge-anchorOriginBottomRightCircular');
  });

  it('applies color class for online status', () => {
    const { container } = renderWithTheme(<AvatarStatus name="Bob" status="online" />);
    const badge = container.querySelector('.MuiBadge-badge') as HTMLElement;
    expect(badge).toHaveClass('MuiBadge-colorSuccess');
  });

  it('shows initials when no image', () => {
    renderWithTheme(<AvatarStatus name="Carlos Perez" status="offline" />);
    expect(screen.getByText('CP')).toBeInTheDocument();
  });

  it('applies custom badge position', () => {
    const { container } = renderWithTheme(
      <AvatarStatus name="Dana" status="away" position="top-left" />,
    );
    const badge = container.querySelector('.MuiBadge-badge') as HTMLElement;
    expect(badge).toHaveClass('MuiBadge-anchorOriginTopLeftCircular');
  });

  it('respects avatar size', () => {
    const { container } = renderWithTheme(
      <AvatarStatus name="Ema" status="busy" size="large" />,
    );
    const avatar = container.querySelector('.MuiAvatar-root') as HTMLElement;
    expect(avatar).toHaveStyle({ width: '64px', height: '64px' });
  });
});
