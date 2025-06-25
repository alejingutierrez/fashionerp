import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/material/styles';

const SIZE_MAP = {
  small: 32,
  medium: 40,
  large: 64,
} as const;

export interface AvatarProps extends MuiAvatarProps {
  /** Tamaño predefinido del avatar. */
  size?: keyof typeof SIZE_MAP;
  /** Estado del usuario que muestra un indicador de color. */
  status?: 'online' | 'offline' | 'busy' | 'away';
}

/**
 * Muestra la imagen o iniciales de un usuario en forma circular por defecto.
 */
export function Avatar({ size, status, sx, ...props }: AvatarProps) {
  const theme = useTheme();
  const dimension = size ? SIZE_MAP[size] : undefined;
  const sxProp = dimension ? { width: dimension, height: dimension, ...sx } : sx;
  const avatar = <MuiAvatar sx={sxProp} {...props} />;

  if (!status) {
    return avatar;
  }

  const colorMap = {
    online: theme.palette.success.main,
    offline: theme.palette.grey[500],
    busy: theme.palette.error.main,
    away: theme.palette.warning.main,
  } as const;

  return (
    <Badge
      data-testid="avatar-status"
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
      sx={{
        '& .MuiBadge-badge': {
          backgroundColor: colorMap[status],
          color: colorMap[status],
          boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        },
      }}
    >
      {avatar}
    </Badge>
  );
}

export default Avatar;
