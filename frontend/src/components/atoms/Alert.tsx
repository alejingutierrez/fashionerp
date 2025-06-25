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
  /**
   * Controla el nivel de sombra (elevación) del componente.
   * Acepta un número de 0 a 24. Si no se define, se usan las sombras por defecto de la variante.
   * `outlined` no tendrá sombra a menos que se especifique `elevation`.
   */
  elevation?: number;
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
  elevation,
  children,
  ...props
}: PropsWithChildren<AlertProps>) {
  const theme = useTheme(); // Hook para acceder al tema
  const [internalOpen, setInternalOpen] = useState(open);
  const animationDuration = 300; // Sincronizar con timeouts de Collapse/Fade/Slide

  useEffect(() => {
    // Si la prop 'open' externa cambia, actualizamos el estado interno para animar.
    setInternalOpen(open);
  }, [open]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    let unmountTimer: NodeJS.Timeout | undefined;
    if (autoHideDuration && onClose && internalOpen) {
      timer = setTimeout(() => {
        setInternalOpen(false); // Iniciar animación de salida
        unmountTimer = setTimeout(() => {
          onClose(new Event('timeout') as unknown as React.SyntheticEvent, 'timeout');
        }, animationDuration);
      }, autoHideDuration);
    }
    return () => {
      if (timer) clearTimeout(timer);
      if (unmountTimer) clearTimeout(unmountTimer);
    };
  }, [autoHideDuration, onClose, internalOpen, animationDuration]);

  const handleInternalClose = (event: React.SyntheticEvent, reason?: string) => {
    if (onClose) {
      setInternalOpen(false); // Iniciar animación de salida
      setTimeout(() => {
        onClose(event, reason);
      }, animationDuration);
    } else {
      // Si no hay onClose, simplemente ocultamos internamente con animación
      setInternalOpen(false);
    }
  };

  const { sx, ...rest } = props;

  const sizeStyles =
    size === 'small' ? { py: 0.5, px: 1.5, fontSize: '0.875rem' } : {};

  const alertStyles = (currentTheme: typeof theme) => {
    const isDarkMode = currentTheme.palette.mode === 'dark';
    const currentSeverity = severity as AlertColor;

    // Obtener colores del tema.
    // La paleta de severidad debería tener `main` y `contrastText`.
    // Para modo oscuro, idealmente tendría `dark` y `contrastTextDark` o similar.
    // Si no, MUI podría usar `main` y calcular el contraste.
    // Aquí asumimos que el tema SÍ PUEDE tener una variante 'dark' para el color de severidad.
    // Si theme.palette[currentSeverity].dark no existe, usará theme.palette[currentSeverity].main
    const baseSeverityColor =
      isDarkMode && (currentTheme.palette[currentSeverity] as any)?.dark
        ? (currentTheme.palette[currentSeverity] as any).dark
        : currentTheme.palette[currentSeverity]?.main || currentTheme.palette.info.main; // Fallback a info.main

    const contrastSeverityColor =
      isDarkMode && (currentTheme.palette[currentSeverity] as any)?.contrastTextDark
        ? (currentTheme.palette[currentSeverity] as any).contrastTextDark
        : currentTheme.palette[currentSeverity]?.contrastText || currentTheme.palette.info.contrastText; // Fallback

    let specificVariantStyles = {};
    let calculatedElevation = elevation; // Usar la prop elevation si está definida

    if (variant === 'filled') {
      if (calculatedElevation === undefined) calculatedElevation = 2; // Default shadow para filled
      specificVariantStyles = {
        backgroundColor: baseSeverityColor,
        color: contrastSeverityColor,
        boxShadow: currentTheme.shadows[calculatedElevation] || 'none',
        '.MuiAlert-icon': {
          color: contrastSeverityColor,
        },
      };
    } else if (variant === 'standard') {
      if (calculatedElevation === undefined) calculatedElevation = 2; // Default shadow para standard
      const standardBgColor = isDarkMode
        ? currentTheme.palette.grey[700]
        : currentTheme.palette.grey[100];

      specificVariantStyles = {
        backgroundColor: standardBgColor,
        color: currentTheme.palette.text.primary,
        borderLeft: `4px solid ${baseSeverityColor}`,
        boxShadow: currentTheme.shadows[calculatedElevation] || 'none',
        '.MuiAlert-icon': {
          // En modo oscuro, el icono necesita un color que contraste con el fondo gris.
          // baseSeverityColor (palette.severity.dark) podría ser oscuro.
          // contrastSeverityColor (palette.severity.contrastTextDark) suele ser claro.
          color: isDarkMode ? contrastSeverityColor : baseSeverityColor,
        },
      };
    } else if (variant === 'outlined') {
      // outlined por defecto no tiene sombra, a menos que elevation se especifique
      if (calculatedElevation === undefined) calculatedElevation = 0;
      specificVariantStyles = {
        backgroundColor: 'transparent',
        color: currentTheme.palette.text.primary,
        borderColor: baseSeverityColor,
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: currentTheme.shadows[calculatedElevation] || 'none', // Aplicar sombra si elevation lo indica
        '.MuiAlert-icon': {
          // Similar a standard, en modo oscuro el icono necesita asegurar contraste.
          color: isDarkMode ? contrastSeverityColor : baseSeverityColor,
        },
      };
    }

    return {
      borderRadius: currentTheme.shape.borderRadius,
      ...specificVariantStyles,
    };
  };

  // Para la animación de salida con Collapse, necesitamos controlar `internalOpen`.
  // La lógica de `handleInternalClose` y `autoHideDuration` ahora establece `internalOpen` a `false`
  // y luego llama al `onClose` del padre después de `animationDuration`.
  // `Collapse` con `unmountOnExit` se encargará de desmontar el contenido después de su propia animación.

  return (
    <Collapse in={internalOpen} timeout={animationDuration} appear={true} mountOnEnter unmountOnExit>
      <Fade appear in={internalOpen} timeout={animationDuration}>
        <Slide appear direction="down" in={internalOpen} timeout={animationDuration}>
          <MuiAlert
            severity={severity}
            variant={variant}
            onClose={onClose ? (event, reason) => handleInternalClose(event, reason) : undefined}
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
