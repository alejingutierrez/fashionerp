import { Box, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { Badge, Tooltip, Link } from '../atoms';

export interface NavItemProps {
  /** Ícono representativo de la sección */
  icon: ReactElement;
  /** Texto visible del ítem */
  label: string;
  /** Ruta de destino cuando es un enlace */
  href?: string;
  /** Indica que corresponde a la vista actual */
  active?: boolean;
  /** Deshabilita la interacción */
  disabled?: boolean;
  /** Muestra solo el ícono y despliega el texto como tooltip */
  collapsed?: boolean;
  /** Conteo opcional de notificaciones */
  badgeContent?: number;
  /** Manejador de clic */
  onClick?: () => void;
}

/**
 * Elemento de navegación con ícono y texto para menús laterales o superiores.
 */
export function NavItem({
  icon,
  label,
  href,
  active = false,
  disabled = false,
  collapsed = false,
  badgeContent,
  onClick,
}: NavItemProps) {
  const content = (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={collapsed ? 'center' : 'flex-start'}
      gap={1}
      px={1.5}
      py={1}
      onClick={disabled ? undefined : onClick}
      sx={{
        cursor: disabled ? 'default' : onClick || href ? 'pointer' : 'default',
        color: active ? 'primary.main' : disabled ? 'text.disabled' : undefined,
        bgcolor: active ? 'action.selected' : undefined,
        '&:hover': !disabled ? { bgcolor: 'action.hover' } : undefined,
        borderRadius: 1,
        textDecoration: 'none',
      }}
    >
      {badgeContent !== undefined ? (
        <Badge content={badgeContent} color="error" overlap="circular" showZero>
          {icon}
        </Badge>
      ) : (
        icon
      )}
      {!collapsed && (
        <Typography variant="body2" fontWeight={active ? 'bold' : undefined} noWrap>
          {label}
        </Typography>
      )}
    </Box>
  );

  const Wrapper = href && !disabled ? Link : Box;
  const wrapperProps = href && !disabled ? { href } : {};

  const wrapped = (
    <Wrapper
      {...wrapperProps}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      aria-label={label}
      sx={{ textDecoration: 'none', display: 'block' }}
    >
      {content}
    </Wrapper>
  );

  return collapsed ? <Tooltip title={label}>{wrapped}</Tooltip> : wrapped;
}

export default NavItem;
