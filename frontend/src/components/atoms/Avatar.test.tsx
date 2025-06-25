import { render, screen } from '@testing-library/react';
import { Avatar, AvatarProps, STATUS_COLOR_MAP } from './Avatar'; // Import STATUS_COLOR_MAP
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { lightPalette, darkPalette, commonThemeOptions, getComponentOverrides } from '../../theme/index';

// Crear temas completos para light y dark mode para usar en las pruebas
const testLightTheme: Theme = createTheme({
  ...commonThemeOptions,
  palette: lightPalette,
  components: getComponentOverrides('light'),
});

const testDarkTheme: Theme = createTheme({
  ...commonThemeOptions,
  palette: darkPalette,
  components: getComponentOverrides('dark'),
});

// Helper para renderizar con un tema específico
const renderWithTheme = (ui: React.ReactElement, theme: Theme) => {
  return render(<MuiThemeProvider theme={theme}>{ui}</MuiThemeProvider>);
};

// Helper para obtener el color de estado esperado de la paleta del tema
function getExpectedStatusPaletteColor(statusKey: keyof typeof STATUS_COLOR_MAP, theme: Theme): string {
  const colorPath = STATUS_COLOR_MAP[statusKey]; // e.g., "success.main" or "grey.400"
  const pathParts = colorPath.split('.'); // ["success", "main"] or ["grey", "400"]

  let colorValue: any = theme.palette;
  for (const part of pathParts) {
    if (colorValue && typeof colorValue === 'object' && part in colorValue) {
      colorValue = colorValue[part];
    } else {
      return ''; // Color path not found in theme
    }
  }
  return typeof colorValue === 'string' ? colorValue : '';
}


describe('Avatar', () => {
  // Pruebas básicas de renderizado (no dependen del tema complejo)
  it('renders image with alt text', () => {
    // Se puede usar cualquier tema aquí, o incluso sin ThemeProvider si el componente no lo requiere estrictamente para esto
    renderWithTheme(<Avatar src="avatar.png" alt="Foto de Juan" />, testLightTheme);
    const img = screen.getByRole('img', { name: /foto de juan/i });
    expect(img).toHaveAttribute('src', 'avatar.png');
  });

  it('renders initials when no image', () => {
    renderWithTheme(<Avatar>JP</Avatar>, testLightTheme);
    expect(screen.getByText('JP')).toBeInTheDocument();
  });

  it('renders MUI PersonIcon when no src or children', () => {
    const { container } = renderWithTheme(<Avatar />, testLightTheme);
    const svgIcon = container.querySelector('svg[data-testid="PersonIcon"]');
    expect(svgIcon).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = renderWithTheme(<Avatar variant="rounded">JP</Avatar>, testLightTheme);
    const avatarRoot = container.querySelector('.MuiAvatar-root');
    expect(avatarRoot).toHaveClass('MuiAvatar-rounded');
  });

  it('applies size styles to the wrapper and avatar', () => {
    const { container } = renderWithTheme(<Avatar size="large">JP</Avatar>, testLightTheme);
    const wrapperBox = container.firstChild as HTMLElement;
    expect(wrapperBox).toHaveStyle({ width: '64px', height: '64px' });
    const avatarMui = wrapperBox.querySelector('.MuiAvatar-root') as HTMLElement;
    expect(avatarMui).toHaveStyle({ width: '64px', height: '64px' });
  });

  // Pruebas de estilos aplicados por el tema
  it('applies theme boxShadow to MuiAvatar in light theme', () => {
    const { container } = renderWithTheme(<Avatar>LT</Avatar>, testLightTheme);
    const avatarMui = container.querySelector('.MuiAvatar-root');
    expect(avatarMui).toHaveStyle({
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 1px 10px 0px rgba(0,0,0,0.06)',
    });
  });

  it('applies theme boxShadow to MuiAvatar in dark theme', () => {
    const { container } = renderWithTheme(<Avatar>DT</Avatar>, testDarkTheme);
    const avatarMui = container.querySelector('.MuiAvatar-root');
    expect(avatarMui).toHaveStyle({
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    });
  });


  // Pruebas para el indicador de Status con estilos de tema
  (['online', 'offline', 'away', 'busy'] as const).forEach((status) => {
    it(`renders status indicator with correct styles for status "${status}" in light theme`, () => {
      renderWithTheme(<Avatar status={status}>S</Avatar>, testLightTheme);
      const statusIndicator = screen.getByTitle(`Status: ${status}`);
      const expectedColor = getExpectedStatusPaletteColor(status, testLightTheme);
      expect(statusIndicator).toHaveStyle({
        backgroundColor: expectedColor,
        borderColor: testLightTheme.palette.background.paper,
        boxShadow: `0 0 0 1px ${expectedColor}, 0px 1px 2px 0px rgba(0,0,0,0.3)`,
      });
    });

    it(`renders status indicator with correct styles for status "${status}" in dark theme`, () => {
      renderWithTheme(<Avatar status={status}>S</Avatar>, testDarkTheme);
      const statusIndicator = screen.getByTitle(`Status: ${status}`);
      const expectedColor = getExpectedStatusPaletteColor(status, testDarkTheme);
      expect(statusIndicator).toHaveStyle({
        backgroundColor: expectedColor,
        borderColor: testDarkTheme.palette.background.paper,
        boxShadow: `0 0 0 1px ${expectedColor}, 0px 1px 2px 1px rgba(0,0,0,0.5)`,
      });
    });
  });

  it('does not render status indicator if status prop is not provided', () => {
    renderWithTheme(<Avatar>S</Avatar>, testLightTheme); // El tema no debería afectar esto
    expect(screen.queryByTitle(/Status:/)).not.toBeInTheDocument();
  });

  // Pruebas para Badge con estilos de tema
  it('renders dot badge with correct styles in light theme', () => {
    const { container } = renderWithTheme(<Avatar badgeContent={true}>BD</Avatar>, testLightTheme);
    const badgeDot = container.querySelector('.MuiBadge-dot');
    expect(badgeDot).toBeInTheDocument();
    expect(badgeDot).toHaveClass('MuiBadge-dot'); // Asegurar que es un dot
    expect(badgeDot).toHaveStyle({
      borderColor: testLightTheme.palette.background.paper,
      boxShadow: `0 0 0 1px ${testLightTheme.palette.primary.main}, 0px 1px 2px 0px rgba(0,0,0,0.3)`,
    });
  });

  it('renders dot badge with correct styles in dark theme', () => {
    const { container } = renderWithTheme(<Avatar badgeContent={true}>BD</Avatar>, testDarkTheme);
    const badgeDot = container.querySelector('.MuiBadge-dot');
    expect(badgeDot).toBeInTheDocument();
    expect(badgeDot).toHaveClass('MuiBadge-dot');
    expect(badgeDot).toHaveStyle({
      borderColor: testDarkTheme.palette.background.paper,
      boxShadow: `0 0 0 1px ${testDarkTheme.palette.primary.main}, 0px 1px 2px 1px rgba(0,0,0,0.5)`,
    });
  });

  it('renders dot badge with error color and correct styles in light theme', () => {
    const { container } = renderWithTheme(
      <Avatar badgeContent={true} BadgeProps={{ color: 'error' }}>BD</Avatar>,
      testLightTheme
    );
    const badgeDot = container.querySelector('.MuiBadge-dot'); // El elemento con la clase .MuiBadge-dot
    expect(badgeDot).toBeInTheDocument();
    // MUI aplica el color 'error' al backgroundColor del dot.
    // El boxShadow que añadimos debería usar theme.palette.error.main para el borde del shadow.
    expect(badgeDot).toHaveStyle({
      backgroundColor: testLightTheme.palette.error.main, // Verificación del color base del dot
      borderColor: testLightTheme.palette.background.paper,
      boxShadow: `0 0 0 1px ${testLightTheme.palette.error.main}, 0px 1px 2px 0px rgba(0,0,0,0.3)`,
    });
  });

  it('renders dot badge with error color and correct styles in dark theme', () => {
    const { container } = renderWithTheme(
      <Avatar badgeContent={true} BadgeProps={{ color: 'error' }}>BD</Avatar>,
      testDarkTheme
    );
    const badgeDot = container.querySelector('.MuiBadge-dot');
    expect(badgeDot).toBeInTheDocument();
    expect(badgeDot).toHaveStyle({
      backgroundColor: testDarkTheme.palette.error.main,
      borderColor: testDarkTheme.palette.background.paper,
      boxShadow: `0 0 0 1px ${testDarkTheme.palette.error.main}, 0px 1px 2px 1px rgba(0,0,0,0.5)`,
    });
  });


  it('renders standard badge with content', () => {
    renderWithTheme(<Avatar badgeContent={5}>NB</Avatar>, testLightTheme);
    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('MuiBadge-badge');
    expect(badge.parentElement).toHaveClass('MuiBadge-standard');
  });

  it('does not render badge if badgeContent is not provided', () => {
    const { container } = renderWithTheme(<Avatar>NB</Avatar>, testLightTheme);
    expect(container.querySelector('.MuiBadge-badge')).not.toBeInTheDocument();
  });

  it('applies BadgeProps to the Badge component', () => {
    renderWithTheme(
      <Avatar badgeContent={1} BadgeProps={{ color: 'secondary', 'data-testid': 'custom-badge' }}>BP</Avatar>,
      testLightTheme
    );
    const badge = screen.getByTestId('custom-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('MuiBadge-colorSecondary');
  });

  // Pruebas de estilos de colorDefault (iniciales) con temas reales
  it('applies correct colorDefault styles for initials in light theme', () => {
    const { getByText } = renderWithTheme(<Avatar>LI</Avatar>, testLightTheme);
    const avatar = getByText('LI');
    expect(avatar).toHaveStyle({
      backgroundColor: testLightTheme.palette.primary.main,
      color: testLightTheme.palette.primary.contrastText,
    });
  });

  it('applies correct colorDefault styles for initials in dark theme', () => {
    const { getByText } = renderWithTheme(<Avatar>DI</Avatar>, testDarkTheme);
    const avatar = getByText('DI');
    expect(avatar).toHaveStyle({
      backgroundColor: testDarkTheme.palette.secondary.main,
      color: testDarkTheme.palette.secondary.contrastText,
    });
  });
});
