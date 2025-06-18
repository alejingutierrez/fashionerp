import { Box, Typography, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Icon, IconButton } from '../atoms';
import type { IconName } from '../atoms/Icon';
import { ReactNode } from 'react';

export interface CommentItemProps {
  /** Nombre del autor o del sistema */
  name: string;
  /** Contenido principal del comentario */
  text: ReactNode;
  /** Marca de tiempo preformateada */
  timestamp: ReactNode;
  /** URL de la imagen del autor. Ignorado si `system` es true */
  avatarSrc?: string;
  /** Indica que el comentario proviene del sistema */
  system?: boolean;
  /** Nombre del ícono a mostrar cuando es evento del sistema */
  systemIcon?: IconName;
  /** Muestra versión compacta sin avatar ni nombre */
  compact?: boolean;
  /** Manejador para editar el comentario */
  onEdit?: () => void;
  /** Manejador para eliminar el comentario */
  onDelete?: () => void;
  /** Inserta un divisor debajo */
  divider?: boolean;
}

/**
 * Representa un comentario en hilos o historial de actividades.
 */
export function CommentItem({
  name,
  text,
  timestamp,
  avatarSrc,
  system = false,
  systemIcon = 'info',
  compact = false,
  onEdit,
  onDelete,
  divider = false,
}: CommentItemProps) {
  const leading = compact ? null : system ? (
    <Icon name={systemIcon} color="info" />
  ) : (
    <Avatar alt={name} src={avatarSrc} size="small" />
  );

  return (
    <>
      <Box display="flex" alignItems="flex-start" gap={1} px={1} py={0.5}>
        {leading}
        <Box flexGrow={1} minWidth={0}>
          {!compact && (
            <Typography variant="body2" fontWeight="bold" noWrap>
              {name}
            </Typography>
          )}
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
            {text}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {timestamp}
          </Typography>
        </Box>
        {(onEdit || onDelete) && (
          <Box display="flex" gap={0.5}>
            {onEdit && (
              <IconButton
                size="small"
                aria-label="editar comentario"
                onClick={onEdit}
                icon={<EditIcon fontSize="small" />}
              />
            )}
            {onDelete && (
              <IconButton
                size="small"
                aria-label="eliminar comentario"
                onClick={onDelete}
                icon={<DeleteIcon fontSize="small" />}
              />
            )}
          </Box>
        )}
      </Box>
      {divider && <Divider />}
    </>
  );
}

export default CommentItem;
