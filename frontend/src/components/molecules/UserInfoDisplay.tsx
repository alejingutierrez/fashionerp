import { Box, Typography, Skeleton } from '@mui/material';
import { Avatar, AvatarProps, Chip } from '../atoms';

export interface UserInfoDisplayProps extends Omit<AvatarProps, 'children'> {
  /** Nombre completo del usuario */
  name: string;
  /** Dato secundario a mostrar (rol, email, etc.) */
  secondaryInfo?: string;
  /** Orientación del layout */
  orientation?: 'horizontal' | 'vertical';
  /** Texto opcional a mostrar dentro de un chip */
  chipLabel?: string;
  /** Muestra esqueletos de carga en lugar de la info real */
  loading?: boolean;
}

const SIZE_MAP = {
  small: 32,
  medium: 40,
  large: 64,
} as const;

/**
 * Muestra un avatar acompañado del nombre y un dato secundario.
 * Puede incluir un `Chip` destacado y un estado de carga.
 */
export function UserInfoDisplay({
  name,
  secondaryInfo,
  orientation = 'horizontal',
  chipLabel,
  loading = false,
  size = 'medium',
  src,
  ...avatarProps
}: UserInfoDisplayProps) {
  const initials =
    !src && name
      ? name
          .split(/\s+/)
          .map((w) => w[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : undefined;

  const dimension = SIZE_MAP[size] ?? 40;

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={orientation === 'vertical' ? 'column' : 'row'}
      gap={1}
    >
      {loading ? (
        <Skeleton
          variant="circular"
          width={dimension}
          height={dimension}
          data-testid="avatar-skeleton"
        />
      ) : (
        <Avatar alt={name} src={src} size={size} {...avatarProps}>
          {initials}
        </Avatar>
      )}
      <Box
        display="flex"
        flexDirection="column"
        textAlign={orientation === 'vertical' ? 'center' : 'left'}
        alignItems={orientation === 'vertical' ? 'center' : 'flex-start'}
      >
        {loading ? (
          <Skeleton width={80} data-testid="name-skeleton" />
        ) : (
          <Typography variant="body1" noWrap>
            {name}
          </Typography>
        )}
        {!loading && secondaryInfo && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {secondaryInfo}
          </Typography>
        )}
        {!loading && chipLabel && <Chip label={chipLabel} size="small" />}
      </Box>
    </Box>
  );
}

export default UserInfoDisplay;
