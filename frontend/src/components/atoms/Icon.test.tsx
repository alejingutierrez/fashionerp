import { render } from '@testing-library/react';
import { Icon } from './Icon';
import { ThemeProvider } from '../../theme';
import SearchIcon from '@mui/icons-material/Search';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Icon', () => {
  it('renders icon by name', () => {
    const { container } = renderWithTheme(<Icon name="search" data-testid="icon" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies color and size classes', () => {
    const { container } = renderWithTheme(
      <Icon name="search" color="error" size="small" data-testid="icon" />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('MuiSvgIcon-colorError');
    expect(svg).toHaveClass('MuiSvgIcon-fontSizeSmall');
  });

  it('renders custom icon element', () => {
    const { getByTestId } = renderWithTheme(
      <Icon icon={<SearchIcon data-testid="custom" />} />,
    );
    expect(getByTestId('custom')).toBeInTheDocument();
  });
});
