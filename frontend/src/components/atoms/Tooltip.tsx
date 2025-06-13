import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';
import { ReactElement } from 'react';

export interface TooltipProps extends Omit<MuiTooltipProps, 'title' | 'children'> {
  /** Texto o elemento a mostrar dentro del tooltip */
  title: MuiTooltipProps['title'];
  /** Elemento objetivo que recibe el tooltip */
  children: ReactElement;
  /** Posición del tooltip respecto al elemento */
  placement?: MuiTooltipProps['placement'];
  /** Muestra una flecha apuntando al elemento */
  arrow?: boolean;
}

/**
 * Tooltip informativo que envuelve a un elemento objetivo.
 */
export function Tooltip({
  title,
  children,
  placement = 'bottom',
  arrow = true,
  ...props
}: TooltipProps) {
  return (
    <MuiTooltip title={title} placement={placement} arrow={arrow} {...props}>
      {children}
    </MuiTooltip>
  );
}

export default Tooltip;
