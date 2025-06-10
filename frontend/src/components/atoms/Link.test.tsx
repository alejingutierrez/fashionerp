import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link } from './Link';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Link', () => {
  it('renders the text and href', () => {
    renderWithTheme(<Link href="/home">Go home</Link>);
    const link = screen.getByRole('link', { name: /go home/i });
    expect(link).toHaveAttribute('href', '/home');
  });

  it('calls onClick handler when provided', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    renderWithTheme(
      <Link href="#" onClick={handleClick}>
        Click me
      </Link>,
    );
    await user.click(screen.getByRole('link', { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
