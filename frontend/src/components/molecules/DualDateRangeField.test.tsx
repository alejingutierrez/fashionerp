import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import React from 'react';
import { ThemeProvider } from '../../theme';
import { DualDateRangeField, DualDateRange } from './DualDateRangeField';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

function Wrapper(
  props: Omit<React.ComponentProps<typeof DualDateRangeField>, 'start' | 'end'>,
) {
  const [range, setRange] = React.useState<DualDateRange>({ start: null, end: null });
  return (
    <DualDateRangeField
      start={range.start}
      end={range.end}
      onChange={(r) => {
        setRange(r);
        props.onChange?.(r);
      }}
      {...props}
    />
  );
}

describe('DualDateRangeField', () => {
  it('renders both fields and arrow', () => {
    renderWithTheme(<DualDateRangeField start={null} end={null} onChange={() => {}} />);
    expect(screen.getByLabelText('Inicio')).toBeInTheDocument();
    expect(screen.getByLabelText('Fin')).toBeInTheDocument();
    expect(screen.getByTestId('range-separator')).toBeInTheDocument();
  });

  it('opens end picker after selecting start', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Wrapper onChange={() => {}} />);
    const startInput = screen.getByLabelText('Inicio');
    await user.type(startInput, '01/05/2025');
    fireEvent.blur(startInput);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows error when end is before start', () => {
    renderWithTheme(
      <DualDateRangeField
        start={dayjs('2025-01-10')}
        end={dayjs('2025-01-05')}
        onChange={() => {}}
      />,
    );
    expect(
      screen.getAllByText('La fecha final no puede ser anterior al inicio').length,
    ).toBeGreaterThan(0);
    const icon = screen.getByTestId('range-separator');
    expect(icon).toBeInTheDocument();
  });
});
