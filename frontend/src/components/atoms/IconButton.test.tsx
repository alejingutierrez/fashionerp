import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from './IconButton';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('IconButton', () => {
  it('renders the provided icon', () => {
    renderWithTheme(<IconButton icon={<DeleteIcon />} aria-label="delete" />);
    expect(screen.getByLabelText(/delete/i)).toBeInTheDocument();
  });

  it('calls onClick when enabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    renderWithTheme(
      <IconButton icon={<DeleteIcon />} onClick={handleClick} aria-label="delete" />,
    );
    await user.click(screen.getByRole('button', { name: /delete/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <IconButton
        icon={<DeleteIcon />}
        disabled
        onClick={handleClick}
        aria-label="delete"
      />,
    );
    const btn = screen.getByRole('button', { name: /delete/i });
    btn.click();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
