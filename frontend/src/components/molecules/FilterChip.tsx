import { ChipTag, ChipTagProps, Icon } from '../atoms';

export interface FilterChipProps
  extends Omit<ChipTagProps, 'icon' | 'onDelete' | 'deleteIcon'> {
  /** Identificador del filtro a remover */
  id: string;
  /** Manejador al quitar el filtro */
  onRemove: (id: string) => void;
  /** Ancho máximo antes de truncar con ellipsis */
  maxWidth?: number;
}

/**
 * Chip que representa un filtro activo y permite removerlo.
 */
export function FilterChip({
  id,
  label,
  onRemove,
  color = 'primary',
  variant = 'filled',
  maxWidth = 160,
  sx,
  ...props
}: FilterChipProps) {
  const sxProp = {
    maxWidth,
    '& .MuiChip-label': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    ...sx,
  };

  return (
    <ChipTag
      label={label}
      color={color}
      variant={variant}
      onDelete={() => onRemove(id)}
      deleteIcon={<Icon name="close" size="small" />}
      sx={sxProp}
      {...props}
    />
  );
}

export default FilterChip;
