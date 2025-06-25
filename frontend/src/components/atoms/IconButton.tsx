import MuiIconButton, {
  IconButtonProps as MuiIconButtonProps,
} from '@mui/material/IconButton';
import { ReactElement } from 'react';

export interface IconButtonProps extends MuiIconButtonProps {
  /** Icono a mostrar dentro del botón */
  icon?: ReactElement;
}

/**
 * Botón de ícono que delega en MUI `IconButton`.
 */
export function IconButton({ icon, children, ...props }: IconButtonProps) {
  return <MuiIconButton {...props}>{icon || children}</MuiIconButton>;
}

export default IconButton;
