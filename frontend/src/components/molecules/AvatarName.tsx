import { Box, Typography } from '@mui/material';
import { Avatar, AvatarProps } from '../atoms';

export interface AvatarNameProps extends Omit<AvatarProps, 'children'> {
  /** Nombre a mostrar junto al avatar */
  name: string;
  /** Orientación del layout */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Muestra un avatar con el nombre del usuario o cliente.
 */
export function AvatarName({
  name,
  orientation = 'horizontal',
  size = 'medium',
  src,
  ...avatarProps
}: AvatarNameProps) {
  const initials =
    !src && name
      ? name
          .split(/\s+/)
          .map((w) => w[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : undefined;

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={orientation === 'vertical' ? 'column' : 'row'}
      gap={1}
    >
      <Avatar alt={name} src={src} size={size} {...avatarProps}>
        {initials}
      </Avatar>
      <Typography variant="body1">{name}</Typography>
    </Box>
  );
}

export default AvatarName;
