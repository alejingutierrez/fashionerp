import { CircularProgress } from '@mui/material';
import { PropsWithChildren } from 'react';
import Button, { ButtonProps } from './Button';

export interface PrimaryButtonProps extends ButtonProps {
  loading?: boolean;
}

/**
 * Botón primario que muestra la acción principal de cada vista.
 */
export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  startIcon,
  endIcon,
  loading = false,
  ...props
}: PropsWithChildren<PrimaryButtonProps>) {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : children}
    </Button>
  );
}

export default PrimaryButton;
