import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Link } from '../atoms';

export interface BreadcrumbItemProps {
  /** Texto del enlace */
  label: string;
  /** Ruta de destino */
  href?: string;
  /** Indica si es el último elemento */
  isLast?: boolean;
  /** Elemento separador entre items */
  separator?: ReactNode;
  /** Callback al hacer clic en el enlace */
  onNavigate?: (href: string) => void;
}

/**
 * Eslabón de un rastro de navegación jerárquica.
 */
export function BreadcrumbItem({
  label,
  href,
  isLast = false,
  separator = '/',
  onNavigate,
}: BreadcrumbItemProps) {
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    if (href) {
      onNavigate?.(href);
    }
  };

  const content =
    href && !isLast ? (
      <Link
        href={href}
        onClick={handleClick}
        aria-current={isLast ? 'page' : undefined}
      >
        {label}
      </Link>
    ) : (
      <Typography color="text.primary" aria-current={isLast ? 'page' : undefined}>
        {label}
      </Typography>
    );

  const separatorNode =
    !isLast &&
    (typeof separator === 'string' ? (
      <Typography sx={{ mx: 0.5 }} color="text.disabled" aria-hidden="true">
        {separator}
      </Typography>
    ) : (
      separator
    ));

  return (
    <Box display="inline-flex" alignItems="center">
      {content}
      {separatorNode}
    </Box>
  );
}

export default BreadcrumbItem;
