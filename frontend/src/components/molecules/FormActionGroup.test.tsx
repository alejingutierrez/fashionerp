import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { FormActionGroup } from './FormActionGroup';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('FormActionGroup', () => {
  it('renders cancel text and submit button', () => {
    renderWithTheme(
      <FormActionGroup primaryText="Guardar" onPrimary={() => {}} cancelText="Cancelar" />,
    );
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
  });

  it('calls handlers when clicked', async () => {
    const user = userEvent.setup();
    const onPrimary = jest.fn();
    const onCancel = jest.fn();
    renderWithTheme(
      <FormActionGroup
        primaryText="Guardar"
        onPrimary={onPrimary}
        cancelText="Cancelar"
        onCancel={onCancel}
      />,
    );
    await user.click(screen.getByRole('button', { name: /guardar/i }));
    await user.click(screen.getByText('Cancelar'));
    expect(onPrimary).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
  });

  it('disables primary button when primaryDisabled', () => {
    const onPrimary = jest.fn();
    renderWithTheme(
      <FormActionGroup primaryText="Guardar" onPrimary={onPrimary} primaryDisabled />,
    );
    const btn = screen.getByRole('button', { name: /guardar/i });
    expect(btn).toBeDisabled();
    btn.click();
    expect(onPrimary).not.toHaveBeenCalled();
  });

  it('shows spinner and blocks click when loading', () => {
    const onPrimary = jest.fn();
    renderWithTheme(
      <FormActionGroup primaryText="Guardar" onPrimary={onPrimary} loading />,
    );
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    btn.click();
    expect(onPrimary).not.toHaveBeenCalled();
  });

  it('applies cancel href when provided', () => {
    renderWithTheme(
      <FormActionGroup
        primaryText="Guardar"
        onPrimary={() => {}}
        cancelText="Cancelar"
        cancelHref="/home"
      />,
    );
    expect(screen.getByRole('link', { name: /cancelar/i })).toHaveAttribute('href', '/home');
  });
});
