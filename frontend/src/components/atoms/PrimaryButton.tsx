import { Box, CircularProgress } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';
import Button, { ButtonProps } from './Button';

export interface PrimaryButtonProps extends ButtonProps {
  /**
   * Activa el modo de carga: muestra un spinner y deshabilita la interacción.
   */
  loading?: boolean;
  /**
   * Posición del spinner cuando `loading` es true.
   * - `center` reemplaza el contenido.
   * - `start` o `end` sustituyen a los iconos respectivos.
   */
  loadingPosition?: 'start' | 'end' | 'center';
  /**
   * Texto opcional que se muestra cuando el botón está en carga.
   * Si no se define, se mantiene el `children` original.
   */
  loadingText?: ReactNode;
}

/**
 * Botón primario que representa la acción principal de cada vista.
 */
export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  startIcon,
  endIcon,
  loading = false,
  loadingPosition = 'center',
  loadingText,
  ...props
}: PropsWithChildren<PrimaryButtonProps>) {
  const spinner = <CircularProgress size={20} color="inherit" />;
  // Si hay texto de carga y el botón está cargando, ese texto sustituye al children
  const content = loading && loadingText ? loadingText : children;

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={
        loading && loadingPosition === 'start' ? spinner : startIcon
      }
      endIcon={loading && loadingPosition === 'end' ? spinner : endIcon}
      disabled={disabled || loading}
      onClick={onClick}
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
    </Button>
  );
}

export default PrimaryButton;
