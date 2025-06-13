import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Snackbar } from './Snackbar';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Snackbar', () => {
  it('renders message when open', () => {
    renderWithTheme(<Snackbar open message="Guardado" />);
    expect(screen.getByText('Guardado')).toBeInTheDocument();
  });

  it('hides message when open becomes false', async () => {
    const { rerender } = renderWithTheme(<Snackbar open message="Ok" />);
    expect(screen.getByText('Ok')).toBeInTheDocument();
    rerender(
      <ThemeProvider>
        <Snackbar open={false} message="Ok" />
      </ThemeProvider>,
    );
    await waitForElementToBeRemoved(() => screen.queryByText('Ok'));
  });

  it('calls action handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    renderWithTheme(
      <Snackbar
        open
        message="Hecho"
        action={<button onClick={handleClick}>UNDO</button>}
      />,
    );
    await user.click(screen.getByRole('button', { name: /undo/i }));
    expect(handleClick).toHaveBeenCalled();
  });
});
