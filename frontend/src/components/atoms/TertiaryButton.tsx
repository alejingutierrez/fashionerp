import { Box, CircularProgress } from '@mui/material';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';

export interface TertiaryButtonProps extends MuiButtonProps, PropsWithChildren {
  /** Muestra un spinner y deshabilita el botón. */
  loading?: boolean;
  /** Posición del spinner. */
  loadingPosition?: 'start' | 'end' | 'center';
  /** Texto a mostrar durante la carga. */
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
      startIcon={loading && loadingPosition === 'start' ? spinner : startIcon}
      endIcon={loading && loadingPosition === 'end' ? spinner : endIcon}
      aria-busy={loading || undefined}
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
