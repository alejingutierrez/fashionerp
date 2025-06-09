import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { PropsWithChildren } from 'react';

export type ButtonProps = MuiButtonProps & PropsWithChildren;

/**
 * Reusable button atom based on MUI `Button`.
 */
export function Button({ children, ...props }: ButtonProps) {
  return <MuiButton {...props}>{children}</MuiButton>;
}

export default Button;
