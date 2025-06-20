import AutorenewIcon from '@mui/icons-material/Autorenew';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { Chip, ChipProps, Tooltip, ProgressSpinner } from '../atoms';

export interface StatusToggleChipProps
  extends Omit<
    ChipProps,
    'label' | 'color' | 'onClick' | 'icon' | 'onDelete' | 'deleteIcon'
  > {
  /** Estado inicial del chip */
  defaultActive?: boolean;
  /** Manejador al cambiar de estado */
  onToggle?: (active: boolean) => void;
  /** Muestra indicador de carga */
  loading?: boolean;
  /** Deshabilita la interacción */
  disabled?: boolean;
  /** Controla si el usuario tiene permiso para modificar */
  hasPermission?: boolean;
}

/**
 * Chip que alterna entre "Activo" y "Archivado" con icono rotatorio.
 */
export function StatusToggleChip({
  defaultActive = false,
  onToggle,
  loading = false,
  disabled = false,
  hasPermission = true,
  sx,
  ...props
}: StatusToggleChipProps) {
  const [active, setActive] = useState(defaultActive);

  const handleToggle = () => {
    if (disabled || loading || !hasPermission) return;
    const next = !active;
    setActive(next);
    onToggle?.(next);
  };

  const label = active ? 'Activo' : 'Archivado';
  const color: ChipProps['color'] = active ? 'success' : 'default';
  const arrowIcon = loading ? (
    <ProgressSpinner size={16} />
  ) : (
    <AutorenewIcon fontSize="small" />
  );

  const chip = (
    <Chip
      label={label}
      color={color}
      onClick={handleToggle}
      onDelete={handleToggle}
      deleteIcon={arrowIcon}
      disabled={disabled || loading || !hasPermission}
      sx={{
        cursor: disabled || loading || !hasPermission ? 'default' : 'pointer',
        ...sx,
      }}
      {...props}
    />
  );

  if (!hasPermission) {
    return (
      <Tooltip title="Sin permiso">
        <span>
          <Chip
            label={label}
            color={color}
            icon={<LockIcon fontSize="small" aria-label="Sin permiso" />}
            disabled
            sx={sx}
            {...props}
          />
        </span>
      </Tooltip>
    );
  }

  return chip;
}

export default StatusToggleChip;
