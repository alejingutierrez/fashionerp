import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Avatar', () => {
  it('renders image with alt text', () => {
    renderWithTheme(<Avatar src="avatar.png" alt="Foto de Juan" />);
    const img = screen.getByRole('img', { name: /foto de juan/i });
    expect(img).toHaveAttribute('src', 'avatar.png');
  });

  it('renders initials when no image', () => {
    renderWithTheme(<Avatar>JP</Avatar>);
    expect(screen.getByText('JP')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = renderWithTheme(<Avatar variant="rounded">JP</Avatar>);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('MuiAvatar-rounded');
  });

  it('applies size styles', () => {
    const { getByText } = renderWithTheme(<Avatar size="large">JP</Avatar>);
    const root = getByText('JP');
    expect(root).toHaveStyle({ width: '64px', height: '64px' });
  });

  it('shows status badge when status is provided', () => {
    renderWithTheme(<Avatar status="online">JP</Avatar>);
    expect(screen.getByTestId('avatar-status')).toBeInTheDocument();
  });
});
