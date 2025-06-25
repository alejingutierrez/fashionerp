import { render, screen } from '@testing-library/react';
import { Avatar, AvatarProps } from './Avatar';
import { AppThemeProvider } from '../../theme'; // Usar el nuevo AppThemeProvider
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import defaultThemeOptions from '../../theme'; // Para acceder a las paletas light/dark
import { STATUS_COLOR_MAP } from './Avatar'; // Importar STATUS_COLOR_MAP si es necesario acceder a sus keys o valores directamente
                                          // Sin embargo, es mejor obtener los colores del tema renderizado.

// Helper para renderizar con AppThemeProvider (que maneja el contexto de cambio de modo)
const renderWithAppTheme = (ui: React.ReactElement) => {
  return render(<AppThemeProvider>{ui}</AppThemeProvider>);
};

// Helper para renderizar con un tema específico (light o dark) para pruebas de estilo
// Accedemos a las configuraciones de paleta directamente para crear temas específicos.
// Esto es una simplificación. Idealmente, theme/index.tsx exportaría getTheme(mode).
// Por ahora, recreamos la lógica básica de creación de tema aquí para light y dark.

// NOTA: Para acceder a las paletas lightPalette y darkPalette y commonThemeOptions,
// necesitaríamos exportarlas desde theme/index.tsx.
// Como no están exportadas, vamos a mockear una estructura de tema simple para probar
// los colores que se definieron en STATUS_COLOR_MAP y los colores de MuiAvatar.
// Esto es menos ideal que probar con los temas reales.

// Alternativa: Modificar theme/index.tsx para exportar getThemeConfig(mode)
// Por ahora, vamos a usar AppThemeProvider y confiar en que el tema se aplica.
// Para pruebas específicas de color, se necesitaría un setup más complejo o exportaciones adicionales.

// Simulación de colores del tema para pruebas (ya que no se exportan directamente las paletas)
const mockLightTheme = createTheme({ palette: { mode: 'light', success: { main: '#2a9d8f' }, grey: { '400': '#bdbdbd' }, warning: { main: '#e9c46a' }, error: { main: '#780000' }, background: { paper: '#ffffff' }, primary: { main: '#c1121f', contrastText: '#fdf0d5' } } });
const mockDarkTheme = createTheme({ palette: { mode: 'dark', success: { main: '#4caf50' }, grey: { '400': '#757575' }, warning: { main: '#ffa726' }, error: { main: '#d32f2f' }, background: { paper: '#1e1e1e' }, secondary: { main: '#82a5c4', contrastText: '#001f32' } } });


function getExpectedStatusColor(status: keyof typeof STATUS_COLOR_MAP, theme: ReturnType<typeof createTheme>) {
  switch (status) {
    case 'online': return theme.palette.success.main;
    case 'offline': return theme.palette.grey[400];
    case 'away': return theme.palette.warning.main;
    case 'busy': return theme.palette.error.main;
    default: return '';
  }
}


describe('Avatar', () => {
  it('renders image with alt text', () => {
    renderWithAppTheme(<Avatar src="avatar.png" alt="Foto de Juan" />);
    const img = screen.getByRole('img', { name: /foto de juan/i });
    expect(img).toHaveAttribute('src', 'avatar.png');
  });

  it('renders initials when no image', () => {
    renderWithAppTheme(<Avatar>JP</Avatar>);
    expect(screen.getByText('JP')).toBeInTheDocument();
  });

  it('renders MUI PersonIcon when no src or children', () => {
    const { container } = renderWithAppTheme(<Avatar />);
    // MuiAvatar usa un SVG para el PersonIcon. Buscamos por el data-testid que MUI suele añadir.
    // O podemos buscar por el título/rol si está disponible.
    // Si MUI no añade un testid predecible, podemos buscar la clase del icono.
    // En MUI v5, el icono de persona tiene la clase 'MuiSvgIcon-root' y un path específico.
    // Esta prueba es un poco frágil porque depende de la implementación interna de MuiAvatar.
    const svgIcon = container.querySelector('svg[data-testid="PersonIcon"]'); // MUI suele usar este testid
    expect(svgIcon).toBeInTheDocument();
  });


  it('applies variant class', () => {
    // El wrapper Box ahora es el primer hijo. El MuiAvatar es el primer hijo de ese Box.
    const { container } = renderWithAppTheme(<Avatar variant="rounded">JP</Avatar>);
    const avatarRoot = container.querySelector('.MuiAvatar-root');
    expect(avatarRoot).toHaveClass('MuiAvatar-rounded');
  });

  it('applies size styles to the wrapper and avatar', () => {
    const { container } = renderWithAppTheme(<Avatar size="large">JP</Avatar>);
    const wrapperBox = container.firstChild as HTMLElement; // El Box que envuelve todo
    expect(wrapperBox).toHaveStyle({ width: '64px', height: '64px' });
    const avatarMui = wrapperBox.querySelector('.MuiAvatar-root') as HTMLElement;
    expect(avatarMui).toHaveStyle({ width: '64px', height: '64px' });
  });

  // Pruebas para el indicador de Status
  (['online', 'offline', 'away', 'busy'] as const).forEach((status) => {
    it(`renders status indicator for status "${status}" in light theme`, () => {
      render( // Render con MuiThemeProvider y tema mockeado para probar color específico
        <MuiThemeProvider theme={mockLightTheme}>
          <Avatar status={status}>S</Avatar>
        </MuiThemeProvider>
      );
      const statusIndicator = screen.getByTitle(`Status: ${status}`);
      expect(statusIndicator).toBeInTheDocument();
      expect(statusIndicator).toHaveStyle({
        backgroundColor: getExpectedStatusColor(status, mockLightTheme),
        borderColor: mockLightTheme.palette.background.paper, // Verificar borde
      });
      // Podríamos también verificar tamaño y posición si es crítico, pero puede ser frágil.
    });

    it(`renders status indicator for status "${status}" in dark theme`, () => {
      render(
        <MuiThemeProvider theme={mockDarkTheme}>
          <Avatar status={status}>S</Avatar>
        </MuiThemeProvider>
      );
      const statusIndicator = screen.getByTitle(`Status: ${status}`);
      expect(statusIndicator).toBeInTheDocument();
      expect(statusIndicator).toHaveStyle({
        backgroundColor: getExpectedStatusColor(status, mockDarkTheme),
        borderColor: mockDarkTheme.palette.background.paper,
      });
    });
  });

  it('does not render status indicator if status prop is not provided', () => {
    renderWithAppTheme(<Avatar>S</Avatar>);
    expect(screen.queryByTitle(/Status:/)).not.toBeInTheDocument();
  });

  // Pruebas para Badge
  it('renders dot badge when badgeContent is true', () => {
    const { container } = renderWithAppTheme(<Avatar badgeContent={true}>BD</Avatar>);
    const badge = container.querySelector('.MuiBadge-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('MuiBadge-dot');
  });

  it('renders standard badge with content', () => {
    renderWithAppTheme(<Avatar badgeContent={5}>NB</Avatar>);
    const badge = screen.getByText('5'); // El contenido del badge
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('MuiBadge-badge'); // Clase base del badge
    expect(badge.parentElement).toHaveClass('MuiBadge-standard'); // Variante standard
  });

  it('does not render badge if badgeContent is not provided', () => {
    const { container } = renderWithAppTheme(<Avatar>NB</Avatar>);
    expect(container.querySelector('.MuiBadge-badge')).not.toBeInTheDocument();
  });

  it('applies BadgeProps to the Badge component', () => {
    const { container } = renderWithAppTheme(
      <Avatar badgeContent={1} BadgeProps={{ color: 'secondary', 'data-testid': 'custom-badge' }}>
        BP
      </Avatar>
    );
    const badge = screen.getByTestId('custom-badge');
    expect(badge).toBeInTheDocument();
    // MUI aplica clases como MuiBadge-colorSecondary
    expect(badge).toHaveClass('MuiBadge-colorSecondary');
  });

  // Prueba de estilos de colorDefault (iniciales) con temas
  // Esta prueba es más una verificación de que los overrides del tema se aplican.
  it('applies correct colorDefault styles for initials in light theme', () => {
    const { getByText } = render(<MuiThemeProvider theme={mockLightTheme}><Avatar>LI</Avatar></MuiThemeProvider>);
    const avatar = getByText('LI');
    expect(avatar).toHaveStyle({
      backgroundColor: mockLightTheme.palette.primary.main, // colorDefault light
      color: mockLightTheme.palette.primary.contrastText,
    });
  });

  it('applies correct colorDefault styles for initials in dark theme', () => {
    const { getByText } = render(<MuiThemeProvider theme={mockDarkTheme}><Avatar>DI</Avatar></MuiThemeProvider>);
    const avatar = getByText('DI');
    expect(avatar).toHaveStyle({
      backgroundColor: mockDarkTheme.palette.secondary.main, // colorDefault dark
      color: mockDarkTheme.palette.secondary.contrastText,
    });
  });

});
