import MuiBadge, { BadgeProps as MuiBadgeProps } from '@mui/material/Badge';
import { ReactNode } from 'react';

export interface BadgeProps extends Omit<MuiBadgeProps, 'badgeContent' | 'color'> {
  /** Contenido a mostrar dentro de la banda. */
  content: ReactNode;
  /** Color de la badge. */
  color?: MuiBadgeProps['color'];
}

/**
 * Pequeño indicador superpuesto para notificaciones o conteos.
 */
export function Badge({ content, children, color = 'error', ...props }: BadgeProps) {
  return (
    <MuiBadge badgeContent={content} color={color} {...props}>
      {children}
    </MuiBadge>
  );
}

export default Badge;
