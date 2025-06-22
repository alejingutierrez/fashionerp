import { useEffect, useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { Avatar, Chip } from '../atoms';
import { NumberStepper } from '../molecules';

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
  /** Callback al cambiar la cantidad */
  onChange?: (id: string, qty: number) => void;
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
  onChange,
  onSelect,
}: ProductCardGridProps) {
  const [qtyMap, setQtyMap] = useState<Record<string, number>>({});

  useEffect(() => {
    setQtyMap(Object.fromEntries(products.map((p) => [p.id, 0])));
  }, [products]);

  return (
    <Box
      display="grid"
      sx={{
        rowGap: 3,
        columnGap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(auto-fill, minmax(240px, 1fr))',
        },
      }}
      p={2}
    >
      {(loading ? Array.from({ length: 6 }) : products).map((p, idx) => {
        const product = loading ? undefined : (p as ProductCard);
        const badge = BADGE_MAP[product?.status ?? 'default'];
        if (loading) {
          return (
            <Box
              key={idx}
              borderRadius={1}
              sx={{ p: 2, bgcolor: '#FFFAF0', minHeight: 140, width: '100%' }}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
                height={96}
                animation="wave"
              />
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
              bgcolor: '#FFFAF0',
              borderRadius: 1,
              p: 2,
              minHeight: 140,
              cursor: 'pointer',
              transition: 'box-shadow .15s',
              '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,.12)' },
              '&:focus-visible': { boxShadow: '0 2px 8px rgba(0,0,0,.12)' },
              opacity: isOut ? 0.45 : 1,
              pointerEvents: isOut ? 'none' : 'auto',
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
              <Typography
                variant="body1"
                fontWeight={500}
                sx={{ color: '#2E2E2E' }}
                noWrap
              >
                {product!.name}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2" sx={{ color: '#2E2E2E' }}>
                  {formattedPrice}
                </Typography>
                <NumberStepper
                  value={qtyMap[product!.id] ?? 0}
                  onChange={(val) => {
                    setQtyMap((m) => ({ ...m, [product!.id]: val }));
                    onChange?.(product!.id, val);
                  }}
                  min={0}
                  size="small"
                  disabled={isOut}
                />
              </Box>
            </Box>
            <Box position="absolute" top={8} right={12}>
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
