import { Icon, IconProps, Tooltip, TooltipProps } from '../atoms';

export interface InfoTooltipIconProps
  extends Pick<IconProps, 'size' | 'color' | 'icon' | 'name'> {
  /** Contenido del tooltip que se mostrará al enfocar o pasar el cursor */
  text: TooltipProps['title'];
  /** Posición del tooltip respecto al ícono */
  placement?: TooltipProps['placement'];
}

/**
 * Ícono informativo que muestra un tooltip contextual al hover o focus.
 */
export function InfoTooltipIcon({
  text,
  placement = 'right',
  size = 'medium',
  color = 'action',
  name = 'info',
  icon,
  ...props
}: InfoTooltipIconProps) {
  const ariaLabel = typeof text === 'string' ? text : undefined;
  return (
    <Tooltip title={text} placement={placement}>
      <Icon
        tabIndex={0}
        name={name}
        icon={icon}
        size={size}
        color={color}
        aria-label={ariaLabel}
        {...props}
      />
    </Tooltip>
  );
}

export default InfoTooltipIcon;
