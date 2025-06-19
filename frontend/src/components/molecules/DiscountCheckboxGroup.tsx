import { Box, FormControlLabel, FormGroup, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/WarningAmber';
import { useId, useState } from 'react';
import { Checkbox, ChipTag, Snackbar } from '../atoms';

export interface DiscountOption {
  /** Identificador único */
  id: string;
  /** Texto visible de la opción */
  label: string;
  /** Categoría mostrada como chip */
  category?: string;
}

export interface DiscountCheckboxGroupProps {
  /** Opciones disponibles */
  options: DiscountOption[];
  /** Mapeo de id a ids incompatibles */
  conflicts?: Record<string, string[]>;
  /** Conjunto de ids seleccionados */
  value: string[];
  /** Callback cuando cambia la selección */
  onChange: (value: string[]) => void;
  /** Etiqueta del grupo */
  label?: string;
  /** Deshabilita todo el grupo */
  disabled?: boolean;
}

/**
 * Lista de descuentos combinables con manejo de conflictos.
 */
export function DiscountCheckboxGroup({
  options,
  conflicts = {},
  value,
  onChange,
  label,
  disabled = false,
}: DiscountCheckboxGroupProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [disabledIds, setDisabledIds] = useState<string[]>([]);
  const generatedId = useId();
  const groupId = label ? generatedId : undefined;

  const handleClose = () => setToast(null);

  const handleToggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
      return;
    }
    const conflictsWith = conflicts[id]?.find((c) => value.includes(c));
    if (conflictsWith) {
      const otherLabel = options.find((o) => o.id === conflictsWith)?.label;
      setToast(
        `\u00ab${options.find((o) => o.id === id)?.label}\u00bb no se puede combinar con \u00ab${otherLabel}\u00bb`,
      );
      setDisabledIds((prev) => [...prev, id]);
      return;
    }
    onChange([...value, id]);
  };

  return (
    <Box>
      {label && (
        <Typography id={groupId} variant="subtitle1" mb={1}>
          {label}
        </Typography>
      )}
      <FormGroup aria-labelledby={groupId}>
        {options.map((opt) => {
          const checked = value.includes(opt.id);
          const conflict = disabledIds.includes(opt.id);
          return (
            <Box
              key={opt.id}
              display="flex"
              alignItems="center"
              gap={1}
              sx={{ color: conflict ? 'error.main' : undefined }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    disabled={disabled || conflict}
                    onChange={() => handleToggle(opt.id)}
                  />
                }
                label={opt.label}
              />
              {opt.category && (
                <ChipTag label={opt.category} size="small" color="secondary" />
              )}
              {conflict && <WarningIcon color="error" fontSize="small" />}
            </Box>
          );
        })}
      </FormGroup>
      <Snackbar open={Boolean(toast)} message={toast} onClose={handleClose} />
    </Box>
  );
}

export default DiscountCheckboxGroup;
