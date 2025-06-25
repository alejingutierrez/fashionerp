import Button, { type ButtonProps } from '@mui/material/Button';
import { type ReactNode } from 'react';

export interface SecondaryButtonProps
  extends Omit<ButtonProps, 'variant' | 'color'> {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const SecondaryButton = ({
  children,
  onClick,
  disabled = false,
  startIcon,
  endIcon,
  ...props
}: SecondaryButtonProps) => (
  <Button
    variant="outlined"
    color="secondary"
    onClick={onClick}
    disabled={disabled}
    startIcon={startIcon}
    endIcon={endIcon}
    {...props}
  >
    {children}
  </Button>
);

export default SecondaryButton;
