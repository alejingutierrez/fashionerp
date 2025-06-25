import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { Badge, IconButton } from '../atoms';
import { Box, Typography } from '@mui/material';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { ReactNode } from 'react';

export interface NotificationItemProps {
  /** Mensaje a mostrar en la notificación. */
  message: ReactNode;
  /** Fecha u hora relativa preformateada. */
  timestamp?: ReactNode;
  /** Tipo de notificación que determina el ícono y color. */
  type?: 'info' | 'success' | 'warning' | 'error';
  /** Indica si la notificación ya fue leída. */
  read?: boolean;
  /** Manejador para descartar la notificación. */
  onDismiss?: () => void;
}

const ICON_MAP = {
  info: InfoOutlinedIcon,
  success: CheckCircleOutlineIcon,
  warning: WarningAmberOutlinedIcon,
  error: ErrorOutlineIcon,
} as const;

const COLOR_MAP: Record<
  'info' | 'success' | 'warning' | 'error',
  SvgIconProps['color']
> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

/**
 * Elemento de una lista de notificaciones con icono, mensaje y marca temporal.
 */
export function NotificationItem({
  message,
  timestamp,
  type = 'info',
  read = false,
  onDismiss,
}: NotificationItemProps) {
  const IconComponent = ICON_MAP[type];
  const iconColor = COLOR_MAP[type];

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      px={1}
      py={0.5}
      sx={{ bgcolor: read ? undefined : 'action.selected' }}
    >
      <Badge
        variant="dot"
        content={0}
        color="primary"
        invisible={read}
        overlap="circular"
      >
        <IconComponent fontSize="small" color={iconColor} />
      </Badge>
      <Box flexGrow={1} minWidth={0}>
        <Typography variant="body2" fontWeight={read ? 'normal' : 'bold'} noWrap>
          {message}
        </Typography>
        {timestamp && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {timestamp}
          </Typography>
        )}
      </Box>
      {onDismiss && (
        <IconButton
          aria-label="dismiss notification"
          size="small"
          onClick={onDismiss}
          icon={<CloseIcon fontSize="small" />}
        />
      )}
    </Box>
  );
}

export default NotificationItem;
