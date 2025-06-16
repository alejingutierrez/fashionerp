import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { AvatarName } from './AvatarName';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('AvatarName', () => {
  it('renders avatar image when src provided', () => {
    renderWithTheme(<AvatarName name="Juan" src="avatar.png" />);
    const img = screen.getByRole('img', { name: /juan/i });
    expect(img).toHaveAttribute('src', 'avatar.png');
  });

  it('renders initials when no image', () => {
    renderWithTheme(<AvatarName name="Juan Perez" />);
    expect(screen.getByText('JP')).toBeInTheDocument();
  });

  it('displays the name', () => {
    renderWithTheme(<AvatarName name="Maria" />);
    expect(screen.getByText('Maria')).toBeInTheDocument();
  });

  it('applies vertical orientation', () => {
    const { container } = renderWithTheme(
      <AvatarName name="Ana" orientation="vertical" />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveStyle({ flexDirection: 'column' });
  });

  it('applies size styles', () => {
    const { getByText } = renderWithTheme(<AvatarName name="Bob" size="small" />);
    const avatar = getByText('B');
    expect(avatar).toHaveStyle({ width: '32px', height: '32px' });
  });
});
