import { Box } from '@mui/material';
import { PrimaryButton, Link } from '../atoms';
import { ReactNode } from 'react';

export interface FormActionGroupProps {
  /** Texto del botón principal del formulario */
  primaryText: ReactNode;
  /** Maneja la acción principal al enviar */
  onPrimary: () => void;
  /** Texto del enlace para cancelar */
  cancelText?: ReactNode;
  /** Acción al cancelar */
  onCancel?: () => void;
  /** Ruta opcional de navegación al cancelar */
  cancelHref?: string;
  /** Deshabilita el botón principal */
  primaryDisabled?: boolean;
  /** Muestra spinner de carga en el botón principal */
  loading?: boolean;
  /** Alineación de los controles */
  align?: 'right' | 'spread';
}

/**
 * Agrupa las acciones finales de un formulario, típicamente Guardar y Cancelar.
 */
export function FormActionGroup({
  primaryText,
  onPrimary,
  cancelText = 'Cancelar',
  onCancel,
  cancelHref,
  primaryDisabled = false,
  loading = false,
  align = 'right',
}: FormActionGroupProps) {
  const justifyContent = align === 'spread' ? 'space-between' : 'flex-end';

  return (
    <Box display="flex" width="100%" justifyContent={justifyContent} gap={1} mt={2}>
      <Link href={cancelHref} onClick={onCancel} sx={{ alignSelf: 'center' }}>
        {cancelText}
      </Link>
      <PrimaryButton onClick={onPrimary} disabled={primaryDisabled} loading={loading}>
        {primaryText}
      </PrimaryButton>
    </Box>
  );
}

export default FormActionGroup;
