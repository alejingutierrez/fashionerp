import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { PropsWithChildren } from 'react';

export type LinkProps = MuiLinkProps & PropsWithChildren;

/**
 * Enlace de navegación basado en MUI `Link`.
 * Aplica color primario y solo subraya al pasar el cursor.
 */
export function Link({
  children,
  color = 'primary',
  underline = 'hover',
  ...props
}: LinkProps) {
  return (
    <MuiLink
      color={color}
      underline={underline}
      sx={{ '&:visited': { color: 'inherit' } }}
      {...props}
    >
      {children}
    </MuiLink>
  );
}

export default Link;
