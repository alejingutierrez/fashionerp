import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';

const SIZE_MAP = {
  small: 32,
  medium: 40,
  large: 64,
} as const;

export interface AvatarProps extends MuiAvatarProps {
  /** Tamaño predefinido del avatar. */
  size?: keyof typeof SIZE_MAP;
}

/**
 * Muestra la imagen o iniciales de un usuario en forma circular por defecto.
 */
export function Avatar({ size, sx, ...props }: AvatarProps) {
  const dimension = size ? SIZE_MAP[size] : undefined;
  const sxProp = dimension ? { width: dimension, height: dimension, ...sx } : sx;

  return <MuiAvatar sx={sxProp} {...props} />;
}

export default Avatar;
