import { Box, Typography } from '@mui/material';
import { useId } from 'react';
import { NumberInput, Chip, Icon } from '../atoms';
import type { IconName } from '../atoms/Icon';

export interface InventoryStatusItemProps {
  /** Nombre del producto */
  name: string;
  /** Cantidad disponible en inventario */
  stock: number;
  /** Umbral para considerar stock bajo */
  lowStockThreshold?: number;
  /** Mostrar campo editable en lugar de texto */
  editable?: boolean;
  /** Icono decorativo opcional */
  iconName?: IconName;
  /** Manejador cuando cambia la cantidad (modo editable) */
  onStockChange?: (value: number) => void;
}

const STATUS_LABELS = {
  in_stock: 'En stock',
  low_stock: 'Stock bajo',
  out_of_stock: 'Sin stock',
} as const;

const STATUS_COLORS = {
  in_stock: 'success',
  low_stock: 'warning',
  out_of_stock: 'error',
} as const;

function getStatus(stock: number, threshold: number) {
  if (stock <= 0) return 'out_of_stock';
  if (stock < threshold) return 'low_stock';
  return 'in_stock';
}

/**
 * Muestra la cantidad de inventario y su estado con un chip de colores.
 */
export function InventoryStatusItem({
  name,
  stock,
  lowStockThreshold = 5,
  editable = false,
  iconName,
  onStockChange,
}: InventoryStatusItemProps) {
  const status = getStatus(stock, lowStockThreshold);
  const chipLabel = STATUS_LABELS[status];
  const chipColor = STATUS_COLORS[status];
  const inputId = useId();

  return (
    <Box display="flex" alignItems="center" gap={1} px={1} py={0.5}>
      {iconName && <Icon name={iconName} size="small" />}
      <Typography variant="body1" noWrap sx={{ flexGrow: 1 }}>
        {name}
      </Typography>
      {editable ? (
        <NumberInput
          id={inputId}
          aria-label={`stock de ${name}`}
          value={stock}
          onChange={(_, value) => {
            if (value !== '') onStockChange?.(value);
          }}
          size="small"
        />
      ) : (
        <Typography variant="body2" sx={{ minWidth: 24 }}>
          {stock}
        </Typography>
      )}
      <Chip label={chipLabel} color={chipColor} size="small" />
    </Box>
  );
}

export default InventoryStatusItem;
