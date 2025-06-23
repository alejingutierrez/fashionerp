import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Dialog, DialogContent, TextField, Typography } from '@mui/material';
import {
  AvatarName,
  IconLabelButton,
  ModalFooter,
  ModalHeader,
  StatusToggleChip,
} from '../molecules';

export interface ProductDetailHeaderProps {
  /** Nombre del SKU */
  name: string;
  /** Imagen del producto */
  src?: string;
  /** Estado inicial */
  defaultActive?: boolean;
  /** Callback al guardar un nuevo nombre */
  onNameSave?: (name: string) => Promise<void> | void;
  /** Callback al cambiar de estado */
  onStatusChange?: (active: boolean) => Promise<void> | void;
}

/**
 * Cabecera hero con avatar grande y controles de estado/edición.
 */
export function ProductDetailHeader({
  name: initialName,
  src,
  defaultActive = true,
  onNameSave,
  onStatusChange,
}: ProductDetailHeaderProps) {
  const [name, setName] = useState(initialName);
  const [editOpen, setEditOpen] = useState(false);
  const [input, setInput] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [active, setActive] = useState(defaultActive);
  const [statusLoading, setStatusLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [announce, setAnnounce] = useState('');

  const handleStatusToggle = async (next: boolean) => {
    setStatusLoading(true);
    setError(null);
    try {
      await onStatusChange?.(next);
      setActive(next);
      setAnnounce('Guardado con éxito');
    } catch (e) {
      setError('Error al guardar');
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
      setAnnounce('Guardado con éxito');
      setEditOpen(false);
    } catch (e) {
      setError('Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Box
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setEditOpen(true);
          }
        }}
      >
        <AvatarName
          name={name}
          src={src}
          orientation="vertical"
          sx={{
            width: 200,
            height: 200,
            '& .MuiAvatar-root': { width: 200, height: 200 },
          }}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={1} alignItems="flex-start">
        <StatusToggleChip
          defaultActive={active}
          loading={statusLoading}
          onToggle={handleStatusToggle}
        />
        <IconLabelButton
          icon={<EditIcon />}
          label="Editar nombre"
          onClick={() => setEditOpen(true)}
        />
        <Box role="status" aria-live="polite" sx={{ fontSize: 0 }}>
          {announce}
        </Box>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </Box>
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <ModalHeader title="Editar nombre" onClose={() => setEditOpen(false)} />
        <DialogContent>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <ModalFooter
          primaryText="Guardar"
          onPrimary={handleSave}
          primaryDisabled={saving || input.trim() === ''}
          secondaryText="Cancelar"
          onSecondary={() => setEditOpen(false)}
          loading={saving}
        />
      </Dialog>
    </Box>
  );
}

export default ProductDetailHeader;
