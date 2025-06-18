import CloseIcon from '@mui/icons-material/Close';
import { Box, Divider, Typography } from '@mui/material';
import { IconButton } from '../atoms';
import { ReactNode } from 'react';

export interface ModalHeaderProps {
  /** Título de la ventana modal */
  title: ReactNode;
  /** Manejador al hacer click en el botón de cerrar */
  onClose?: () => void;
  /** Oculta el botón de cerrar */
  hideCloseButton?: boolean;
  /** Alineación del título */
  align?: 'left' | 'center';
  /** Muestra un divisor inferior */
  divider?: boolean;
}

/**
 * Encabezado estándar para cuadros de diálogo/modal.
 */
export function ModalHeader({
  title,
  onClose,
  hideCloseButton = false,
  align = 'left',
  divider = false,
}: ModalHeaderProps) {
  const header = (
    <Box display="flex" alignItems="center" px={2} py={1}>
      <Typography component="h2" variant="h5" flexGrow={1} textAlign={align} noWrap>
        {title}
      </Typography>
      {!hideCloseButton && (
        <IconButton
          aria-label="Cerrar"
          icon={<CloseIcon />}
          size="small"
          onClick={onClose}
          sx={{ borderRadius: '50%' }}
        />
      )}
      {hideCloseButton && align === 'center' && <Box width={32} />}
    </Box>
  );

  return divider ? (
    <Box>
      {header}
      <Divider />
    </Box>
  ) : (
    header
  );
}

export default ModalHeader;
