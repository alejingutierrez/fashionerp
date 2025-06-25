import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { StockLevelSlider } from './StockLevelSlider';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('StockLevelSlider', () => {
  it('changes color based on thresholds', () => {
    const { container, rerender } = renderWithTheme(
      <StockLevelSlider value={80} onChange={() => {}} />,
    );
    expect(screen.getByText('Alto')).toBeInTheDocument();
    let chip = container.querySelector('.MuiChip-root') as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorSuccess');

    rerender(
      <ThemeProvider>
        <StockLevelSlider value={50} onChange={() => {}} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Medio')).toBeInTheDocument();
    chip = container.querySelector('.MuiChip-root') as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorWarning');

    rerender(
      <ThemeProvider>
        <StockLevelSlider value={10} onChange={() => {}} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Crítico')).toBeInTheDocument();
    chip = container.querySelector('.MuiChip-root') as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorError');

    rerender(
      <ThemeProvider>
        <StockLevelSlider value={0} onChange={() => {}} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Sin stock')).toBeInTheDocument();
    chip = container.querySelector('.MuiChip-root') as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorDefault');
  });

  it('is disabled when readOnly', () => {
    renderWithTheme(<StockLevelSlider value={40} onChange={() => {}} readOnly />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });

  it('fires onChange with arrow keys', () => {
    const handle = jest.fn();
    renderWithTheme(<StockLevelSlider value={20} onChange={handle} step={1} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(handle).toHaveBeenCalled();
  });
});
