import { Box } from '@mui/material';
import { ProductListItem, PriceStepper, StatusBadgeDisplay } from '../molecules';

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
  /** Callback cuando se modifica el precio */
  onPriceChange?: (id: string, price: number) => void;
  /** Callback al seleccionar un producto */
  onSelect?: (id: string) => void;
}

const BADGE_MAP = {
  available: { label: undefined, status: 'success' },
  out_of_stock: { label: 'Sin stock', status: 'error' },
  promotion: { label: 'En promo', status: 'warning' },
} as const;

/**
 * Mosaico responsive de tarjetas de producto con ajuste rápido de precio.
 */
export function ProductCardGrid({
  products,
  onPriceChange,
  onSelect,
}: ProductCardGridProps) {
  return (
    <Box
      display="grid"
      gap={1}
      sx={{
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
          xl: 'repeat(6, 1fr)',
        },
      }}
    >
      {products.map((p) => {
        const badge = BADGE_MAP[p.status ?? 'available'];
        return (
          <Box
            key={p.id}
            component="button"
            type="button"
            onClick={() => onSelect?.(p.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSelect?.(p.id);
              }
            }}
            tabIndex={0}
            position="relative"
            textAlign="left"
            sx={{
              cursor: 'pointer',
              p: 1,
              borderRadius: 1,
              bgcolor:
                p.status === 'out_of_stock'
                  ? 'action.disabledBackground'
                  : 'background.paper',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Box position="absolute" top={4} right={4}>
              <StatusBadgeDisplay
                label={badge.label}
                status={badge.status}
                size="small"
              />
            </Box>
            <ProductListItem
              name={p.name}
              price={p.price}
              status={p.status}
              currency={p.currency}
              src={p.src}
            />
            <Box position="absolute" bottom={4} left={4}>
              <PriceStepper
                value={p.price}
                onChange={(val) => onPriceChange?.(p.id, val)}
                size="small"
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}

export default ProductCardGrid;
