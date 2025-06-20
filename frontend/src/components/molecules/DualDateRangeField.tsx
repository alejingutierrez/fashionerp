import { Box, Typography } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useState, useEffect } from 'react';
import { Dayjs } from 'dayjs';
import { LabeledDateField } from './LabeledDateField';

export interface DualDateRange {
  /** Fecha inicial del rango */
  start: Dayjs | null;
  /** Fecha final del rango */
  end: Dayjs | null;
}

export interface DualDateRangeFieldProps {
  /** Fecha inicial seleccionada */
  start: Dayjs | null;
  /** Fecha final seleccionada */
  end: Dayjs | null;
  /** Callback ejecutado al cambiar alguna de las fechas */
  onChange: (range: DualDateRange) => void;
  /** Deshabilita todo el componente */
  disabled?: boolean;
  /** Texto de la etiqueta para la fecha inicial */
  startLabel?: string;
  /** Texto de la etiqueta para la fecha final */
  endLabel?: string;
  /** Mensaje de error mostrado cuando fin < inicio */
  errorMessage?: string;
}

/**
 * Selector de rango de fechas para definir vigencias.
 * Abre autom\u00E1ticamente el selector de fin al elegir inicio
 * y muestra error cuando la fecha final es anterior.
 */
export function DualDateRangeField({
  start,
  end,
  onChange,
  disabled = false,
  startLabel = 'Inicio',
  endLabel = 'Fin',
  errorMessage = 'La fecha final no puede ser anterior al inicio',
}: DualDateRangeFieldProps) {
  const [openEnd, setOpenEnd] = useState(false);

  useEffect(() => {
    if (!start) {
      setOpenEnd(false);
    }
  }, [start]);

  const error = Boolean(start && end && end.isBefore(start));

  const handleStartChange = (value: Dayjs | null) => {
    onChange({ start: value, end });
    if (value) {
      setOpenEnd(true);
    }
  };

  const handleEndChange = (value: Dayjs | null) => {
    onChange({ start, end: value });
  };

  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Box display="flex" alignItems="center" gap={1}>
        <LabeledDateField
          label={startLabel}
          value={start}
          onChange={handleStartChange}
          disabled={disabled}
        />
        <SwapHorizIcon
          data-testid="range-separator"
          color={error ? 'error' : 'disabled'}
          fontSize="small"
        />
        <LabeledDateField
          label={endLabel}
          value={end}
          onChange={handleEndChange}
          disabled={disabled}
          minDate={start ?? undefined}
          open={openEnd}
          onOpen={() => setOpenEnd(true)}
          onClose={() => setOpenEnd(false)}
          error={error}
          helperText={error ? errorMessage : undefined}
        />
      </Box>
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}

export default DualDateRangeField;
