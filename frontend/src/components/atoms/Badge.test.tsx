import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';
import { ThemeProvider } from '../../theme';
import MailIcon from '@mui/icons-material/Mail';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Badge', () => {
  it('renders badge content', () => {
    renderWithTheme(
      <Badge content={5}>
        <MailIcon />
      </Badge>,
    );
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('applies color class', () => {
    const { container } = renderWithTheme(
      <Badge content={1} color="primary">
        <MailIcon />
      </Badge>,
    );
    const badge = container.querySelector('.MuiBadge-badge') as HTMLElement;
    expect(badge).toHaveClass('MuiBadge-colorPrimary');
  });

  it('respects max prop', () => {
    renderWithTheme(
      <Badge content={100} max={99}>
        <MailIcon />
      </Badge>,
    );
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('hides badge when content is zero by default', () => {
    const { container } = renderWithTheme(
      <Badge content={0}>
        <MailIcon />
      </Badge>,
    );
    const badge = container.querySelector('.MuiBadge-badge') as HTMLElement;
    expect(badge).toHaveClass('MuiBadge-invisible');
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('shows zero when showZero is true', () => {
    renderWithTheme(
      <Badge content={0} showZero>
        <MailIcon />
      </Badge>,
    );
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
