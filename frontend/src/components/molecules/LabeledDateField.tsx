import { Box, Typography } from '@mui/material';
import { useId, useState } from 'react';
import { DatePicker, DatePickerProps } from '../atoms';

export interface LabeledDateFieldProps extends Omit<DatePickerProps, 'label'> {
  /** Texto de la etiqueta */
  label: string;
}

/**
 * Campo de fecha con etiqueta visible.
 * Combina un `DatePicker` y un `label` asociado para crear
 * un elemento de formulario accesible.
 */
export function LabeledDateField({
  label,
  id,
  value,
  onChange,
  disabled = false,
  onOpen,
  onClose,
  error = false,
  helperText,
  ...props
}: LabeledDateFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [open, setOpen] = useState(false);

  const handleOpen: NonNullable<DatePickerProps['onOpen']> = (e) => {
    setOpen(true);
    onOpen?.(e);
  };

  const handleClose: NonNullable<DatePickerProps['onClose']> = (e) => {
    setOpen(false);
    onClose?.(e);
  };

  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Typography
        component="label"
        htmlFor={inputId}
        sx={{
          mb: 0.5,
          color: error ? 'error.main' : open ? 'primary.main' : undefined,
        }}
      >
        {label}
      </Typography>
      <DatePicker
        slotProps={{ textField: { id: inputId, helperText, error } }}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onOpen={handleOpen}
        onClose={handleClose}
        {...props}
      />
    </Box>
  );
}

export default LabeledDateField;
