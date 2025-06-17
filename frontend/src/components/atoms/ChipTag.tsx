import { Chip, ChipProps } from './Chip';
import { ReactElement } from 'react';

export interface ChipTagProps extends ChipProps {
  /** Ícono opcional que se muestra al inicio. */
  icon?: ReactElement;
}

/**
 * Pequeño contenedor visual para etiquetas de promoción.
 */
export function ChipTag({
  icon,
  size = 'small',
  variant = 'filled',
  color = 'default',
  ...props
}: ChipTagProps) {
  return <Chip icon={icon} size={size} variant={variant} color={color} {...props} />;
}

export default ChipTag;
