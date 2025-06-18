import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { ModalFooter } from './ModalFooter';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ModalFooter', () => {
  it('renders both buttons with text', () => {
    renderWithTheme(
      <ModalFooter
        primaryText="Guardar"
        onPrimary={() => {}}
        secondaryText="Cancelar"
        onSecondary={() => {}}
      />,
    );
    expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
  });

  it('calls handlers when clicked', async () => {
    const user = userEvent.setup();
    const onPrimary = jest.fn();
    const onSecondary = jest.fn();
    renderWithTheme(
      <ModalFooter
        primaryText="Guardar"
        onPrimary={onPrimary}
        secondaryText="Cancelar"
        onSecondary={onSecondary}
      />,
    );
    await user.click(screen.getByRole('button', { name: /guardar/i }));
    await user.click(screen.getByRole('button', { name: /cancelar/i }));
    expect(onPrimary).toHaveBeenCalled();
    expect(onSecondary).toHaveBeenCalled();
  });

  it('disables primary button when primaryDisabled', () => {
    const onPrimary = jest.fn();
    renderWithTheme(
      <ModalFooter primaryText="Guardar" onPrimary={onPrimary} primaryDisabled />,
    );
    const btn = screen.getByRole('button', { name: /guardar/i });
    expect(btn).toBeDisabled();
    btn.click();
    expect(onPrimary).not.toHaveBeenCalled();
  });

  it('shows spinner and blocks click when loading', () => {
    const onPrimary = jest.fn();
    renderWithTheme(
      <ModalFooter primaryText="Guardar" onPrimary={onPrimary} loading />,
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    btn.click();
    expect(onPrimary).not.toHaveBeenCalled();
  });
});
