import { Box, Typography } from '@mui/material';
import { Avatar, AvatarProps, Badge } from '../atoms';
import { Chip, ChipProps } from '../atoms/Chip';

export interface CustomerListItemProps extends Omit<AvatarProps, 'children'> {
  /** Nombre completo del cliente */
  name: string;
  /** Muestra un punto verde o gris seg\u00FAn si est\u00E1 activo */
  status?: 'active' | 'inactive';
  /** Etiqueta que clasifica al cliente (VIP, Nuevo, etc.) */
  typeLabel?: string;
  /** Color de la etiqueta */
  typeColor?: ChipProps['color'];
  /** Informaci\u00F3n secundaria como email o tel\u00E9fono */
  secondaryInfo?: string;
  /** Imagen del cliente */
  src?: string;
  /** Resalta el fondo si est\u00E1 seleccionado */
  selected?: boolean;
  /** Manejador de clic opcional */
  onClick?: () => void;
}

const STATUS_COLOR_MAP = {
  active: 'success',
  inactive: 'default',
} as const;

const AVATAR_SIZE_MAP = {
  small: 32,
  medium: 40,
  large: 64,
} as const;

/**\n * \u00CDtem compacto para listados de clientes.\n */
export function CustomerListItem({
  name,
  status = 'active',
  typeLabel,
  typeColor = 'default',
  secondaryInfo,
  size = 'medium',
  src,
  selected = false,
  onClick,
  ...avatarProps
}: CustomerListItemProps) {
  const initials =
    !src && name
      ? name
          .split(/\s+/)
          .map((w) => w[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : undefined;

  const dotSize = Math.round((AVATAR_SIZE_MAP[size] ?? 40) * 0.35);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      px={1}
      py={0.5}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        bgcolor: selected ? 'action.selected' : undefined,
        '&:hover': onClick ? { bgcolor: 'action.hover' } : undefined,
      }}
    >
      <Badge
        content={0}
        variant="dot"
        overlap="circular"
        color={STATUS_COLOR_MAP[status]}
        showZero
        slotProps={{ badge: { sx: { height: dotSize, minWidth: dotSize } } }}
      >
        <Avatar alt={name} src={src} size={size} {...avatarProps}>
          {initials}
        </Avatar>
      </Badge>
      <Box flexGrow={1} minWidth={0}>
        <Typography
          variant="body1"
          noWrap
          sx={{ color: status === 'inactive' ? 'text.disabled' : undefined }}
        >
          {name}
        </Typography>
        {secondaryInfo && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {secondaryInfo}
          </Typography>
        )}
      </Box>
      {typeLabel && <Chip label={typeLabel} color={typeColor} size="small" />}
    </Box>
  );
}

export default CustomerListItem;
