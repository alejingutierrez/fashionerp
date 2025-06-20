import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageUpload } from './ImageUpload';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ImageUpload', () => {
  it('sube imagen exitosamente', async () => {
    const mockUpload = jest.fn(async () => {
      await new Promise((r) => setTimeout(r, 200));
      return 'https://cdn.test/image.jpg';
    });
    renderWithTheme(<ImageUpload uploadFn={mockUpload} />);
    const file = new File(['foto'], 'foto.jpg', { type: 'image/jpeg' });
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    await userEvent.upload(input, file);
    expect(mockUpload).toHaveBeenCalled();
    await waitFor(() =>
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'https://cdn.test/image.jpg',
      ),
    );
  });

  it('muestra error en formato inválido', async () => {
    const mockUpload = jest.fn(async () => {
      await new Promise((r) => setTimeout(r, 200));
      throw new Error('413');
    });
    renderWithTheme(<ImageUpload uploadFn={mockUpload} mimeTypes={['image/png']} />);
    const file = new File(['foto'], 'foto.jpg', { type: 'image/jpeg' });
    const input = screen.getByTestId('file-input') as HTMLInputElement;
    await userEvent.upload(input, file);
    expect(mockUpload).not.toHaveBeenCalled();
  });
});
