import { Box, Typography } from '@mui/material';
import { Avatar } from '../atoms';
import { Chip } from '../atoms/Chip';
import { ReactNode } from 'react';

export interface ApprovalStepItemProps {
  /** Nombre del aprobador. */
  name?: string;
  /** URL de avatar. */
  avatarSrc?: string;
  /** Estado actual de la aprobaci\u00f3n. */
  status?: 'approved' | 'pending' | 'rejected';
  /** Fecha o posici\u00f3n ("Paso 1 de 3"). */
  info?: ReactNode;
  /** Orientaci\u00f3n de disposici\u00f3n. */
  orientation?: 'horizontal' | 'vertical';
  /** Resalta la etapa en curso. */
  current?: boolean;
}

const STATUS_LABELS = {
  approved: 'Aprobado',
  pending: 'Pendiente',
  rejected: 'Rechazado',
} as const;

const STATUS_COLORS = {
  approved: 'success',
  pending: 'warning',
  rejected: 'error',
} as const;

/**
 * Representa una etapa dentro de un flujo de aprobaci\u00f3n.
 */
export function ApprovalStepItem({
  name,
  avatarSrc,
  status = 'pending',
  info,
  orientation = 'horizontal',
  current = false,
}: ApprovalStepItemProps) {
  const displayName = name ?? 'Por asignar';
  const initials =
    !avatarSrc && name
      ? name
          .split(/\s+/)
          .map((w) => w[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : undefined;

  const content = (
    <>
      <Avatar alt={displayName} src={avatarSrc} size="small">
        {initials}
      </Avatar>
      <Typography
        variant="body2"
        fontWeight={current ? 'bold' : 'normal'}
        noWrap
        textAlign={orientation === 'vertical' ? 'center' : 'inherit'}
      >
        {displayName}
      </Typography>
      {orientation === 'vertical' && (
        <Chip
          label={STATUS_LABELS[status]}
          color={STATUS_COLORS[status]}
          size="small"
        />
      )}
      {orientation === 'vertical' && info && (
        <Typography variant="caption" color="text.secondary">
          {info}
        </Typography>
      )}
    </>
  );

  if (orientation === 'vertical') {
    return (
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={0.5}
        px={1}
        py={0.5}
        sx={{ bgcolor: current ? 'action.selected' : undefined }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      px={1}
      py={0.5}
      sx={{ bgcolor: current ? 'action.selected' : undefined }}
    >
      <Avatar alt={displayName} src={avatarSrc} size="small">
        {initials}
      </Avatar>
      <Box flexGrow={1} minWidth={0}>
        <Typography variant="body2" fontWeight={current ? 'bold' : 'normal'} noWrap>
          {displayName}
        </Typography>
        {info && (
          <Typography variant="caption" color="text.secondary" noWrap>
            {info}
          </Typography>
        )}
      </Box>
      <Chip label={STATUS_LABELS[status]} color={STATUS_COLORS[status]} size="small" />
    </Box>
  );
}

export default ApprovalStepItem;
