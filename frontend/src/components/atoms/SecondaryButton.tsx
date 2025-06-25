import { Box, CircularProgress } from '@mui/material';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';

export interface SecondaryButtonProps extends MuiButtonProps, PropsWithChildren {
  /** Activa un spinner y deshabilita el botón. */
  loading?: boolean;
  /** Posición del spinner. */
  loadingPosition?: 'start' | 'end' | 'center';
  /** Texto a mostrar cuando está cargando. */
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
      startIcon={loading && loadingPosition === 'start' ? spinner : startIcon}
      endIcon={loading && loadingPosition === 'end' ? spinner : endIcon}
      aria-busy={loading || undefined}
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
