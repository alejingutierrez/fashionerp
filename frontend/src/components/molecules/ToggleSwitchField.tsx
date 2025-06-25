import { Box, Typography } from '@mui/material';
import { useId, useState } from 'react';
import { Switch, SwitchProps } from '../atoms';

export interface ToggleSwitchFieldProps extends SwitchProps {
  /** Texto de la etiqueta */
  label: string;
  /** Posición de la etiqueta respecto al switch */
  labelPlacement?: 'start' | 'end';
}

/**
 * Interruptor con etiqueta visible asociado al control.
 */
export function ToggleSwitchField({
  label,
  id,
  checked = false,
  onChange,
  disabled = false,
  onFocus,
  onBlur,
  labelPlacement = 'end',
  ...props
}: ToggleSwitchFieldProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  const [focused, setFocused] = useState(false);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setFocused(false);
    onBlur?.(e);
  };

  const labelNode = (
    <Typography
      component="label"
      htmlFor={switchId}
      sx={{
        userSelect: 'none',
        color: disabled ? 'text.disabled' : focused ? 'primary.main' : undefined,
        mb: 0,
      }}
    >
      {label}
    </Typography>
  );

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {labelPlacement === 'start' && labelNode}
      <Switch
        id={switchId}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {labelPlacement === 'end' && labelNode}
    </Box>
  );
}

export default ToggleSwitchField;
