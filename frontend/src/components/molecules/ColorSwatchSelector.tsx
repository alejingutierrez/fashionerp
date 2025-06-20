import { Box } from '@mui/material';
import { Badge, Tooltip } from '../atoms';

export interface ColorSwatch {
  /** Código hexadecimal del color */
  code: string;
  /** Nombre Pantone para tooltip y accesibilidad */
  name: string;
}

export interface ColorSwatchSelectorProps {
  /** Lista de colores disponibles */
  swatches: ColorSwatch[];
  /** Código seleccionado actualmente */
  value?: string;
  /** Colores ya usados para validar duplicados */
  usedColors?: string[];
  /** Deshabilita la interacción */
  readOnly?: boolean;
  /** Callback al seleccionar un color válido */
  onChange?: (code: string) => void;
  /** Callback al intentar seleccionar un duplicado */
  onDuplicate?: (code: string) => void;
}

/**
 * Permite elegir un color oficial mostrando swatches circulares.
 * Muestra error si el color está repetido en la colección.
 */
export function ColorSwatchSelector({
  swatches,
  value,
  usedColors = [],
  readOnly = false,
  onChange,
  onDuplicate,
}: ColorSwatchSelectorProps) {
  const handleSelect = (code: string, duplicate: boolean) => {
    if (readOnly) return;
    if (duplicate) {
      onDuplicate?.(code);
      return;
    }
    onChange?.(code);
  };

  return (
    <Box display="flex" gap={1}>
      {swatches.map((sw) => {
        const selected = value === sw.code;
        const duplicate = usedColors.includes(sw.code);
        const circle = (
          <Box
            component="button"
            type="button"
            onClick={() => handleSelect(sw.code, duplicate)}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault();
                handleSelect(sw.code, duplicate);
              }
            }}
            disabled={readOnly}
            aria-label={sw.name}
            tabIndex={readOnly ? -1 : 0}
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              bgcolor: sw.code,
              border: 0,
              padding: 0,
              cursor: readOnly ? 'default' : 'pointer',
              outline: selected ? '2px solid' : 'none',
              outlineColor: selected ? 'primary.main' : undefined,
            }}
          />
        );

        const content = duplicate ? (
          <Badge
            content="x"
            color="error"
            overlap="circular"
            sx={{ '& .MuiBadge-badge': { fontSize: 10, top: 0, right: 0 } }}
          >
            {circle}
          </Badge>
        ) : (
          circle
        );

        return (
          <Tooltip key={sw.code} title={sw.name}>
            <span>{content}</span>
          </Tooltip>
        );
      })}
    </Box>
  );
}

export default ColorSwatchSelector;
