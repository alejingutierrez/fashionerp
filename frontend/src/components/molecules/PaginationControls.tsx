import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Typography } from '@mui/material';
import { IconButton, TertiaryButton } from '../atoms';

export interface PaginationControlsProps {
  /** Página actual comenzando en 1 */
  page: number;
  /** Número total de páginas */
  totalPages: number;
  /** Callback al cambiar de página */
  onPageChange: (page: number) => void;
  /** Muestra botones numéricos */
  showNumbers?: boolean;
  /** Tamaño de los controles */
  size?: 'small' | 'medium';
}

/**
 * Conjunto de botones de paginación para navegar entre páginas de listas.
 */
export function PaginationControls({
  page,
  totalPages,
  onPageChange,
  showNumbers = true,
  size = 'medium',
}: PaginationControlsProps) {
  const disablePrev = page <= 1;
  const disableNext = page >= totalPages;

  const handlePrev = () => {
    if (!disablePrev) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (!disableNext) {
      onPageChange(page + 1);
    }
  };

  const handlePageClick = (p: number) => () => {
    if (p !== page) {
      onPageChange(p);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        aria-label="anterior"
        icon={<ChevronLeftIcon />}
        onClick={handlePrev}
        disabled={disablePrev}
        size={size}
      />
      {showNumbers &&
        Array.from({ length: totalPages }, (_, i) => {
          const p = i + 1;
          const isCurrent = p === page;
          return (
            <TertiaryButton
              key={p}
              onClick={handlePageClick(p)}
              disabled={isCurrent}
              aria-current={isCurrent ? 'page' : undefined}
              size={size}
              sx={{ fontWeight: isCurrent ? 'bold' : undefined }}
            >
              {p}
            </TertiaryButton>
          );
        })}
      <IconButton
        aria-label="siguiente"
        icon={<ChevronRightIcon />}
        onClick={handleNext}
        disabled={disableNext}
        size={size}
      />
      <Typography variant="body2" ml={1}>
        Página {page} de {totalPages}
      </Typography>
    </Box>
  );
}

export default PaginationControls;
