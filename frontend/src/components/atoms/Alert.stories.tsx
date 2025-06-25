import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import Button from '@mui/material/Button';
import { Alert, AlertProps } from './Alert';
import { useState } from 'react';
import Box from '@mui/material/Box';

const meta: Meta<typeof Alert> = {
  title: 'Atoms/Alert',
  component: Alert,
  args: {
    open: true, // Default para la nueva prop
    severity: 'info',
    children: 'Información relevante para el usuario.',
    size: 'medium',
    variant: 'filled', // Cambiado para mostrar el estilo más común primero
  },
  argTypes: {
    open: { control: 'boolean', description: 'Controla la visibilidad para animaciones.' },
    onClose: { action: 'closed', description: 'Callback al cerrar. Necesario para el botón de cierre.' },
    severity: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
    },
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'filled'],
    },
    size: {
      control: 'radio',
      options: ['small', 'medium'],
    },
    hideIcon: { control: 'boolean' },
    autoHideDuration: { control: 'number' },
    title: { control: 'text', description: 'Título opcional mostrado en negrita.' },
    message: { control: 'text', description: 'Texto principal si no se usan children. Sobrescribe a children si ambos están presentes en el componente real (pero en Storybook, priorizar children si se edita).' },
    children: { control: 'text', description: 'Contenido principal de la alerta (ReactNode). Usualmente preferido sobre message.' },
    action: {
      control: false, // ReactNode, no hay un control simple
      description: 'Permite añadir acciones personalizadas (ej. botones).',
    },
    elevation: {
      control: { type: 'number', min: 0, max: 24, step: 1 },
      description: 'Controla el nivel de sombra del componente (0-24). Si no se define, usa defaults de la variante.',
    }
  },
  parameters: {
    docs: {
      description: {
        component: 'El componente Alert ha sido mejorado para soportar modo claro/oscuro, con estilos visuales refinados (sombras, bordes), y animaciones sutiles de entrada/salida.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    severity: 'info',
    children: 'Esto es una alerta de información (variante filled por defecto).',
  },
};

export const Success: Story = {
  args: {
    severity: 'success',
    children: 'Operación completada exitosamente.',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    children: 'Atención: Por favor revise la información ingresada.',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    children: 'Ha ocurrido un error procesando su solicitud.',
  },
};

export const StandardVariantWithImprovements: Story = {
  name: 'Standard Variant (Mejorada)',
  args: {
    variant: 'standard',
    severity: 'info',
    children: 'Esta es una alerta "standard" con borde izquierdo y sombra.',
    title: 'Estándar Mejorada',
  },
};

export const OutlinedVariant: Story = {
  name: 'Outlined Variant',
  args: {
    variant: 'outlined',
    severity: 'success',
    children: 'Esta es una alerta "outlined".',
    title: 'Bordeada',
  },
};


export const Closable: Story = {
  args: {
    severity: 'info',
    onClose: () => {}, // La acción 'closed' se logueará en el panel de acciones de Storybook
    children: 'Puede descartar esta alerta haciendo clic en el icono de cierre.',
    title: 'Alerta Cerrable',
  },
};

export const WithTitle: Story = {
  args: {
    severity: 'error',
    variant: 'filled',
    title: 'Error Grave',
    children: 'Ocurrió un problema crítico al intentar guardar los datos. Por favor, contacte a soporte.',
  },
};

export const SmallSize: Story = {
  name: 'Tamaño Pequeño (Small)',
  args: {
    size: 'small',
    severity: 'warning',
    children: 'Alerta compacta para notificaciones menos intrusivas.',
    title: 'Pequeña Advertencia',
  },
};

export const WithoutIcon: Story = {
  args: {
    hideIcon: true,
    severity: 'info',
    children: 'Alerta informativa sin icono.',
  },
};

export const AutoHide: Story = {
  args: {
    onClose: () => {}, // Necesario para autoHideDuration
    autoHideDuration: 3000,
    children: 'Esta alerta se cerrará automáticamente después de 3 segundos.',
    title: 'Cierre Automático',
  },
};

export const WithAction: Story = {
  args: {
    severity: 'warning',
    children: 'Se ha eliminado un elemento de forma permanente.',
    action: (
      <Button color="inherit" size="small" onClick={() => alert('Acción Deshacer Clickeada!')}>
        DESHACER
      </Button>
    ),
    onClose: () => {},
    title: 'Acción Requerida',
  },
};

// Historia para demostrar la animación con la prop `open`
export const AnimatedAlert: StoryFn<AlertProps> = (args) => {
  const [open, setOpen] = useState(true);
  return (
    <Box>
      <Button variant="outlined" onClick={() => setOpen(!open)} sx={{ mb: 2 }}>
        {open ? 'Ocultar' : 'Mostrar'} Alerta
      </Button>
      <Alert {...args} open={open} onClose={() => setOpen(false)}>
        {args.children || 'Esta alerta aparece y desaparece con animación.'}
      </Alert>
    </Box>
  );
};
AnimatedAlert.args = {
  severity: 'success',
  title: 'Alerta Animada',
  // No pasar 'open' aquí, es controlado por el estado de la historia
};
AnimatedAlert.argTypes = {
  open: { control: false }, // Deshabilitar control para 'open' ya que se maneja internamente
  children: { control: 'text' },
};

export const FilledWithoutShadow: Story = {
  name: 'Filled (Sin Sombra - elevation 0)',
  args: {
    variant: 'filled',
    severity: 'success',
    children: 'Alerta "filled" sin sombra explícita (elevation={0}).',
    elevation: 0,
  },
};

export const StandardWithHighElevation: Story = {
  name: 'Standard (Elevación Alta - elevation 8)',
  args: {
    variant: 'standard',
    severity: 'info',
    children: 'Alerta "standard" con una sombra más pronunciada (elevation={8}).',
    elevation: 8,
    title: 'Standard Elevada',
  },
};

export const OutlinedWithShadow: Story = {
  name: 'Outlined (Con Sombra - elevation 1)',
  args: {
    variant: 'outlined',
    severity: 'warning',
    children: 'Alerta "outlined" a la que se le ha aplicado una sombra (elevation={1}).',
    elevation: 1,
    title: 'Outlined con Sombra',
  },
};
