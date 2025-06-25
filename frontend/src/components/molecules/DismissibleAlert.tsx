import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertProps, IconButton } from '../atoms';
import { useState } from 'react';

export interface DismissibleAlertProps extends Omit<AlertProps, 'onClose'> {
  /** Manejador opcional al cerrar la alerta */
  onClose?: () => void;
  /** Controla si la alerta se muestra inicialmente */
  defaultOpen?: boolean;
}

/**
 * Combina `Alert` con un botón de cierre permitiendo descartar el mensaje.
 */
export function DismissibleAlert({
  defaultOpen = true,
  onClose,
  children,
  ...props
}: DismissibleAlertProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  if (!open) {
    return null;
  }

  return (
    <Alert
      {...props}
      action={
        <IconButton
          aria-label="Cerrar alerta"
          size="small"
          icon={<CloseIcon fontSize="small" />}
          onClick={handleClose}
          sx={{ borderRadius: '50%' }}
        />
      }
    >
      {children}
    </Alert>
  );
}

export default DismissibleAlert;
