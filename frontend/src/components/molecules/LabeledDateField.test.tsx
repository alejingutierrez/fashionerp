import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { LabeledDateField } from './LabeledDateField';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('LabeledDateField', () => {
  it('associates label and input', () => {
    renderWithTheme(
      <LabeledDateField label="Fecha" value={null} onChange={() => {}} />,
    );
    const input = screen.getByLabelText('Fecha');
    expect(input).toBeInTheDocument();
  });

  it('opens calendar on click', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <LabeledDateField label="Fecha" value={null} onChange={() => {}} />,
    );
    await user.click(screen.getByLabelText('Fecha'));
    expect(screen.getByLabelText('Choose date')).toBeInTheDocument();
  });

  it('renders disabled state', async () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <LabeledDateField label="Fecha" value={null} disabled onChange={handleChange} />,
    );
    await userEvent.click(screen.getByLabelText('Fecha'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
