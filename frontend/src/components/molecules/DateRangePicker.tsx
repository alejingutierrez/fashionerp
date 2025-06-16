import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';
import { DatePicker, DatePickerProps } from '../atoms';

export interface DateRange {
  /** Fecha inicial del rango */
  start: Dayjs | null;
  /** Fecha final del rango */
  end: Dayjs | null;
}

export interface DateRangePickerProps {
  /** Fecha inicial seleccionada */
  start: Dayjs | null;
  /** Fecha final seleccionada */
  end: Dayjs | null;
  /** Callback ejecutado al cambiar alguna de las fechas */
  onChange: (range: DateRange) => void;
  /** Deshabilita todo el componente */
  disabled?: boolean;
  /** Texto de la etiqueta para la fecha inicial */
  startLabel?: string;
  /** Texto de la etiqueta para la fecha final */
  endLabel?: string;
  /** Elemento que separa visualmente ambas fechas */
  separator?: ReactNode;
}

/**
 * Selector de rango de fechas basado en dos `DatePicker`.
 * Muestra error cuando la fecha inicial es posterior a la final.
 */
export function DateRangePicker({
  start,
  end,
  onChange,
  disabled = false,
  startLabel = 'Desde',
  endLabel = 'Hasta',
  separator = '–',
}: DateRangePickerProps) {
  const rangeError = Boolean(start && end && start.isAfter(end));

  const handleStartChange: NonNullable<DatePickerProps['onChange']> = (value) => {
    onChange({ start: value, end });
  };

  const handleEndChange: NonNullable<DatePickerProps['onChange']> = (value) => {
    onChange({ start, end: value });
  };

  const separatorNode =
    typeof separator === 'string' ? (
      <Typography sx={{ mx: 1 }}>{separator}</Typography>
    ) : (
      separator
    );

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <DatePicker
        label={startLabel}
        value={start}
        onChange={handleStartChange}
        disabled={disabled}
        slotProps={{ textField: { error: rangeError } }}
      />
      {separatorNode}
      <DatePicker
        label={endLabel}
        value={end}
        onChange={handleEndChange}
        disabled={disabled}
        slotProps={{ textField: { error: rangeError } }}
      />
    </Box>
  );
}

export default DateRangePicker;
