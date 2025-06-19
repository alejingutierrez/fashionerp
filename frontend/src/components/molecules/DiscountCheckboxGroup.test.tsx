import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { DiscountCheckboxGroup, DiscountOption } from './DiscountCheckboxGroup';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

const OPTIONS: DiscountOption[] = [
  { id: '2x1', label: '2×1', category: 'Promo' },
  { id: 'season', label: 'Fin de temporada' },
  { id: 'employee', label: 'Precio Empleado' },
];

const CONFLICTS = { employee: ['2x1'] };

describe('DiscountCheckboxGroup', () => {
  it('toggles selection', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <DiscountCheckboxGroup options={OPTIONS} value={[]} onChange={handleChange} />,
    );
    const cb = screen.getByRole('checkbox', { name: /2×1/i });
    await user.click(cb);
    expect(handleChange).toHaveBeenCalledWith(['2x1']);
  });

  it('shows toast and disables conflicting option', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <DiscountCheckboxGroup
        options={OPTIONS}
        value={['2x1']}
        conflicts={CONFLICTS}
        onChange={() => {}}
      />,
    );
    const employee = screen.getByRole('checkbox', { name: /empleado/i });
    await user.click(employee);
    expect(employee).toBeDisabled();
    expect(await screen.findByText(/no se puede combinar/i)).toBeInTheDocument();
  });
});
