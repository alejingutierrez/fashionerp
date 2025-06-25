import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DatePicker } from './DatePicker';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('DatePicker', () => {
  it('renders label', () => {
    renderWithTheme(<DatePicker label="Fecha" value={null} onChange={() => {}} />);
    expect(screen.getAllByLabelText('Fecha')[0]).toBeInTheDocument();
  });

  it('renders disabled state', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <DatePicker label="Fecha" disabled value={null} onChange={() => {}} />,
    );
    const input = screen.getAllByLabelText('Fecha')[0];
    await user.click(input);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
