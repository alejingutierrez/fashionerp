import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { SnackbarAlert } from './SnackbarAlert';
import React from 'react';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('SnackbarAlert', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders message when open', () => {
    renderWithTheme(<SnackbarAlert open message="Hecho" />);
    expect(screen.getByText('Hecho')).toBeInTheDocument();
  });

  it('auto hides after duration', () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <SnackbarAlert open message="Ok" onClose={handleClose} autoHideDuration={100} />,
    );
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(handleClose).toHaveBeenCalled();
  });

  it('does not auto hide when sticky', () => {
    const handleClose = jest.fn();
    renderWithTheme(
      <SnackbarAlert
        open
        message="Stay"
        sticky
        onClose={handleClose}
        autoHideDuration={100}
      />,
    );
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const handleClose = jest.fn();
    renderWithTheme(<SnackbarAlert open message="Cerrar" onClose={handleClose} />);
    await user.click(screen.getByRole('button', { name: /cerrar/i }));
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(handleClose).toHaveBeenCalled();
  });

  it('does not steal focus when shown', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    renderWithTheme(
      <>
        <button>focus</button>
        <SnackbarAlert open message="Msg" />
      </>,
    );
    const btn = screen.getByText('focus');
    await user.click(btn);
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(btn).toHaveFocus();
  });
});
