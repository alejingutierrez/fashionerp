import { ReactNode } from 'react';
import { Snackbar, Alert, TertiaryButton } from '../atoms';

export interface SnackbarAlertProps {
  /** Controla la visibilidad del snackbar */
  open: boolean;
  /** Texto o nodo a mostrar */
  message: ReactNode;
  /** Severidad que define color e ícono */
  severity?: 'success' | 'info' | 'warning' | 'error';
  /** Si es verdadero, no se cierra automáticamente */
  sticky?: boolean;
  /** Tiempo antes de ocultarse automáticamente (ms) */
  autoHideDuration?: number;
  /** Callback al cerrarse */
  onClose?: () => void;
}

/**
 * Combina `Snackbar` y `Alert` para notificaciones breves en la parte inferior.
 */
export function SnackbarAlert({
  open,
  message,
  severity = 'info',
  sticky = false,
  autoHideDuration = 4000,
  onClose,
}: SnackbarAlertProps) {
  const hide = sticky ? undefined : autoHideDuration;

  const action = (
    <TertiaryButton size="small" onClick={onClose} aria-label="Cerrar">
      Cerrar
    </TertiaryButton>
  );

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={hide}
      message={
        <Alert severity={severity} role="status" action={action} sx={{ width: '100%' }}>
          {message}
        </Alert>
      }
    />
  );
}

export default SnackbarAlert;
