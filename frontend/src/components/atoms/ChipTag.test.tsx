import { render, screen } from '@testing-library/react';
import PercentIcon from '@mui/icons-material/Percent';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { ChipTag } from './ChipTag';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ChipTag', () => {
  it('renders label text', () => {
    renderWithTheme(<ChipTag label="Promo" />);
    expect(screen.getByText('Promo')).toBeInTheDocument();
  });

  it('shows icon when provided', () => {
    const { container } = renderWithTheme(
      <ChipTag label="Promo" icon={<PercentIcon />} />,
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies color class', () => {
    const { container } = renderWithTheme(<ChipTag label="Promo" color="primary" />);
    const chip = container.querySelector('.MuiChip-root') as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorPrimary');
  });

  it('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    renderWithTheme(<ChipTag label="Click" onClick={handleClick} />);
    await user.click(screen.getByRole('button', { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
