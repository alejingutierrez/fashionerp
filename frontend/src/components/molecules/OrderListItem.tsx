import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Chip, Icon } from '../atoms';
import type { IconName } from '../atoms/Icon';

export interface OrderListItemProps {
  /** N\u00FAmero identificador del pedido */
  orderNumber: string | number;
  /** Fecha del pedido */
  date: string | Date;
  /** Nombre del cliente a mostrar */
  customer?: string;
  /** Total del pedido */
  total?: number;
  /** C\u00F3digo de moneda ISO 4217 para el total */
  currency?: string;
  /** Estado actual del pedido */
  status?: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  /** Variante de presentaci\u00F3n */
  variant?: 'full' | 'compact';
  /** Resaltar por ser reciente */
  recent?: boolean;
  /** Icono opcional */
  iconName?: IconName;
  /** Marcar fondo cuando est\u00E1 seleccionado */
  selected?: boolean;
  /** Manejador de clic */
  onClick?: () => void;
}

const STATUS_LABELS = {
  pending: 'Pendiente',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
} as const;

const STATUS_COLORS = {
  pending: 'warning',
  shipped: 'info',
  delivered: 'success',
  cancelled: 'error',
} as const;

/**
 * \u00CDtem compacto para listados de pedidos.
 */
export function OrderListItem({
  orderNumber,
  date,
  customer,
  total,
  currency = 'USD',
  status = 'pending',
  variant = 'full',
  recent = false,
  iconName,
  selected = false,
  onClick,
}: OrderListItemProps) {
  const formattedDate = dayjs(date).format('DD/MM/YYYY');
  const formattedTotal =
    total !== undefined
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(total)
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
        bgcolor: selected || recent ? 'action.selected' : undefined,
        '&:hover': onClick ? { bgcolor: 'action.hover' } : undefined,
      }}
    >
      {iconName && <Icon name={iconName} size="small" />}
      <Typography variant="body1" noWrap>{`#${orderNumber}`}</Typography>
      {variant === 'full' && (
        <>
          <Typography variant="body2" color="text.secondary" noWrap>
            {formattedDate}
          </Typography>
          {customer && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {customer}
            </Typography>
          )}
          {formattedTotal && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {formattedTotal}
            </Typography>
          )}
        </>
      )}
      <Box flexGrow={1} />
      <Chip label={STATUS_LABELS[status]} color={STATUS_COLORS[status]} size="small" />
    </Box>
  );
}

export default OrderListItem;
