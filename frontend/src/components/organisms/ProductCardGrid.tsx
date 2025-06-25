import { useEffect, useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { keyframes } from '@emotion/react';
import { Chip } from '../atoms';
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

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.9; }
`;

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
        gap: { xs: 2, sm: 2.5, md: 3 },
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        maxWidth: { lg: 1280 },
        mx: 'auto',
      }}
      p={{ xs: 2, sm: 2.5 }}
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
              flexDirection: { xs: 'column', sm: 'row' },
              bgcolor: '#FFFAF0',
              borderRadius: 1,
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: 1,
              transition: 'box-shadow .15s',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(0,0,0,.15)',
              },
              '&:hover .product-img': {
                transform: 'scale(1.02)',
              },
              '&:focus-visible': { boxShadow: '0 4px 12px rgba(0,0,0,.15)' },
              opacity: isOut ? 0.7 : 1,
            }}
            onClick={() => onSelect?.(product!.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSelect?.(product!.id);
              }
            }}
          >
            <Box
              sx={{
                flexBasis: { sm: '60%' },
                position: 'relative',
                width: { xs: '100%', sm: undefined },
                aspectRatio: '9 / 16',
                overflow: 'hidden',
              }}
            >
              {product!.src ? (
                <Box
                  component="img"
                  src={product!.src}
                  alt={product!.name}
                  className="product-img"
                  sx={{
                    position: { xs: 'absolute', sm: 'relative' },
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 120ms ease-out',
                    filter: isOut ? 'grayscale(50%)' : undefined,
                  }}
                />
              ) : (
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ bgcolor: '#eee' }}
                >
                  <ImageIcon sx={{ fontSize: 40, color: '#aaa' }} />
                </Box>
              )}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '10%',
                  bgcolor: '#FFFAF0',
                  maskImage:
                    'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,.8) 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,.8) 100%)',
                  pointerEvents: 'none',
                }}
              />
            </Box>
            <Box
              sx={{
                flexBasis: { sm: '40%' },
                p: 2,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              <Box position="absolute" top={8} right={8}>
                <Chip
                  label={badge.label}
                  color={badge.color}
                  size="small"
                  sx={{
                    fontWeight: 700,
                    fontSize: 12,
                    animation:
                      product!.status === 'promotion'
                        ? `${pulse} 4s infinite`
                        : undefined,
                  }}
                  role="status"
                  aria-live="polite"
                />
              </Box>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ color: '#333', mt: 0.5, overflow: 'hidden' }}
                component="div"
              >
                <Box
                  component="span"
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                  }}
                >
                  {product!.name}
                </Box>
              </Typography>
              <Typography variant="h6" sx={{ color: '#333', fontWeight: 700, mb: 1 }}>
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
        );
      })}
    </Box>
  );
}

export default ProductCardGrid;
