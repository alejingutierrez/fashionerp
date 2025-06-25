import { Box } from '@mui/material';
import { PrimaryButton, SecondaryButton } from '../atoms';
import { ReactNode } from 'react';

export interface ModalFooterProps {
  /** Texto del botón primario */
  primaryText: ReactNode;
  /** Maneja el click del botón primario */
  onPrimary: () => void;
  /** Texto del botón secundario */
  secondaryText?: ReactNode;
  /** Maneja el click del botón secundario */
  onSecondary?: () => void;
  /** Deshabilita el botón primario */
  primaryDisabled?: boolean;
  /** Muestra spinner de carga en el botón primario */
  loading?: boolean;
  /** Alineación de los botones */
  align?: 'right' | 'center';
  /** Tipo de boton primario */
  primaryType?: 'button' | 'submit';
}

/**
 * Pie de un cuadro de diálogo/modal que agrupa las acciones disponibles.
 */
export function ModalFooter({
  primaryText,
  onPrimary,
  secondaryText,
  onSecondary,
  primaryDisabled = false,
  loading = false,
  align = 'right',
  primaryType = 'button',
}: ModalFooterProps) {
  const justifyContent = align === 'center' ? 'center' : 'flex-end';

  return (
    <Box display="flex" justifyContent={justifyContent} gap={1} px={2} py={2}>
      {secondaryText && onSecondary && (
        <SecondaryButton onClick={onSecondary}>{secondaryText}</SecondaryButton>
      )}
      <PrimaryButton
        type={primaryType}
        onClick={onPrimary}
        disabled={primaryDisabled}
        loading={loading}
      >
        {primaryText}
      </PrimaryButton>
    </Box>
  );
}

export default ModalFooter;
