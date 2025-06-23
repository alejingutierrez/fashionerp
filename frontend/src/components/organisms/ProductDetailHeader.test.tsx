import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from '../../theme';
import { ProductDetailHeader } from './ProductDetailHeader';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ProductDetailHeader', () => {
  it('toggles status successfully', async () => {
    const user = userEvent.setup();
    const handle = jest.fn().mockResolvedValue(undefined);
    renderWithTheme(<ProductDetailHeader name="Prod" onStatusChange={handle} />);
    await user.click(screen.getByRole('button', { name: /activo/i }));
    await waitFor(() => expect(handle).toHaveBeenCalled());
  });

  it('shows error when toggle fails', async () => {
    const user = userEvent.setup();
    const handle = jest.fn().mockRejectedValue(new Error('fail'));
    renderWithTheme(<ProductDetailHeader name="Prod" onStatusChange={handle} />);
    await user.click(screen.getByRole('button', { name: /activo/i }));
    expect(await screen.findByText('Error al guardar')).toBeInTheDocument();
  });

  it('opens modal to edit name', async () => {
    const user = userEvent.setup();
    const handle = jest.fn().mockResolvedValue(undefined);
    renderWithTheme(<ProductDetailHeader name="Prod" onNameSave={handle} />);
    await user.click(screen.getByRole('button', { name: /editar nombre/i }));
    await user.type(screen.getByRole('textbox'), 'X');
    await user.click(screen.getByRole('button', { name: /guardar/i }));
    await waitFor(() => expect(handle).toHaveBeenCalledWith('ProdX'));
  });
});
