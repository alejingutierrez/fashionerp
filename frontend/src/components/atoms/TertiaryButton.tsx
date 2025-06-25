import {
  Box,
  CircularProgress,
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';

export interface TertiaryButtonProps extends MuiButtonProps {
  /**
   * Muestra un spinner e impide interacción mientras se completa la acción.
   */
  loading?: boolean;
  /**
   * Posición del spinner cuando `loading` es true.
   */
  loadingPosition?: 'start' | 'end' | 'center';
  /**
   * Texto opcional cuando el botón está en carga.
   */
  loadingText?: ReactNode;
}

/**
 * Botón terciario para acciones de bajo énfasis o enlaces estilo botón.
 * Usa la variante `text` y color `primary`.
 */
export function TertiaryButton({
  children,
  onClick,
  disabled = false,
  startIcon,
  endIcon,
  loading = false,
  loadingPosition = 'center',
  loadingText,
  ...props
}: PropsWithChildren<TertiaryButtonProps>) {
  const spinner = <CircularProgress size={20} color="inherit" />;
  const content = loading && loadingText ? loadingText : children;

  return (
    <MuiButton
      variant="text"
      color="primary"
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      startIcon={loading && loadingPosition === 'start' ? spinner : startIcon}
      endIcon={loading && loadingPosition === 'end' ? spinner : endIcon}
      sx={{
        textTransform: 'none',
        '&:hover': {
          textDecoration: 'underline',
          backgroundColor: 'transparent',
        },
      }}
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

export default TertiaryButton;
