import { Box, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ReactElement } from 'react';
import { Icon, IconProps, IconName } from '../atoms/Icon';

export interface StatWithIconProps extends Omit<IconProps, 'icon' | 'name'> {
  /** Nombre del ícono predefinido o componente personalizado */
  icon?: ReactElement;
  /** Nombre de ícono de la librería */
  name?: IconName;
  /** Valor numérico o texto destacado */
  value: number | string;
  /** Descripción de la métrica */
  label: string;
  /** Orientación del layout */
  orientation?: 'horizontal' | 'vertical';
  /** Tendencia de la métrica */
  trend?: 'up' | 'down';
}

/**
 * Widget compacto para mostrar una estadística junto a un ícono.
 */
export function StatWithIcon({
  icon,
  name,
  value,
  label,
  orientation = 'horizontal',
  trend,
  color = 'inherit',
  size = 'medium',
  ...props
}: StatWithIconProps) {
  const TrendIcon =
    trend === 'up' ? ArrowDropUpIcon : trend === 'down' ? ArrowDropDownIcon : null;
  const trendColor =
    trend === 'up' ? 'success' : trend === 'down' ? 'error' : undefined;

  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={orientation === 'vertical' ? 'column' : 'row'}
      gap={1}
    >
      <Icon name={name} icon={icon} color={color} size={size} {...props} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems={orientation === 'vertical' ? 'center' : 'flex-start'}
      >
        <Box display="flex" alignItems="center" gap={0.25}>
          <Typography variant="h6" component="span">
            {value}
          </Typography>
          {TrendIcon && (
            <TrendIcon fontSize="small" color={trendColor} data-testid="trend-icon" />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

export default StatWithIcon;
