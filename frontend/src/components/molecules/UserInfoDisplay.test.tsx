import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { UserInfoDisplay } from './UserInfoDisplay';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('UserInfoDisplay', () => {
  it('renders avatar, name and secondary info', () => {
    renderWithTheme(
      <UserInfoDisplay
        name="Juan Perez"
        secondaryInfo="Administrador"
        src="avatar.png"
      />,
    );
    expect(screen.getByRole('img', { name: /juan perez/i })).toHaveAttribute(
      'src',
      'avatar.png',
    );
    expect(screen.getByText('Juan Perez')).toBeInTheDocument();
    expect(screen.getByText('Administrador')).toBeInTheDocument();
  });

  it('handles missing secondary info', () => {
    renderWithTheme(<UserInfoDisplay name="Ana" />);
    expect(screen.queryByText('Ana', { selector: 'p' })).toBeInTheDocument();
    // should not render additional text nodes beyond the name
    const paragraphs = screen.getAllByText('Ana');
    expect(paragraphs).toHaveLength(1);
  });

  it('shows initials when no image', () => {
    renderWithTheme(<UserInfoDisplay name="Ana Gomez" />);
    expect(screen.getByText('AG')).toBeInTheDocument();
  });

  it('applies vertical orientation', () => {
    const { container } = renderWithTheme(
      <UserInfoDisplay name="Bob" orientation="vertical" />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveStyle({ flexDirection: 'column' });
  });

  it('renders skeletons when loading', () => {
    const { queryByTestId } = renderWithTheme(
      <UserInfoDisplay name="Loading" loading />,
    );
    expect(queryByTestId('avatar-skeleton')).toBeInTheDocument();
    expect(queryByTestId('name-skeleton')).toBeInTheDocument();
    expect(screen.queryByText('Loading')).toBeNull();
  });
});
