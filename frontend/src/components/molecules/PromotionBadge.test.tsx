import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { PromotionBadge } from './PromotionBadge';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('PromotionBadge', () => {
  it('renders promotion text', () => {
    renderWithTheme(<PromotionBadge label="2x1" />);
    expect(screen.getByText('2x1')).toBeInTheDocument();
  });

  it('shows icon when withIcon is true', () => {
    const { container } = renderWithTheme(<PromotionBadge label="Oferta" withIcon />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies color class', () => {
    const { container } = renderWithTheme(
      <PromotionBadge label="Promo" color="secondary" />,
    );
    const chip = container.querySelector('.MuiChip-root') as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorSecondary');
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    renderWithTheme(<PromotionBadge label="Promo" onClick={handleClick} />);
    await user.click(screen.getByRole('button', { name: /promo/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
