import { TableRow, TableCell, Typography } from '@mui/material';
import { IconButton } from '../atoms';
import { ReactElement } from 'react';

export interface TableRowItemProps {
  /** Identificador de la fila para acciones */
  id?: string | number;
  /** Contenido de cada celda */
  cells: Array<React.ReactNode | string | number | null | undefined>;
  /** Icono del boton de accion */
  actionIcon?: ReactElement;
  /** Handler al hacer clic en la accion */
  onAction?: (id: string | number | undefined) => void;
  /** Densidad de la fila */
  density?: 'standard' | 'compact';
  /** Destacar temporalmente */
  highlighted?: boolean;
  /** Marcar como seleccionada */
  selected?: boolean;
}

/**
 * Representa una fila de tabla reutilizable.
 */
export function TableRowItem({
  id,
  cells,
  actionIcon,
  onAction,
  density = 'standard',
  highlighted = false,
  selected = false,
}: TableRowItemProps) {
  const size = density === 'compact' ? 'small' : 'medium';

  return (
    <TableRow
      hover
      selected={selected}
      sx={{ bgcolor: highlighted ? 'action.hover' : undefined }}
    >
      {cells.map((cell, index) => (
        <TableCell key={index} size={size}>
          {cell === null || cell === undefined ? (
            <Typography variant="body2">-</Typography>
          ) : typeof cell === 'string' || typeof cell === 'number' ? (
            <Typography variant="body2">{cell}</Typography>
          ) : (
            cell
          )}
        </TableCell>
      ))}
      {actionIcon && onAction && (
        <TableCell size={size} align="right">
          <IconButton icon={actionIcon} onClick={() => onAction(id)} />
        </TableCell>
      )}
    </TableRow>
  );
}

export default TableRowItem;
