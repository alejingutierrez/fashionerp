import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { ColorSwatchSelector, ColorSwatch } from './ColorSwatchSelector';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

const swatches: ColorSwatch[] = [
  { code: '#ff0000', name: 'Pantone Rojo' },
  { code: '#00ff00', name: 'Pantone Verde' },
];

describe('ColorSwatchSelector', () => {
  it('selects color on click', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(<ColorSwatchSelector swatches={swatches} onChange={handle} />);
    await user.click(screen.getByRole('button', { name: 'Pantone Verde' }));
    expect(handle).toHaveBeenCalledWith('#00ff00');
  });

  it('selects color with space key', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(<ColorSwatchSelector swatches={swatches} onChange={handle} />);
    const btn = screen.getByRole('button', { name: 'Pantone Rojo' });
    btn.focus();
    await user.keyboard('[Space]');
    expect(handle).toHaveBeenCalledWith('#ff0000');
  });

  it('triggers duplicate callback', async () => {
    const user = userEvent.setup();
    const dup = jest.fn();
    renderWithTheme(
      <ColorSwatchSelector
        swatches={swatches}
        usedColors={['#00ff00']}
        onDuplicate={dup}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Pantone Verde' }));
    expect(dup).toHaveBeenCalledWith('#00ff00');
  });
});
