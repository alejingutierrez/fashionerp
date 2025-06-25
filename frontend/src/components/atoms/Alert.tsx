import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import MuiAlertTitle from '@mui/material/AlertTitle';
import { PropsWithChildren, ReactNode, useEffect } from 'react';

export interface AlertProps extends Omit<MuiAlertProps, 'children'> {
  /** Texto principal de la alerta. Puede usarse en lugar de `children`. */
  message?: ReactNode;
  /** Título opcional mostrado en negrita antes del contenido. */
  title?: ReactNode;
  /** Oculta el icono de severidad. */
  hideIcon?: boolean;
  /** Tamaño del componente. */
  size?: 'small' | 'medium';
  /**
   * Tiempo en milisegundos para cerrar automáticamente la alerta.
   * Requiere `onClose`.
   */
  autoHideDuration?: number;
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
  hideIcon = false,
  size = 'medium',
  autoHideDuration,
  children,
  ...props
}: PropsWithChildren<AlertProps>) {
  useEffect(() => {
    if (autoHideDuration && onClose) {
      const timer = setTimeout(() => {
        onClose(new Event('timeout') as unknown as React.SyntheticEvent, 'timeout');
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [autoHideDuration, onClose]);

  const { sx, ...rest } = props;

  const sizeStyles =
    size === 'small' ? { py: 0.5, px: 1.5, fontSize: '0.875rem' } : undefined;

  return (
    <MuiAlert
      severity={severity}
      variant={variant}
      onClose={onClose}
      icon={hideIcon ? false : undefined}
      sx={{ ...sizeStyles, ...sx }}
      {...rest}
    >
      {title && <MuiAlertTitle>{title}</MuiAlertTitle>}
      {children ?? message}
    </MuiAlert>
  );
}

export default Alert;
