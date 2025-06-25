import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import Box from '@mui/material/Box'; // Para agrupar avatares en historias
import { deepOrange, green, yellow, red } from '@mui/material/colors'; // Para colores de BadgeProps

const meta: Meta<typeof Avatar> = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'], // Habilita la documentación automática de props
  args: { // Default args para todas las historias, se pueden sobreescribir
    alt: 'Foto de Usuario',
    size: 'medium',
    children: 'U', // Default children si no hay src
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'URL de la imagen del avatar.',
    },
    alt: {
      control: 'text',
      description: 'Texto alternativo para la imagen.',
    },
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
      description: 'Forma del avatar.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamaño predefinido del avatar.',
    },
    children: {
      control: 'text',
      description: 'Contenido para mostrar si `src` no se provee (ej. iniciales).',
    },
    status: {
      control: 'select',
      options: [undefined, 'online', 'offline', 'away', 'busy'],
      description: 'Estado del usuario, muestra un indicador visual.',
    },
    badgeContent: {
      control: 'text', // Usar text para permitir números, strings, o 'true' para dot
      description: "Contenido del badge. Escribir 'true' (como string) para un badge de tipo punto. Si no, números o texto.",
    },
    BadgeProps: {
      control: 'object',
      description: 'Props adicionales para el componente Badge de MUI (ej. `{"color": "secondary"}`).',
    },
    sx: {
      control: 'object',
      description: 'Props SX para estilizar el MuiAvatar directamente.',
    },
  },
  parameters: {
    layout: 'centered', // Centra el componente en el canvas
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const DefaultWithImage: Story = {
  name: 'Con Imagen (Default)',
  args: {
    src: 'https://i.pravatar.cc/64?img=3', // Imagen de 64px para el tamaño medium/large
  },
};

export const Initials: Story = {
  name: 'Con Iniciales',
  args: {
    src: undefined, // Asegurar que no haya imagen
    children: 'JD',
  },
};

export const GenericIcon: Story = {
  name: 'Con Icono Genérico (Fallback)',
  args: {
    src: undefined,
    children: undefined,
  },
};

export const Sizes: Story = {
  name: 'Diferentes Tamaños',
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Avatar {...args} src="https://i.pravatar.cc/32?img=1" size="small">S</Avatar>
      <Avatar {...args} src="https://i.pravatar.cc/40?img=2" size="medium">M</Avatar>
      <Avatar {...args} src="https://i.pravatar.cc/64?img=3" size="large">L</Avatar>
    </Box>
  ),
  args: {
    src: undefined, // Para que muestre children si la imagen falla
    children: undefined, // Para que pruebe el fallback a icono si es necesario
  }
};

export const Variants: Story = {
  name: 'Diferentes Variantes (Formas)',
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Avatar {...args} variant="circular">C</Avatar>
      <Avatar {...args} variant="rounded">R</Avatar>
      <Avatar {...args} variant="square">S</Avatar>
    </Box>
  ),
  args: {
    src: 'https://i.pravatar.cc/40?img=4',
    children: 'V', // Por si la imagen falla
  }
};


export const WithStatusIndicators: Story = {
  name: 'Con Indicadores de Estado',
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      <Avatar {...args} src="https://i.pravatar.cc/40?img=5" status="online" />
      <Avatar {...args} src="https://i.pravatar.cc/40?img=6" status="away" />
      <Avatar {...args} children="OF" status="offline" />
      <Avatar {...args} children="BS" status="busy" />
      <Avatar {...args} children="NE" /> {/* Sin estado */}
    </Box>
  ),
  args: {
    size: 'medium',
    children: undefined, // Para que el src tenga prioridad
  }
};

export const WithBadges: Story = {
  name: 'Con Badges de Notificación',
  render: (args) => (
    <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      <Avatar {...args} src="https://i.pravatar.cc/40?img=7" badgeContent={true} />
      <Avatar {...args} src="https://i.pravatar.cc/40?img=8" badgeContent={5} />
      <Avatar {...args} children="NB" badgeContent="99+" BadgeProps={{ color: 'secondary' }}/>
      <Avatar {...args} children="ER" badgeContent={1} BadgeProps={{ color: 'error' }}/>
      <Avatar
        {...args}
        children="CS"
        badgeContent={'C!'}
        BadgeProps={{
          sx: {
            '& .MuiBadge-badge': {
              backgroundColor: deepOrange[500],
              color: 'white',
              border: `1px solid ${yellow[500]}`
            }
          }
        }}
      />
    </Box>
  ),
  args: {
    size: 'medium',
    children: undefined, // Para que el src tenga prioridad
  }
};

export const KitchenSink: Story = {
  name: 'Ejemplo Complejo (Kitchen Sink)',
  args: {
    size: 'large',
    src: 'https://i.pravatar.cc/64?img=9',
    children: 'KS', // Fallback si la imagen no carga
    variant: 'rounded',
    status: 'online',
    badgeContent: '3',
    BadgeProps: {
      color: 'primary',
      // Podríamos añadir más sx aquí para el badge si es necesario
    },
    sx: { // Estilo directo al MuiAvatar
      border: `3px solid ${green[500]}`, // Ejemplo de un borde adicional llamativo
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    }
  },
};


// Historia para demostrar el control de BadgeProps, especialmente el color.
export const CustomizableBadge: Story = {
  name: 'Badge Personalizable',
  args: {
    src: undefined,
    children: 'CB',
    size: 'large',
    badgeContent: '!',
    BadgeProps: { // Valores por defecto para los controles de esta historia
      color: 'primary',
      // max: 99, // Otra prop de Badge
    }
  },
  // argTypes específicos para esta historia si queremos refinar los controles de BadgeProps
  // Pero generalmente los argTypes globales son suficientes.
};
