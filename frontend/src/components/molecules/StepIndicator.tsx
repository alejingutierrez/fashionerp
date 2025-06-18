import CheckIcon from '@mui/icons-material/Check';
import { Box, Divider, Typography } from '@mui/material';
import { ReactNode } from 'react';

export interface StepIndicatorProps {
  /** Posición del paso comenzando en 1 */
  step: number;
  /** Texto o descripción del paso */
  label: ReactNode;
  /** Estado visual del paso */
  status?: 'pending' | 'current' | 'completed';
  /** Orientación de presentación */
  orientation?: 'horizontal' | 'vertical';
  /** Muestra una línea de conexión al siguiente paso */
  connector?: boolean;
}

/**
 * Representa un paso individual dentro de un flujo multi-paso.
 */
export function StepIndicator({
  step,
  label,
  status = 'pending',
  orientation = 'horizontal',
  connector = false,
}: StepIndicatorProps) {
  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';

  const bgColor = isCompleted
    ? 'success.main'
    : isCurrent
    ? 'primary.main'
    : 'background.paper';
  const color = isCurrent || isCompleted ? 'common.white' : 'text.secondary';

  const indicator = (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={24}
      height={24}
      borderRadius="50%"
      bgcolor={bgColor}
      color={color}
      border={status === 'pending' ? '1px solid' : undefined}
      borderColor="text.disabled"
    >
      {isCompleted ? <CheckIcon fontSize="small" /> : step}
    </Box>
  );

  const divider = connector ? (
    orientation === 'vertical' ? (
      <Divider flexItem sx={{ alignSelf: 'stretch', my: 1 }} />
    ) : (
      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
    )
  ) : null;

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={orientation === 'vertical' ? 'column' : 'row'}
      gap={0.5}
      aria-current={isCurrent ? 'step' : undefined}
    >
      {indicator}
      <Typography
        variant="body2"
        fontWeight={isCurrent ? 'bold' : 'normal'}
        textAlign={orientation === 'vertical' ? 'center' : 'inherit'}
      >
        {label}
      </Typography>
      {divider}
    </Box>
  );
}

export default StepIndicator;
