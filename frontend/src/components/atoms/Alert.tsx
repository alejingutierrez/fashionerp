import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import MuiAlertTitle from '@mui/material/AlertTitle';
import { PropsWithChildren, ReactNode, useEffect } from 'react';

export interface AlertProps extends Omit<MuiAlertProps, 'children' | 'action'> { // Excluimos 'action' de MuiAlertProps también
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
  /** Elementos de acción para mostrar en la alerta, como botones. */
  actions?: ReactNode;
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
  actions, // Nueva prop
  children,
  ...props
}: PropsWithChildren<AlertProps>) {
  useEffect(() => {
    if (autoHideDuration && onClose) {
      const timer = setTimeout(() => {
        // Asegurarse de que el evento y la razón sean compatibles con lo que onClose podría esperar
        onClose(new Event('timeout') as unknown as React.SyntheticEvent<Element, Event>, 'timeout');
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [autoHideDuration, onClose]);

  const { sx, ...rest } = props;

  const sizeStyles =
    size === 'small'
      ? {
          py: 0.25,
          px: 1,
          fontSize: '0.8125rem',
          '.MuiAlert-icon': {
            fontSize: '1.25rem',
            paddingTop: '7px', // Ajustado para mejor alineación vertical
            alignItems: 'center',
          },
          '.MuiAlert-message': {
            padding: '8px 0', // Consistente con MUI pero permite ajustes
            paddingTop: '7px', // Alineación con el icono
          },
          '.MuiAlert-action': {
            marginRight: '-6px', // Compensa el padding del botón de cierre
            marginLeft: 'auto', // Empuja las acciones a la derecha
            paddingLeft: '12px',
            paddingTop: '3px', // Alineación vertical de la acción
            alignItems: 'center', // Centra items en el contenedor de acción
          },
          // Específico para el botón de cierre cuando es la única acción
          '.MuiButtonBase-root': { // Asumiendo que el botón de cierre es un IconButton (ButtonBase)
             // paddingTop: '2px', // Ajuste fino si es necesario
          }
        }
      : { // Estilos para 'medium' size (más cerca de los defaults de MUI)
          '.MuiAlert-icon': {
            // paddingTop: '7px', // Ya manejado por MUI o styleOverrides globales
            // alignItems: 'center',
          },
          '.MuiAlert-message': {
            padding: '8px 0', // Default de MUI
          },
          '.MuiAlert-action': {
            marginRight: '-8px', // Default de MUI
            marginLeft: 'auto',
            paddingLeft: '16px',
            // alignItems: 'center', // Ya es el default
          }
        };

  const combinedSx = { ...sizeStyles, ...sx };

  return (
    <MuiAlert
      severity={severity}
      variant={variant}
      onClose={onClose}
      icon={hideIcon ? false : undefined}
      action={actions}
      sx={combinedSx}
      {...rest}
    >
      {title && <MuiAlertTitle>{title}</MuiAlertTitle>}
      {children ?? message}
    </MuiAlert>
  );
}

export default Alert;
