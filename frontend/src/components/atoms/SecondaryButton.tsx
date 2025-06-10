import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { PropsWithChildren } from 'react';

export type SecondaryButtonProps = MuiButtonProps & PropsWithChildren;

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
  ...props
}: PropsWithChildren<SecondaryButtonProps>) {
  return (
    <MuiButton
      variant="outlined"
      color="secondary"
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      {...props}
    >
      {children}
    </MuiButton>
  );
}

export default SecondaryButton;
