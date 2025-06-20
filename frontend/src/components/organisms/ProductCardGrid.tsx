import AddIcon from '@mui/icons-material/Add';
import { Box, Typography, Skeleton } from '@mui/material';
import { Avatar, IconButton, Chip, Badge } from '../atoms';

export interface ProductCard {
  id: string;
  name: string;
  price: number;
  status?: 'available' | 'out_of_stock' | 'promotion';
  currency?: string;
  src?: string;
}

export interface ProductCardGridProps {
  /** Lista de productos a mostrar */
  products: ProductCard[];
  /** Indica si se debe mostrar el estado de carga */
  loading?: boolean;
  /** Callback al agregar al carrito */
  onAdd?: (id: string) => void;
  /** Callback al seleccionar un producto */
  onSelect?: (id: string) => void;
}

const BADGE_MAP = {
  available: { label: 'Disponible', color: 'success' },
  out_of_stock: { label: 'Sin stock', color: 'error' },
  promotion: { label: 'En promoción', color: 'warning' },
  default: { label: undefined, color: 'default' },
} as const;

/**
 * Mosaico responsive de tarjetas de producto con estado y acción de agregado.
 */
export function ProductCardGrid({
  products,
  loading = false,
  onAdd,
  onSelect,
}: ProductCardGridProps) {
  return (
    <Box
      display="grid"
      gap={2}
      p={2}
      sx={{
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(auto-fill, minmax(220px, 1fr))',
        },
      }}
    >
      {(loading ? Array.from({ length: 6 }) : products).map((p, idx) => {
        const product = loading ? undefined : (p as ProductCard);
        const badge = BADGE_MAP[product?.status ?? 'default'];
        if (loading) {
          return (
            <Box key={idx} borderRadius={1} sx={{ p: 2, bgcolor: '#FFF8EE' }}>
              <Skeleton variant="rectangular" width={56} height={56} />
              <Skeleton width="60%" sx={{ mt: 1 }} />
              <Skeleton width="40%" sx={{ mt: 0.5 }} />
            </Box>
          );
        }

        const formattedPrice = new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: product?.currency ?? 'ARS',
        }).format(product!.price);
        const isOut = product?.status === 'out_of_stock';

        return (
          <Box
            key={product!.id}
            component="div"
            role="button"
            tabIndex={0}
            position="relative"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              bgcolor: '#FFF8EE',
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': { boxShadow: 1 },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
              },
              opacity: isOut ? 0.4 : 1,
            }}
            onClick={() => onSelect?.(product!.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSelect?.(product!.id);
              }
            }}
          >
            <Avatar
              variant="square"
              alt={product!.name}
              src={product!.src}
              sx={{ width: { xs: 56, sm: 40 }, height: { xs: 56, sm: 40 } }}
            />
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Badge
                  variant="dot"
                  content={0}
                  color={badge.color}
                  showZero
                  slotProps={{ badge: { sx: { height: 8, minWidth: 8 } } }}
                >
                  <Box sx={{ width: 0, height: 0 }} />
                </Badge>
                <Typography variant="body1" noWrap>
                  {product!.name}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" sx={{ color: '#2F2F2F' }}>
                  {formattedPrice}
                </Typography>
                <IconButton
                  size="small"
                  aria-label={`Agregar ${product!.name} al carrito`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd?.(product!.id);
                  }}
                  disabled={isOut}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box position="absolute" top={12} right={12}>
              <Chip
                label={badge.label}
                color={badge.color}
                size="small"
                role="status"
                aria-live="polite"
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default ProductCardGrid;
