import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

export type DatePickerProps = MuiDatePickerProps<Dayjs | null>;

/**
 * Selector de fecha basado en MUI `DatePicker` con Day.js.
 */
export function DatePicker({ ...props }: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDatePicker {...props} />
    </LocalizationProvider>
  );
}

export default DatePicker;
