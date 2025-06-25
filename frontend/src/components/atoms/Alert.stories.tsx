import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Button } from '@mui/material'; // Para usar en las acciones
import { Info as InfoIcon, Replay as ReplayIcon, Delete as DeleteIcon, Refresh as RefreshIcon } from '@mui/icons-material'; // Iconos para botones

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  args: { // Default args para todas las historias
    severity: 'info',
    variant: 'standard', // Reflejar los estilos mejorados para standard
    children: 'Información relevante para el usuario.',
    size: 'medium',
    hideIcon: false,
  },
  argTypes: {
    onClose: { action: 'closed', description: 'Función callback para el evento de cierre.' },
    severity: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
      description: 'La severidad de la alerta. Determina el color y el icono por defecto.',
    },
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'filled'],
      description: 'El estilo de la alerta.',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
      description: 'El tamaño de la alerta.',
    },
    hideIcon: {
      control: 'boolean',
      description: 'Si es true, el icono de severidad se oculta.'
    },
    autoHideDuration: {
      control: 'number',
      description: 'Tiempo en ms para auto-cierre. Requiere `onClose`.'
    },
    title: {
      control: 'text',
      description: 'Título opcional para la alerta.'
    },
    children: {
      control: 'text',
      description: 'Contenido principal de la alerta. Puede ser un string o ReactNode.'
    },
    actions: {
      control: false, // Deshabilitar control directo para 'actions' ya que ReactNode es complejo.
                      // Se mostrará a través de historias específicas.
      description: 'Permite añadir elementos interactivos, como botones. (Ej: <Button size="small">Acción</Button>)',
    },
    sx: {
        control: 'object',
        description: 'Prop para aplicar estilos personalizados con el sistema `sx` de MUI.'
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'El componente Alert se utiliza para mostrar mensajes importantes al usuario, con diferentes niveles de severidad y estilos. Ahora soporta acciones personalizadas y theming mejorado para modos claro/oscuro.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Alert>;

// Historias Base por Severidad (usando la variante 'standard' por defecto)
export const Info: Story = {
  name: 'Severidad: Info (Standard)',
  args: {
    severity: 'info',
    children: 'Esto es una alerta de información para el usuario.',
  }
};

export const Success: Story = {
  name: 'Severidad: Success (Standard)',
  args: {
    severity: 'success',
    children: '¡Operación completada exitosamente!'
  },
};

export const Warning: Story = {
  name: 'Severidad: Warning (Standard)',
  args: {
    severity: 'warning',
    children: 'Atención: Hay algunos detalles que debe revisar.'
  },
};

export const Error: Story = {
  name: 'Severidad: Error (Standard)',
  args: {
    severity: 'error',
    children: 'Ha ocurrido un error al procesar su solicitud.'
  },
};

// Historias por Variante
export const FilledInfo: Story = {
  name: 'Variante: Filled (Info)',
  args: {
    variant: 'filled',
    severity: 'info',
    children: 'Alerta de información con variante "filled".'
  },
};

export const OutlinedInfo: Story = {
  name: 'Variante: Outlined (Info)',
  args: {
    variant: 'outlined',
    severity: 'info',
    children: 'Alerta de información con variante "outlined".'
  },
};

// Historias de Funcionalidades Específicas
export const Closable: Story = {
  name: 'Funcionalidad: Cerrable',
  args: {
    severity: 'info',
    onClose: () => {},
    children: 'Puede descartar esta alerta haciendo clic en el icono de cierre.',
  },
};

export const WithTitle: Story = {
  name: 'Funcionalidad: Con Título',
  args: {
    severity: 'error',
    title: 'Error Inesperado',
    children: 'Ocurrió un problema al intentar guardar los cambios. Por favor, intente de nuevo.',
  },
};

export const SmallSize: Story = {
  name: 'Tamaño: Pequeño (con Título)',
  args: {
    size: 'small',
    severity: 'success',
    title: 'Éxito',
    children: 'Alerta compacta de éxito.'
  },
};

export const WithoutIcon: Story = {
  name: 'Funcionalidad: Sin Icono',
  args: {
    hideIcon: true,
    children: 'Esta alerta no muestra el icono de severidad.'
  },
};

export const AutoHide: Story = {
  name: 'Funcionalidad: Auto-Cierre',
  args: {
    onClose: () => {},
    autoHideDuration: 3000,
    children: 'Esta alerta se cerrará automáticamente después de 3 segundos.'
  },
};

// Nuevas Historias para 'actions'
export const WithSingleAction: Story = {
  name: 'Acciones: Acción Única',
  args: {
    severity: 'warning',
    title: 'Confirmación Requerida',
    children: '¿Está seguro de que desea eliminar este elemento? Esta acción no se puede deshacer.',
    actions: <Button color="inherit" size="small" startIcon={<DeleteIcon fontSize="inherit"/>} onClick={() => alert('Elemento eliminado (simulado)')}>Eliminar</Button>,
  },
};

export const WithMultipleActions: Story = {
  name: 'Acciones: Múltiples Acciones',
  args: {
    severity: 'info',
    title: 'Actualización Disponible',
    children: 'Hay una nueva versión del software disponible. ¿Desea actualizar ahora?',
    actions: (
      <>
        <Button color="inherit" size="small" onClick={() => alert('Actualizar más tarde (simulado)')}>Más tarde</Button>
        <Button color="inherit" size="small" startIcon={<RefreshIcon fontSize="inherit"/>} onClick={() => alert('Actualizando (simulado)')}>Actualizar Ahora</Button>
      </>
    ),
  },
};

export const WithActionAndClose: Story = {
  name: 'Acciones: Acción y Cierre',
  args: {
    severity: 'error',
    title: 'Error de Conexión',
    children: 'No se pudo conectar al servidor. Verifique su conexión a internet.',
    onClose: () => {},
    actions: <Button color="inherit" size="small" startIcon={<ReplayIcon fontSize="inherit"/>} onClick={() => alert('Reintentando conexión (simulado)')}>Reintentar</Button>,
  },
};

export const SmallWithAction: Story = {
  name: 'Acciones: Pequeña con Acción y Cierre',
  args: {
    size: 'small',
    severity: 'info',
    title: 'Info',
    children: 'Alerta pequeña con una acción y cierre.',
    actions: <Button color="inherit" size="small" onClick={() => alert('Acción realizada')}>Ok</Button>,
    onClose: () => {},
  },
};

export const SmallWithMultipleActions: Story = {
  name: 'Acciones: Pequeña con Múltiples Acciones',
  args: {
    size: 'small',
    severity: 'warning',
    // title: 'Atención', // Título opcional
    children: '¿Guardar cambios o descartar?',
    actions: (
      <>
        <Button color="inherit" size="small" onClick={() => alert('Descartado')}>Descartar</Button>
        <Button color="inherit" size="small" onClick={() => alert('Guardado')}>Guardar</Button>
      </>
    ),
    onClose: () => {},
  },
};
