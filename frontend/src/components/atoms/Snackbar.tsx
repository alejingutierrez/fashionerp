import MuiSnackbar, { SnackbarProps as MuiSnackbarProps } from '@mui/material/Snackbar';
import { ReactNode } from 'react';

export interface SnackbarProps
  extends Omit<MuiSnackbarProps, 'message' | 'anchorOrigin' | 'autoHideDuration'> {
  /** Texto a mostrar dentro del snackbar */
  message: ReactNode;
  /** Posición del snackbar en pantalla */
  anchorOrigin?: MuiSnackbarProps['anchorOrigin'];
  /** Tiempo en milisegundos antes de ocultar automáticamente */
  autoHideDuration?: number;
}

/**
 * Mensaje temporal que se muestra en la parte inferior de la pantalla.
 */
export function Snackbar({
  message,
  open,
  onClose,
  autoHideDuration = 3000,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
  action,
  ...props
}: SnackbarProps) {
  return (
    <MuiSnackbar
      open={open}
      message={message}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
      action={action}
      {...props}
    />
  );
}

export default Snackbar;
