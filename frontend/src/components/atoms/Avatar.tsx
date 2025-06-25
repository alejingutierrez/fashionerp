import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Badge, { BadgeProps } from '@mui/material/Badge'; // Importar Badge
import { useTheme } from '@mui/material/styles';

const SIZE_MAP = {
  small: 32,
  medium: 40,
  large: 64,
} as const;

const STATUS_COLOR_MAP = {
  online: 'success.main',
  offline: 'grey.400', // Podría ser neutral.main o un gris específico
  away: 'warning.main',
  busy: 'error.main',
} as const;

import React from 'react'; // Necesario para ReactNode

export interface AvatarProps extends MuiAvatarProps {
  /** Tamaño predefinido del avatar. */
  size?: keyof typeof SIZE_MAP;
  /** Estado del usuario, muestra un indicador visual. */
  status?: keyof typeof STATUS_COLOR_MAP;
  /** Contenido del badge (ej. número de notificaciones). `true` para un punto. */
  badgeContent?: React.ReactNode;
  /** Props adicionales para el componente Badge de MUI. */
  BadgeProps?: Partial<BadgeProps>;
}

/**
 * Muestra la imagen o iniciales de un usuario en forma circular por defecto.
 * Puede incluir un indicador de estado y un badge de notificación.
 */
export function Avatar({
  size = 'medium',
  sx,
  status,
  badgeContent,
  BadgeProps: badgePropsFromProp, // Renombrar para evitar colisión
  ...props
}: AvatarProps) {
  const theme = useTheme();
  const dimension = SIZE_MAP[size];

  const avatarSx = {
    width: dimension,
    height: dimension,
    fontSize: dimension * 0.5,
    ...sx,
  };

  const statusIndicatorSize = dimension * 0.25;
  const statusIndicatorBorderSize = Math.max(1, dimension * 0.05);

  const avatarComponent = (
    <MuiAvatar sx={avatarSx} {...props} />
  );

  // El Box que contiene el Avatar y potencialmente el indicador de estado
  const avatarWithStatus = (
    <Box
      sx={{
        position: 'relative', // Necesario para el indicador de status
        width: dimension,
        height: dimension,
        // display: 'inline-flex', // No es necesario aquí si Badge lo gestiona
      }}
    >
      {avatarComponent}
      {status && (
        <Box
          component="span"
          sx={{
            position: 'absolute', // Relativo al Box contenedor
            right: 0,
            bottom: 0,
            width: statusIndicatorSize,
            height: statusIndicatorSize,
            borderRadius: '50%',
            backgroundColor: STATUS_COLOR_MAP[status] || 'transparent', // Color del estado
            border: `${statusIndicatorBorderSize}px solid ${theme.palette.background.paper}`, // Borde blanco/papel crucial
            // Sutil boxShadow para dar profundidad al indicador
            boxShadow: theme.palette.mode === 'dark'
              ? `0 0 0 1px ${STATUS_COLOR_MAP[status]}, 0px 1px 2px 1px rgba(0,0,0,0.5)` // Sombra más oscura para resaltar en fondo oscuro
              : `0 0 0 1px ${STATUS_COLOR_MAP[status]}, 0px 1px 2px 0px rgba(0,0,0,0.3)`, // Sombra estándar para fondo claro
            boxSizing: 'border-box',
            zIndex: 1, // Asegurar que esté sobre el avatar
          }}
          title={`Status: ${status}`}
        />
      )}
    </Box>
  );

  // Si hay badgeContent, envolvemos el avatar (con o sin status) con Badge
  if (badgeContent !== undefined) {
    const isDot = badgeContent === true;
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        variant={isDot ? 'dot' : 'standard'}
        badgeContent={isDot ? undefined : badgeContent}
        sx={{
          // Ajustes para el tamaño del punto del badge si es necesario, o para el badge en general
          ...(isDot && { // Estilos específicos para el badge tipo 'dot'
            '& .MuiBadge-dot': {
              width: statusIndicatorSize, // Mismo tamaño que el status indicator
              height: statusIndicatorSize,
              borderRadius: '50%',
              border: `${statusIndicatorBorderSize}px solid ${theme.palette.background.paper}`,
              // Aplicar un boxShadow similar al del status dot
              // El color del badge (backgroundColor) es manejado por MUI Badge (suele ser 'primary').
              // El boxShadow aquí usa el color del badge (si se pudiera obtener) o un color de fallback.
              // Por ahora, asumimos que el color del dot es 'primary' para el shadow.
              // Si BadgeProps.color cambia el color del dot, este shadow no se adaptará.
              boxShadow: theme.palette.mode === 'dark'
                ? `0 0 0 1px ${(badgePropsFromProp?.color && theme.palette[badgePropsFromProp.color as keyof typeof theme.palette]?.main) || theme.palette.primary.main}, 0px 1px 2px 1px rgba(0,0,0,0.5)`
                : `0 0 0 1px ${(badgePropsFromProp?.color && theme.palette[badgePropsFromProp.color as keyof typeof theme.palette]?.main) || theme.palette.primary.main}, 0px 1px 2px 0px rgba(0,0,0,0.3)`,
            },
          }),
          // Permitir que el color del badge se configure a través de BadgeProps o el tema
        }}
        {...badgePropsFromProp} // Aplicar props personalizadas para Badge
      >
        {avatarWithStatus}
      </Badge>
    );
  }

  // Si no hay badge, devolvemos solo el avatar con o sin status
  return avatarWithStatus;
}

export default Avatar;
