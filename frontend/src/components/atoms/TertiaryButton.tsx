import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { PropsWithChildren } from 'react';

export type TertiaryButtonProps = MuiButtonProps & PropsWithChildren;

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
  ...props
}: PropsWithChildren<TertiaryButtonProps>) {
  return (
    <MuiButton
      variant="text"
      color="primary"
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        textTransform: 'none',
        '&:hover': {
          textDecoration: 'underline',
          backgroundColor: 'transparent',
        },
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}

export default TertiaryButton;
