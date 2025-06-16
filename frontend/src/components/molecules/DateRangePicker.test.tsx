import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import React from 'react';
import { ThemeProvider } from '../../theme';
import { DateRangePicker, DateRange } from './DateRangePicker';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

function Wrapper(
  props: Omit<React.ComponentProps<typeof DateRangePicker>, 'start' | 'end'>,
) {
  const [range, setRange] = React.useState<DateRange>({ start: null, end: null });
  return (
    <DateRangePicker
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

describe('DateRangePicker', () => {
  it('renders both date pickers', () => {
    renderWithTheme(<DateRangePicker start={null} end={null} onChange={() => {}} />);
    expect(screen.getAllByLabelText('Desde')[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText('Hasta')[0]).toBeInTheDocument();
  });

  it('emits full range on selecting start then end', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(<Wrapper onChange={handleChange} />);
    const startRoot = screen.getAllByLabelText('Desde')[0];
    await user.type(startRoot, '01/05/2024');
    fireEvent.blur(startRoot);
    const endRoot = screen.getAllByLabelText('Hasta')[0];
    await user.type(endRoot, '01/10/2024');
    fireEvent.blur(endRoot);
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error when start is after end', () => {
    const start = dayjs('2025-01-10');
    const end = dayjs('2025-01-05');
    renderWithTheme(<DateRangePicker start={start} end={end} onChange={() => {}} />);
    const startInput = screen.getAllByLabelText('Desde')[0];
    const endInput = screen.getAllByLabelText('Hasta')[0];
    expect(startInput).toHaveAttribute('aria-invalid', 'true');
    expect(endInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('is disabled when prop disabled', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <DateRangePicker start={null} end={null} onChange={() => {}} disabled />,
    );
    const startInput = screen.getAllByLabelText('Desde')[0];
    await user.click(startInput);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
