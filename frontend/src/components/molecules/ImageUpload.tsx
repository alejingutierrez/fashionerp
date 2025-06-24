import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { Avatar, ProgressSpinner, Snackbar, Badge } from '../atoms';

export interface ImageUploadProps {
  /** URL de la imagen cargada */
  value?: string;
  /** Llamada que sube el archivo y devuelve la URL final */
  uploadFn?: (file: File) => Promise<string>;
  /** Peso máximo en bytes */
  maxSize?: number;
  /** Tipos MIME permitidos */
  mimeTypes?: string[];
  /** Callback cuando la carga finaliza exitosamente */
  onChange?: (url: string) => void;
  /** Variante de visualización */
  variant?: 'dropzone' | 'icon';
  /** Dimensión del contenedor */
  size?: number;
  /** Muestra vista previa cuando existe una imagen */
  showPreview?: boolean;
}

type Status = 'idle' | 'dragging' | 'uploading' | 'success' | 'error';

export function ImageUpload({
  value,
  uploadFn = async (file) => URL.createObjectURL(file),
  maxSize = 5 * 1024 * 1024,
  mimeTypes = ['image/jpeg', 'image/png'],
  onChange,
  variant = 'dropzone',
  size = 128,
  showPreview = true,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [preview, setPreview] = useState<string | undefined>(
    showPreview ? value : undefined,
  );
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const resetDrag = () => setStatus((s) => (s === 'dragging' ? 'idle' : s));

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.size > maxSize || !mimeTypes.includes(file.type)) {
      setStatus('error');
      setSnackbar({ open: true, message: 'Formato o tamaño inválido' });
      return;
    }
    setPreview(URL.createObjectURL(file));
    setStatus('uploading');
    try {
      const url = await uploadFn(file);
      setPreview(url);
      setStatus('success');
      setSnackbar({ open: true, message: 'Imagen subida' });
      onChange?.(url);
    } catch {
      setStatus('error');
      setSnackbar({ open: true, message: 'Error al subir imagen' });
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    resetDrag();
    handleFiles(e.dataTransfer.files);
  };

  const openFile = () => inputRef.current?.click();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const dimension = size;
  const borderColor =
    status === 'dragging'
      ? 'info.main'
      : status === 'error'
        ? 'error.main'
        : 'grey.400';

  return (
    <Box position="relative" width={dimension} height={dimension}>
      {variant === 'dropzone' ? (
        <Box
          component="div"
          onClick={openFile}
          onDragOver={(e) => {
            e.preventDefault();
            setStatus('dragging');
          }}
          onDragLeave={resetDrag}
          onDrop={onDrop}
          sx={{
            width: dimension,
            height: dimension,
            border: '2px dashed',
            borderColor,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            cursor: 'pointer',
            bgcolor: 'grey.100',
          }}
          data-testid="dropzone"
          data-error={status === 'error'}
        >
          {showPreview && preview ? (
            <Avatar src={preview} variant="rounded" sx={{ width: dimension, height: dimension }} />
          ) : (
            <Avatar sx={{ width: dimension, height: dimension, bgcolor: 'grey.300' }}>
              <CloudUploadIcon fontSize="large" />
            </Avatar>
          )}
          {status === 'uploading' && (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bgcolor="rgba(255,255,255,0.7)"
            >
              <ProgressSpinner />
            </Box>
          )}
          {status === 'dragging' && (
            <Box
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              bgcolor="rgba(255,255,255,0.7)"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography>Haz clic o arrastra</Typography>
            </Box>
          )}
          {status === 'error' && (
            <Badge
              content=""
              color="error"
              variant="dot"
              sx={{ position: 'absolute', top: 4, right: 4 }}
            >
              <span />
            </Badge>
          )}
        </Box>
      ) : (
        <Box
          onClick={openFile}
          sx={{
            width: dimension,
            height: dimension,
            borderRadius: '50%',
            bgcolor: 'grey.200',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          data-testid="upload-button"
        >
          {status === 'uploading' ? <ProgressSpinner size={20} /> : <CloudUploadIcon />}
        </Box>
      )}
      <input
        type="file"
        hidden
        ref={inputRef}
        onChange={onInputChange}
        accept={mimeTypes.join(',')}
        data-testid="file-input"
      />
      <Snackbar
        message={snackbar.message}
        open={snackbar.open}
        onClose={() => setSnackbar({ open: false, message: '' })}
      />
    </Box>
  );
}

export default ImageUpload;
