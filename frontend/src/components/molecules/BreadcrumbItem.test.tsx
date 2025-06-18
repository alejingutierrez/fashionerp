import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ThemeProvider } from '../../theme';
import { BreadcrumbItem } from './BreadcrumbItem';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('BreadcrumbItem', () => {
  it('renders link and calls onNavigate', async () => {
    const user = userEvent.setup();
    const handleNavigate = jest.fn();
    renderWithTheme(
      <BreadcrumbItem label="Inicio" href="/home" onNavigate={handleNavigate} />,
    );
    const link = screen.getByRole('link', { name: 'Inicio' });
    expect(link).toHaveAttribute('href', '/home');
    await user.click(link);
    expect(handleNavigate).toHaveBeenCalledWith('/home');
  });

  it('marks last item with aria-current and no separator', () => {
    renderWithTheme(<BreadcrumbItem label="Actual" isLast />);
    const item = screen.getByText('Actual');
    expect(item).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByText('/')).toBeNull();
  });

  it('renders custom separator', () => {
    const { container } = renderWithTheme(
      <BreadcrumbItem
        label="Catálogo"
        href="#"
        separator={<ChevronRightIcon fontSize="small" />}
      />,
    );
    expect(screen.getByRole('link', { name: 'Catálogo' })).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
