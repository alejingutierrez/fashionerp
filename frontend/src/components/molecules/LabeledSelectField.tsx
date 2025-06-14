import { Box, Typography } from '@mui/material';
import { useId, useState } from 'react';
import { Select, SelectProps } from '../atoms';

export interface LabeledSelectFieldProps extends Omit<SelectProps, 'label'> {
  /** Texto de la etiqueta */
  label: string;
}

/**
 * Campo de selección con etiqueta visible.
 * Combina un `Select` y un `label` externo para formar
 * un elemento de formulario coherente.
 */
export function LabeledSelectField({
  label,
  id,
  options,
  value,
  onChange,
  size = 'medium',
  error = false,
  helperText,
  disabled = false,
  onOpen,
  onClose,
  ...props
}: LabeledSelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const labelId = useId();
  const [open, setOpen] = useState(false);

  const handleOpen: NonNullable<SelectProps['onOpen']> = (e) => {
    setOpen(true);
    onOpen?.(e);
  };

  const handleClose: NonNullable<SelectProps['onClose']> = (e) => {
    setOpen(false);
    onClose?.(e);
  };

  return (
    <Box display="flex" flexDirection="column" gap={0.5}>
      <Typography
        id={labelId}
        component="label"
        sx={{
          mb: 0.5,
          color: error ? 'error.main' : open ? 'primary.main' : undefined,
        }}
      >
        {label}
      </Typography>
      <Select
        id={selectId}
        labelId={labelId}
        options={options}
        value={value}
        onChange={onChange}
        size={size}
        error={error}
        helperText={helperText}
        disabled={disabled}
        onOpen={handleOpen}
        onClose={handleClose}
        {...props}
      />
    </Box>
  );
}

export default LabeledSelectField;
