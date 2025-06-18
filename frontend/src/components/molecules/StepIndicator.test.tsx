import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { StepIndicator } from './StepIndicator';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('StepIndicator', () => {
  it('shows step number when pending', () => {
    renderWithTheme(<StepIndicator step={2} label="Envio" />);
    expect(screen.getByText('Envio')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('shows check icon when completed', () => {
    const { container } = renderWithTheme(
      <StepIndicator step={1} label="Pago" status="completed" />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('marks current step with aria-current', () => {
    renderWithTheme(
      <StepIndicator step={3} label="Confirmar" status="current" />,
    );
    const root = screen.getByText('Confirmar').parentElement as HTMLElement;
    expect(root).toHaveAttribute('aria-current', 'step');
  });

  it('renders vertical orientation with connector', () => {
    const { container } = renderWithTheme(
      <StepIndicator
        step={1}
        label="Datos"
        orientation="vertical"
        connector
      />,
    );
    const divider = container.querySelector('.MuiDivider-root');
    expect(divider).toBeInTheDocument();
  });
});
