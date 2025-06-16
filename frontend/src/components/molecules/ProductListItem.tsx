import { Box, Typography } from '@mui/material';
import { Avatar, AvatarProps, Chip } from '../atoms';

export interface ProductListItemProps extends Omit<AvatarProps, 'children'> {
  /** Nombre del producto */
  name: string;
  /** Precio num\u00E9rico */
  price: number;
  /** Estado del producto */
  status?: 'available' | 'out_of_stock' | 'promotion';
  /** C\u00F3digo de moneda ISO 4217 */
  currency?: string;
  /** Imagen del producto */
  src?: string;
  /** Resalta el fondo cuando est\u00E1 seleccionado */
  selected?: boolean;
  /** Manejador de click opcional */
  onClick?: () => void;
}

const STATUS_LABELS = {
  available: 'Disponible',
  out_of_stock: 'Sin stock',
  promotion: 'En oferta',
} as const;

const STATUS_COLORS = {
  available: 'success',
  out_of_stock: 'error',
  promotion: 'warning',
} as const;

/**
 * Elemento compacto para listados de productos.
 */
export function ProductListItem({
  name,
  price,
  status = 'available',
  currency = 'USD',
  src,
  size = 'medium',
  selected = false,
  onClick,
  ...avatarProps
}: ProductListItemProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);

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
      <Avatar variant="rounded" alt={name} src={src} size={size} {...avatarProps}>
        {initials}
      </Avatar>
      <Box flexGrow={1} minWidth={0}>
        <Typography variant="body1" noWrap>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {formattedPrice}
        </Typography>
      </Box>
      <Chip label={STATUS_LABELS[status]} color={STATUS_COLORS[status]} size="small" />
    </Box>
  );
}

export default ProductListItem;
