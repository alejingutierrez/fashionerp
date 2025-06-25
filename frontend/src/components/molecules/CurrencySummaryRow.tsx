import { Box, Skeleton } from '@mui/material';
import { LabeledCurrencyField } from './LabeledCurrencyField';
import { Badge } from '../atoms';

export interface CurrencySummaryRowProps {
  /** Subtotal sin impuestos */
  subtotal: number;
  /** Valor de impuestos */
  taxes: number;
  /** Código de moneda ISO 4217 */
  currency?: string;
  /** Locale actual para formatear */
  locale?: string;
  /** Muestra esqueletos de carga */
  loading?: boolean;
  /** Callback al hacer clic en la badge negativa */
  onCreditNoteClick?: () => void;
}

/**
 * Muestra tres campos de moneda alineados a la derecha con el resumen de una transacción.
 */
export function CurrencySummaryRow({
  subtotal,
  taxes,
  currency = 'USD',
  locale = 'en-US',
  loading = false,
  onCreditNoteClick,
}: CurrencySummaryRowProps) {
  const total = subtotal + taxes;

  if (loading) {
    return (
      <Box display="flex" justifyContent="flex-end" gap={2} alignItems="center">
        <Skeleton
          variant="rectangular"
          width={120}
          height={56}
          data-testid="subtotal-skeleton"
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={56}
          data-testid="taxes-skeleton"
        />
        <Skeleton
          variant="rectangular"
          width={120}
          height={56}
          data-testid="total-skeleton"
        />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="flex-end" gap={2} alignItems="center">
      <LabeledCurrencyField
        label="Subtotal"
        value={subtotal}
        onChange={() => {}}
        currency={currency}
        locale={locale}
        inputProps={{ readOnly: true }}
      />
      <LabeledCurrencyField
        label="Impuestos"
        value={taxes}
        onChange={() => {}}
        currency={currency}
        locale={locale}
        inputProps={{ readOnly: true }}
      />
      <Box display="flex" alignItems="center" gap={1}>
        <LabeledCurrencyField
          label="Total"
          value={total}
          onChange={() => {}}
          currency={currency}
          locale={locale}
          inputProps={{ readOnly: true }}
        />
        {total < 0 && (
          <Badge
            content="Nota de crédito"
            color="warning"
            onClick={onCreditNoteClick}
            sx={{ cursor: onCreditNoteClick ? 'pointer' : 'default' }}
          />
        )}
      </Box>
    </Box>
  );
}

export default CurrencySummaryRow;
