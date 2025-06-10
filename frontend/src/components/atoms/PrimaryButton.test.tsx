import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PrimaryButton } from './PrimaryButton';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('PrimaryButton', () => {
  it('calls onClick when enabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    renderWithTheme(<PrimaryButton onClick={handleClick}>Save</PrimaryButton>);
    await user.click(screen.getByRole('button', { name: /save/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <PrimaryButton onClick={handleClick} disabled>
        Disabled
      </PrimaryButton>,
    );
    const btn = screen.getByRole('button', { name: /disabled/i });
    btn.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('shows loading spinner and prevents click when loading', async () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <PrimaryButton onClick={handleClick} loading>
        Loading
      </PrimaryButton>,
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    btn.click();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders spinner at start when loadingPosition="start"', () => {
    renderWithTheme(
      <PrimaryButton loading loadingPosition="start">
        Start
      </PrimaryButton>,
    );
    const btn = screen.getByRole('button');
    expect(btn.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders loadingText when provided', () => {
    renderWithTheme(
      <PrimaryButton loading loadingText="Saving...">
        Save
      </PrimaryButton>,
    );
    expect(screen.getByText('Saving...')).toBeInTheDocument();
  });
});
