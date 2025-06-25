import { ChipTag, ChipTagProps, Icon } from '../atoms';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export interface PromotionBadgeProps extends Omit<ChipTagProps, 'icon'> {
  /** Mostrar ícono de oferta al inicio del chip */
  withIcon?: boolean;
}

/**
 * Etiqueta destacada para promociones o descuentos.
 */
export function PromotionBadge({ withIcon = false, ...props }: PromotionBadgeProps) {
  const icon = withIcon ? <Icon icon={<LocalOfferIcon />} size="small" /> : undefined;
  return <ChipTag icon={icon} {...props} />;
}

export default PromotionBadge;
