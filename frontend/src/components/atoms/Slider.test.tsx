import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from './Slider';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Slider', () => {
  it('renders with correct aria attributes', () => {
    renderWithTheme(<Slider value={30} min={0} max={100} onChange={() => {}} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '30');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  it('calls onChange when pressing arrow key', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Slider value={30} min={0} max={100} step={1} onChange={handleChange} />,
    );
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(handleChange).toHaveBeenCalled();
  });
});
