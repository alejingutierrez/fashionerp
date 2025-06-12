import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';

export type ChipProps = MuiChipProps;

/**
 * Pequeño elemento para representar etiquetas o estados.
 */
export function Chip({ variant = 'filled', color = 'default', ...props }: ChipProps) {
  return <MuiChip variant={variant} color={color} {...props} />;
}

export default Chip;
