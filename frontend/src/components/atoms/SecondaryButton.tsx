import {
  Box,
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';

export interface SecondaryButtonProps extends MuiButtonProps {
  /**
   * Muestra un spinner e impide interacción mientras se completa la acción.
   */
  loading?: boolean;
  /**
   * Posición del spinner cuando `loading` es true.
   */
  loadingPosition?: 'start' | 'end' | 'center';
  /**
   * Texto opcional cuando el botón está cargando. Si se omite, se mantiene el contenido original.
   */
  loadingText?: ReactNode;
}

/**
 * Botón secundario para acciones alternativas.
 * Reutiliza `Button` de MUI con variante `outlined` y color `secondary`.
 */
export function SecondaryButton({
  children,
  onClick,
  disabled = false,
  startIcon,
  endIcon,
  loading = false,
  loadingPosition = 'center',
  loadingText,
  ...props
}: PropsWithChildren<SecondaryButtonProps>) {
  const spinner = <CircularProgress size={20} color="inherit" />;
  const content = loading && loadingText ? loadingText : children;

  return (
    <MuiButton
      variant="outlined"
      color="secondary"
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      startIcon={loading && loadingPosition === 'start' ? spinner : startIcon}
      endIcon={loading && loadingPosition === 'end' ? spinner : endIcon}
      {...props}
    >
      {loading && loadingPosition === 'center' ? (
        <>
          {spinner}
          {loadingText && (
            <Box component="span" sx={{ ml: 1 }}>
              {loadingText}
            </Box>
          )}
        </>
      ) : (
        content
      )}
    </MuiButton>
  );
}

export default SecondaryButton;
