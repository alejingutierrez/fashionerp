import MUIBadge, { type BadgeProps as MUIBadgeProps } from '@mui/material/Badge';
import { type ReactNode } from 'react';

export interface BadgeProps
  extends Omit<MUIBadgeProps, 'badgeContent' | 'color' | 'children'> {
  /** Content to display inside the badge */
  content: ReactNode;
  /** Element the badge is anchored to */
  children: ReactNode;
  /** Badge color (defaults to "error") */
  color?: MUIBadgeProps['color'];
}

export const Badge = ({
  content,
  children,
  color = 'error',
  ...props
}: BadgeProps) => (
  <MUIBadge badgeContent={content} color={color} {...props}>
    {children}
  </MUIBadge>
);

export default Badge;
