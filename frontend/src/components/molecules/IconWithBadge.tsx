import { Badge, BadgeProps } from '../atoms/Badge';
import { Icon, IconProps } from '../atoms/Icon';

export interface IconWithBadgeProps extends IconProps {
  /** Conteo a mostrar en el badge. */
  count?: number;
  /** Texto base para accesibilidad. */
  label?: string;
  /** Color del badge. */
  badgeColor?: BadgeProps['color'];
  /** Variante del badge. */
  variant?: BadgeProps['variant'];
  /** Mostrar "0" cuando count es cero. */
  showZero?: boolean;
  /** Valor máximo antes de overflow. */
  max?: number;
  /** Posición del badge. */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * Ícono con un badge superpuesto para notificaciones o conteos.
 */
export function IconWithBadge({
  count = 0,
  label,
  badgeColor = 'error',
  variant = 'standard',
  showZero = false,
  max,
  position = 'top-right',
  ...iconProps
}: IconWithBadgeProps) {
  const [vertical, horizontal] = position.split('-') as [
    'top' | 'bottom',
    'left' | 'right',
  ];

  const ariaLabel = label ? (count > 0 ? `${count} ${label}` : label) : undefined;

  return (
    <Badge
      content={variant === 'dot' ? 0 : count}
      color={badgeColor}
      variant={variant}
      showZero={showZero}
      max={max}
      anchorOrigin={{ vertical, horizontal }}
      overlap="circular"
    >
      <Icon aria-label={ariaLabel} {...iconProps} />
    </Badge>
  );
}

export default IconWithBadge;
