import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import MuiAlertTitle from '@mui/material/AlertTitle';
import { PropsWithChildren, ReactNode } from 'react';

export interface AlertProps extends Omit<MuiAlertProps, 'children'> {
  /** Texto principal de la alerta. Puede usarse en lugar de `children`. */
  message?: ReactNode;
  /** Título opcional mostrado en negrita antes del contenido. */
  title?: ReactNode;
}

/**
 * Mensaje informativo para estados de error, éxito o advertencia.
 */
export function Alert({
  severity = 'info',
  variant = 'standard',
  onClose,
  message,
  title,
  children,
  ...props
}: PropsWithChildren<AlertProps>) {
  return (
    <MuiAlert severity={severity} variant={variant} onClose={onClose} {...props}>
      {title && <MuiAlertTitle>{title}</MuiAlertTitle>}
      {children ?? message}
    </MuiAlert>
  );
}

export default Alert;
