import { ReactElement, ReactNode } from 'react';
import { PrimaryButton, PrimaryButtonProps } from '../atoms/PrimaryButton';

export interface IconLabelButtonProps
  extends Omit<PrimaryButtonProps, 'startIcon' | 'endIcon' | 'children'> {
  /** Icono que acompaña al texto */
  icon: ReactElement;
  /** Texto opcional del botón */
  label?: ReactNode;
  /** Posición del icono */
  iconPosition?: 'left' | 'right';
  /** Etiqueta accesible cuando no hay texto visible */
  ariaLabel?: string;
}

/**
 * Botón que combina ícono y texto para acciones claras.
 */
export function IconLabelButton({
  icon,
  label,
  iconPosition = 'left',
  ariaLabel,
  ...props
}: IconLabelButtonProps) {
  const startIcon = iconPosition === 'left' ? icon : undefined;
  const endIcon = iconPosition === 'right' ? icon : undefined;

  return (
    <PrimaryButton
      startIcon={startIcon}
      endIcon={endIcon}
      aria-label={!label ? ariaLabel : undefined}
      {...props}
    >
      {label}
    </PrimaryButton>
  );
}

export default IconLabelButton;
