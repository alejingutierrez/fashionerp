import { Box, Typography } from '@mui/material';
import { Badge } from '../atoms';

export interface StatusBadgeDisplayProps {
  /**
   * Texto a mostrar junto al badge. Si se omite, solo se renderiza el badge.
   */
  label?: string;
  /** Estado que determina el color del badge. */
  status?: 'success' | 'warning' | 'error' | 'info' | 'default';
  /** Posicion del badge respecto al texto. */
  badgePosition?: 'start' | 'end';
  /** Tamaño del punto indicador. */
  size?: 'small' | 'medium';
}

const SIZE_MAP = {
  small: 8,
  medium: 12,
} as const;

const STATUS_COLOR_MAP = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  default: 'default',
} as const;

/**
 * Muestra un punto de estado junto a una etiqueta descriptiva.
 */
export function StatusBadgeDisplay({
  label,
  status = 'info',
  badgePosition = 'start',
  size = 'medium',
}: StatusBadgeDisplayProps) {
  const dotSize = SIZE_MAP[size];

  const badge = (
    <Badge
      content={0}
      variant="dot"
      color={STATUS_COLOR_MAP[status]}
      showZero
      slotProps={{ badge: { sx: { height: dotSize, minWidth: dotSize } } }}
    >
      <Box sx={{ width: 0, height: 0 }} />
    </Badge>
  );

  if (!label) {
    return badge;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={0.5}
      flexDirection={badgePosition === 'end' ? 'row-reverse' : 'row'}
    >
      {badge}
      <Typography variant="body2">{label}</Typography>
    </Box>
  );
}

export default StatusBadgeDisplay;
