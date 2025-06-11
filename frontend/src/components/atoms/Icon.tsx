import { ReactElement, cloneElement } from 'react';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ICONS = {
  search: SearchIcon,
  user: PersonIcon,
  settings: SettingsIcon,
  menu: MenuIcon,
  close: CloseIcon,
  delete: DeleteIcon,
  favorite: FavoriteIcon,
};

export type IconName = keyof typeof ICONS;

export interface IconProps extends Omit<SvgIconProps, 'fontSize'> {
  /** Nombre del ícono predefinido. */
  name?: IconName;
  /** Ícono personalizado. Tiene prioridad sobre `name`. */
  icon?: ReactElement<SvgIconProps>;
  /** Tamaño del ícono. */
  size?: 'inherit' | 'small' | 'medium' | 'large';
}

/**
 * Representa un pictograma basado en Material Icons.
 */
export function Icon({
  name,
  icon,
  size = 'medium',
  color = 'inherit',
  ...props
}: IconProps) {
  if (icon) {
    return cloneElement(icon, { fontSize: size, color, ...props });
  }

  const IconComponent = name ? ICONS[name] : undefined;
  return IconComponent ? (
    <IconComponent fontSize={size} color={color} {...props} />
  ) : null;
}

export default Icon;
