import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { StatWithIcon } from './StatWithIcon';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('StatWithIcon', () => {
  it('renders value and label', () => {
    renderWithTheme(<StatWithIcon value={100} label="Ventas" name="favorite" />);
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Ventas')).toBeInTheDocument();
  });

  it('renders icon using name prop', () => {
    const { container } = renderWithTheme(
      <StatWithIcon value={20} label="Likes" name="favorite" />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('applies vertical orientation', () => {
    const { container } = renderWithTheme(
      <StatWithIcon value={15} label="Clientes" name="user" orientation="vertical" />,
    );
    const root = container.firstChild as HTMLElement;
    const style = window.getComputedStyle(root);
    expect(style.flexDirection).toBe('column');
  });

  it('shows trend icon when specified', () => {
    renderWithTheme(
      <StatWithIcon value={50} label="Ingresos" name="search" trend="up" />,
    );
    expect(screen.getByTestId('trend-icon')).toBeInTheDocument();
  });
});
