import { Badge } from '../atoms/Badge';
import { Avatar, AvatarProps } from '../atoms';

export interface AvatarStatusProps extends Omit<AvatarProps, 'children'> {
  /** Nombre del usuario para generar iniciales. */
  name: string;
  /** Estado actual representado por el badge. */
  status?: 'online' | 'offline' | 'away' | 'busy';
  /** Posición del indicador de estado. */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const STATUS_COLOR_MAP = {
  online: 'success',
  offline: 'default',
  away: 'warning',
  busy: 'error',
} as const;

const AVATAR_SIZE_MAP = {
  small: 32,
  medium: 40,
  large: 64,
} as const;

/**
 * Muestra un avatar con un badge que refleja el estado del usuario.
 */
export function AvatarStatus({
  name,
  status = 'offline',
  position = 'bottom-right',
  src,
  size = 'medium',
  ...avatarProps
}: AvatarStatusProps) {
  const initials =
    !src && name
      ? name
          .split(/\s+/)
          .map((w) => w[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : undefined;

  const [vertical, horizontal] = position.split('-') as [
    'top' | 'bottom',
    'left' | 'right',
  ];

  const dotSize = Math.round((AVATAR_SIZE_MAP[size] ?? 40) * 0.35);

  return (
    <Badge
      content={0}
      variant="dot"
      overlap="circular"
      color={STATUS_COLOR_MAP[status]}
      anchorOrigin={{ vertical, horizontal }}
      showZero
      slotProps={{ badge: { sx: { height: dotSize, minWidth: dotSize } } }}
    >
      <Avatar alt={name} src={src} size={size} {...avatarProps}>
        {initials}
      </Avatar>
    </Badge>
  );
}

export default AvatarStatus;
