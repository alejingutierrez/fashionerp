import { render, screen } from '@testing-library/react';
import { Label } from './Label';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Label', () => {
  it('renders text', () => {
    renderWithTheme(<Label htmlFor="name">Nombre</Label>);
    expect(screen.getByText('Nombre')).toBeInTheDocument();
  });
});
