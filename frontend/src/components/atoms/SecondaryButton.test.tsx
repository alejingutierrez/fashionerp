import { render, screen } from '@testing-library/react';
import { SecondaryButton } from './SecondaryButton';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('SecondaryButton', () => {
  it('renders the provided text', () => {
    renderWithTheme(<SecondaryButton>Cancel</SecondaryButton>);
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <SecondaryButton disabled onClick={handleClick}>
        Disabled
      </SecondaryButton>,
    );
    const btn = screen.getByRole('button', { name: /disabled/i });
    expect(btn).toBeDisabled();
    btn.click();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
