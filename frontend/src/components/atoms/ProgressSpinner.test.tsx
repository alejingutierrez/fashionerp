import { render, screen } from '@testing-library/react';
import { ProgressSpinner } from './ProgressSpinner';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ProgressSpinner', () => {
  it('renders determinate variant with value', () => {
    renderWithTheme(<ProgressSpinner variant="determinate" value={25} />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toHaveAttribute('aria-valuenow', '25');
  });

  it('defaults to indeterminate variant', () => {
    renderWithTheme(<ProgressSpinner />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });
});
