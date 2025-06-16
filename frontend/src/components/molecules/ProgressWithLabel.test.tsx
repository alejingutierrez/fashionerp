import { render, screen } from '@testing-library/react';
import { ProgressWithLabel } from './ProgressWithLabel';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ProgressWithLabel', () => {
  it('shows percentage text when progress provided', () => {
    renderWithTheme(<ProgressWithLabel progress={50} />);
    expect(screen.getByText('50% completado')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '50');
  });

  it('shows default loading text when indeterminate', () => {
    renderWithTheme(<ProgressWithLabel />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('uses custom label when provided', () => {
    renderWithTheme(<ProgressWithLabel progress={20} label="Subiendo" />);
    expect(screen.getByText('Subiendo')).toBeInTheDocument();
  });
});
