import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { ModalHeader } from './ModalHeader';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ModalHeader', () => {
  it('displays the title', () => {
    renderWithTheme(<ModalHeader title="Detalles" />);
    expect(screen.getByText('Detalles')).toBeInTheDocument();
  });

  it('shows close button by default', () => {
    renderWithTheme(<ModalHeader title="X" />);
    expect(screen.getByRole('button', { name: /cerrar/i })).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', async () => {
    const user = userEvent.setup();
    const handleClose = jest.fn();
    renderWithTheme(<ModalHeader title="X" onClose={handleClose} />);
    await user.click(screen.getByRole('button', { name: /cerrar/i }));
    expect(handleClose).toHaveBeenCalled();
  });

  it('hides close button when hideCloseButton true', () => {
    renderWithTheme(<ModalHeader title="X" hideCloseButton />);
    expect(screen.queryByRole('button', { name: /cerrar/i })).toBeNull();
  });

  it('centers title when align center', () => {
    const { getByText } = renderWithTheme(
      <ModalHeader title="Hola" align="center" hideCloseButton />,
    );
    const title = getByText('Hola');
    expect(title).toHaveStyle({ textAlign: 'center' });
  });
});
