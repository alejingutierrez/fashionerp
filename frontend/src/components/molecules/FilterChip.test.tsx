import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { FilterChip } from './FilterChip';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('FilterChip', () => {
  it('renders the filter label', () => {
    renderWithTheme(
      <FilterChip id="color" label="Color: Rojo" onRemove={() => {}} />,
    );
    expect(screen.getByText('Color: Rojo')).toBeInTheDocument();
  });

  it('shows delete icon and triggers onRemove', async () => {
    const user = userEvent.setup();
    const handleRemove = jest.fn();
    const { container } = renderWithTheme(
      <FilterChip id="size" label="Talla: M" onRemove={handleRemove} />,
    );
    const icon = container.querySelector('.MuiChip-deleteIcon') as HTMLElement;
    await user.click(icon);
    expect(handleRemove).toHaveBeenCalledWith('size');
  });

  it('applies ellipsis style on long text', () => {
    const { container } = renderWithTheme(
      <FilterChip
        id="name"
        label="Nombre de filtro extremadamente largo que debe truncarse"
        onRemove={() => {}}
        maxWidth={120}
      />,
    );
    const label = container.querySelector('.MuiChip-label') as HTMLElement;
    expect(label).toHaveStyle({ textOverflow: 'ellipsis' });
  });
});
