import { render } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { StatusBadgeDisplay } from './StatusBadgeDisplay';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('StatusBadgeDisplay', () => {
  const statuses = ['success', 'warning', 'error', 'info'] as const;

  statuses.forEach((status) => {
    it(`applies color class for ${status} status`, () => {
      const { container } = renderWithTheme(
        <StatusBadgeDisplay label="Estado" status={status} />,
      );
      const badge = container.querySelector('.MuiBadge-badge') as HTMLElement;
      const capitalized = status.charAt(0).toUpperCase() + status.slice(1);
      expect(badge).toHaveClass(`MuiBadge-color${capitalized}`);
    });
  });

  it('renders badge before text by default', () => {
    const { container } = renderWithTheme(
      <StatusBadgeDisplay label="Activo" status="success" />,
    );
    const wrapper = container.firstChild as HTMLElement;
    const style = window.getComputedStyle(wrapper);
    expect(style.flexDirection).toBe('row');
  });

  it('renders badge after text when badgePosition="end"', () => {
    const { container } = renderWithTheme(
      <StatusBadgeDisplay label="Activo" status="success" badgePosition="end" />,
    );
    const wrapper = container.firstChild as HTMLElement;
    const style = window.getComputedStyle(wrapper);
    expect(style.flexDirection).toBe('row-reverse');
  });

  it('renders only badge when label is empty', () => {
    const { container } = renderWithTheme(
      <StatusBadgeDisplay label="" status="success" />,
    );
    expect(container.querySelector('.MuiBadge-root')).toBeInTheDocument();
    expect(container.querySelector('.MuiTypography-root')).toBeNull();
  });
});
