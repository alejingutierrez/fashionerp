import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { CurrencySummaryRow } from './CurrencySummaryRow';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('CurrencySummaryRow', () => {
  it('calculates total and formats value', () => {
    renderWithTheme(
      <CurrencySummaryRow subtotal={80} taxes={20} currency="USD" locale="en-US" />,
    );
    const totalInput = screen.getByLabelText('Total') as HTMLInputElement;
    expect(totalInput.value).toBe(
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        100,
      ),
    );
  });

  it('updates format when locale changes', () => {
    const { rerender } = renderWithTheme(
      <CurrencySummaryRow subtotal={80} taxes={20} currency="USD" locale="es-CO" />,
    );
    let totalInput = screen.getByLabelText('Total') as HTMLInputElement;
    expect(totalInput.value).toBe(
      new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD' }).format(
        100,
      ),
    );
    rerender(
      <ThemeProvider>
        <CurrencySummaryRow subtotal={80} taxes={20} currency="USD" locale="en-US" />
      </ThemeProvider>,
    );
    totalInput = screen.getByLabelText('Total') as HTMLInputElement;
    expect(totalInput.value).toBe(
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        100,
      ),
    );
  });

  it('shows badge only when total is negative', () => {
    const { rerender } = renderWithTheme(
      <CurrencySummaryRow subtotal={-50} taxes={-5} />,
    );
    expect(screen.getByText('Nota de crédito')).toBeInTheDocument();
    rerender(
      <ThemeProvider>
        <CurrencySummaryRow subtotal={50} taxes={5} />
      </ThemeProvider>,
    );
    expect(screen.queryByText('Nota de crédito')).toBeNull();
  });

  it('renders skeletons when loading', () => {
    renderWithTheme(<CurrencySummaryRow subtotal={0} taxes={0} loading />);
    expect(screen.getByTestId('subtotal-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('taxes-skeleton')).toBeInTheDocument();
    expect(screen.getByTestId('total-skeleton')).toBeInTheDocument();
  });
});
