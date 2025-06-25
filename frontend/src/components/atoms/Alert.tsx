import MuiAlert, { AlertProps as MuiAlertProps, AlertColor } from '@mui/material/Alert';
import MuiAlertTitle from '@mui/material/AlertTitle';
import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Collapse from '@mui/material/Collapse';
import { useTheme } from '@mui/material/styles'; // Importar useTheme

export interface AlertProps extends Omit<MuiAlertProps, 'children'> {
  /** Controla la visibilidad del componente para animaciones. */
  open?: boolean;
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
  /** Permite añadir acciones personalizadas (ej. botones) a la alerta. */
  action?: ReactNode;
}

/**
 * Mensaje informativo para estados de error, éxito o advertencia.
 * Mejorado visualmente con soporte para modo claro/oscuro y animaciones.
 */
export function Alert({
  open = true, // Por defecto visible si no se controla externamente
  severity = 'info',
  variant = 'standard',
  onClose,
  message,
  title,
  hideIcon = false,
  size = 'medium',
  autoHideDuration,
  action,
  children,
  ...props
}: PropsWithChildren<AlertProps>) {
  const theme = useTheme(); // Hook para acceder al tema
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  useEffect(() => {
    if (autoHideDuration && onClose && internalOpen) {
      const timer = setTimeout(() => {
        // setInternalOpen(false); // Inicia animación de salida
        // setTimeout(() => onClose(new Event('timeout') as unknown as React.SyntheticEvent, 'timeout'), 300); // Espera a que termine la animación
        onClose(new Event('timeout') as unknown as React.SyntheticEvent, 'timeout');
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [autoHideDuration, onClose, internalOpen]);

  const handleClose = (event: React.SyntheticEvent, reason?: string) => {
    if (onClose) {
      // setInternalOpen(false);
      // setTimeout(() => onClose(event, reason), 300); // Espera animación
      onClose(event, reason);
    } else {
      // setInternalOpen(false);
    }
  };


  const { sx, ...rest } = props;

  const sizeStyles =
    size === 'small' ? { py: 0.5, px: 1.5, fontSize: '0.875rem' } : {};

  // Colores corporativos (simplificado, el tema debe tener esto en palette.severity)
  const corporateColors = {
    info: { light: '#003049', dark: '#1c4966', contrastText: { light: '#fdf0d5', dark: '#e0f7fa' } },
    success: { light: '#2a9d8f', dark: '#2E7D32', contrastText: { light: '#fdf0d5', dark: '#E8F5E9' } },
    warning: { light: '#e9c46a', dark: '#FFA000', contrastText: { light: '#003049', dark: '#000000' } },
    error: { light: '#780000', dark: '#D32F2F', contrastText: { light: '#fdf0d5', dark: '#FFEBEE' } },
  };

  const currentSeverityColors = corporateColors[severity as AlertColor] || corporateColors.info;

  const alertStyles = (currentTheme: typeof theme) => {
    const isDarkMode = currentTheme.palette.mode === 'dark';
    // Color principal de la severidad para el modo actual (usado para bordes, o fondo en filled)
    const baseSeverityColorForMode = isDarkMode ? currentSeverityColors.dark : currentSeverityColors.light;
    // Color del texto/icono que contrasta con el fondo de la severidad (usado en filled, o para iconos en standard/outlined dark)
    const contrastSeverityColorForMode = isDarkMode ? currentSeverityColors.contrastText.dark : currentSeverityColors.contrastText.light;

    let specificVariantStyles = {};

    if (variant === 'filled') {
      specificVariantStyles = {
        backgroundColor: baseSeverityColorForMode,
        color: contrastSeverityColorForMode,
        boxShadow: currentTheme.shadows[2],
        '.MuiAlert-icon': {
          color: contrastSeverityColorForMode, // Icono usa el mismo color que el texto
        },
      };
    } else if (variant === 'standard') {
      specificVariantStyles = {
        backgroundColor: isDarkMode ? currentTheme.palette.grey[700] : currentTheme.palette.grey[100],
        color: currentTheme.palette.text.primary,
        borderLeft: `4px solid ${baseSeverityColorForMode}`,
        boxShadow: currentTheme.shadows[2],
        '.MuiAlert-icon': {
          // En modo oscuro, el icono necesita un color más claro que baseSeverityColorForMode si este es oscuro
          color: isDarkMode ? contrastSeverityColorForMode : baseSeverityColorForMode,
        },
      };
    } else if (variant === 'outlined') {
      specificVariantStyles = {
        backgroundColor: 'transparent',
        color: currentTheme.palette.text.primary,
        borderColor: baseSeverityColorForMode, // El borde usa el color base de severidad
        '.MuiAlert-icon': {
          // Similar a standard, en modo oscuro, el icono necesita un color más claro
          color: isDarkMode ? contrastSeverityColorForMode : baseSeverityColorForMode,
        },
      };
    }

    return {
      borderRadius: currentTheme.shape.borderRadius,
      ...specificVariantStyles,
    };
  };

  // Para la animación de salida con Collapse, necesitamos controlar `internalOpen`
  // Sin embargo, el `onClose` de MuiAlert desmonta el componente si se le pasa directamente.
  // Para animar la salida, el componente Snackbar de MUI es más adecuado, ya que gestiona las transiciones.
  // Aquí, la animación de entrada es más directa. La de salida con `Collapse` se activaría si `open` cambia a `false`.

  return (
    <Collapse in={internalOpen} timeout={300} appear={true} mountOnEnter unmountOnExit>
      <Fade appear in={internalOpen} timeout={300}>
        <Slide appear direction="down" in={internalOpen} timeout={300}>
          <MuiAlert
            severity={severity}
            variant={variant}
            onClose={onClose ? (event) => handleClose(event) : undefined} // Usar handleClose para posible animación futura
            icon={hideIcon ? false : undefined}
            action={action}
            sx={{
              ...alertStyles(theme), // Aplicar estilos dinámicos
              ...sizeStyles,       // Aplicar estilos de tamaño
              ...sx,               // Permitir overrides del usuario
            }}
            {...rest}
          >
            {title && <MuiAlertTitle>{title}</MuiAlertTitle>}
            {children ?? message}
          </MuiAlert>
        </Slide>
      </Fade>
    </Collapse>
  );
}

export default Alert;
