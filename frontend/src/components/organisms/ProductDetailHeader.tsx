import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Dialog, DialogContent, Typography, Skeleton } from '@mui/material';
import {
  AvatarName,
  IconLabelButton,
  ModalFooter,
  ModalHeader,
  StatusToggleChip,
  SnackbarAlert,
  BreadcrumbItem,
  type BreadcrumbItemProps,
  LabeledTextField,
  ImageUpload,
} from '../molecules';

export interface ProductDetailHeaderProps {
  /** Nombre del SKU */
  name: string;
  /** Imagen del producto */
  src?: string;
  /** Código SKU a copiar */
  sku?: string;
  /** Estado inicial */
  defaultActive?: boolean;
  /** Callback al guardar un nuevo nombre */
  onNameSave?: (name: string) => Promise<void> | void;
  /** Callback al cambiar de estado */
  onStatusChange?: (active: boolean) => Promise<void> | void;
  /** Permiso para cambiar estado */
  canEditStatus?: boolean;
  /** Indica si se muestran esqueletos */
  loading?: boolean;
  /** Rutas de navegación */
  breadcrumbs?: BreadcrumbItemProps[];
  /** Maneja cambio de imagen */
  onImageChange?: (url: string) => void;
}

/**
 * Cabecera hero con avatar grande y controles de estado/edición.
 */
export function ProductDetailHeader({
  name: initialName,
  src,
  sku,
  defaultActive = true,
  onNameSave,
  onStatusChange,
  canEditStatus = true,
  loading = false,
  breadcrumbs,
  onImageChange,
}: ProductDetailHeaderProps) {
  const [name, setName] = useState(initialName);
  const [editOpen, setEditOpen] = useState(false);
  const [input, setInput] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [active, setActive] = useState(defaultActive);
  const [statusLoading, setStatusLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const handleStatusToggle = async (next: boolean) => {
    setStatusLoading(true);
    setError(null);
    try {
      await onStatusChange?.(next);
      setActive(next);
      setSnackbar({ open: true, message: 'Guardado con éxito', severity: 'success' });
    } catch (e) {
      setError('Error al guardar');
      setSnackbar({ open: true, message: 'Error al guardar', severity: 'error' });
    } finally {
      setStatusLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await onNameSave?.(input);
      setName(input);
      setSnackbar({ open: true, message: 'Guardado con éxito', severity: 'success' });
      setEditOpen(false);
    } catch (e) {
      setError('Error al guardar');
      setSnackbar({ open: true, message: 'Error al guardar', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box
        role="button"
        tabIndex={0}
        onClick={() => {
          setInput(name);
          setEditOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setInput(name);
            setEditOpen(true);
          }
        }}
        sx={{ position: 'relative' }}
      >
        {loading ? (
          <Skeleton
            variant="circular"
            width={{ xs: 120, md: 200 }}
            height={{ xs: 120, md: 200 }}
          />
        ) : (
          <AvatarName
            name={name}
            src={src}
            orientation="vertical"
            sx={{
              width: { xs: 120, md: 200 },
              height: { xs: 120, md: 200 },
              '& .MuiAvatar-root': {
                width: { xs: 120, md: 200 },
                height: { xs: 120, md: 200 },
              },
            }}
          />
        )}
        {onImageChange && !loading && (
          <Box position="absolute" bottom={8} right={8}>
            <ImageUpload
              variant="icon"
              size={40}
              showPreview={false}
              onChange={onImageChange}
            />
          </Box>
        )}
      </Box>
      <Box display="flex" flexDirection="column" gap={1} alignItems="flex-start">
        {breadcrumbs && (
          <Box>
            {breadcrumbs.map((b, idx) => (
              <BreadcrumbItem key={idx} {...b} isLast={idx === breadcrumbs.length - 1} />
            ))}
          </Box>
        )}
        {loading ? (
          <Skeleton width={100} height={32} />
        ) : (
          <StatusToggleChip
            defaultActive={active}
            loading={statusLoading}
            onToggle={handleStatusToggle}
            hasPermission={canEditStatus}
          />
        )}
        {loading ? (
          <Skeleton width={120} height={32} />
        ) : (
          <IconLabelButton
            icon={<EditIcon />}
            label="Editar nombre"
            onClick={() => {
              setInput(name);
              setEditOpen(true);
            }}
          />
        )}
        {sku && !loading && (
          <Typography variant="body2" color="text.secondary">
            SKU: {sku}
          </Typography>
        )}
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </Box>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <ModalHeader title="Editar nombre" onClose={() => setEditOpen(false)} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <DialogContent>
            <LabeledTextField
              label="Nombre"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              error={!!error}
              helperText={error ?? ''}
              autoFocus
            />
          </DialogContent>
          <ModalFooter
            primaryText="Guardar"
            primaryType="submit"
            onPrimary={handleSave}
            primaryDisabled={saving || input.trim() === ''}
            secondaryText="Cancelar"
            onSecondary={() => setEditOpen(false)}
            loading={saving}
          />
        </form>
      </Dialog>
      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </Box>
  );
}

export default ProductDetailHeader;
