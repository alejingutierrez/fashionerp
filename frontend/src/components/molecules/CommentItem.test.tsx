import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { CommentItem } from './CommentItem';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('CommentItem', () => {
  it('muestra avatar y nombre del usuario', () => {
    renderWithTheme(
      <CommentItem name="Ana" text="Hola" avatarSrc="avatar.png" timestamp="ahora" />,
    );
    const img = screen.getByRole('img', { name: /ana/i });
    expect(img).toHaveAttribute('src', 'avatar.png');
    expect(screen.getByText('Ana')).toBeInTheDocument();
  });

  it('usa icono cuando es sistema', () => {
    const { container } = renderWithTheme(
      <CommentItem name="Sistema" text="Auto" timestamp="hoy" system />,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('muestra el texto completo y la fecha', () => {
    renderWithTheme(<CommentItem name="Ana" text="Un texto" timestamp="ayer" />);
    expect(screen.getByText('Un texto')).toBeInTheDocument();
    expect(screen.getByText('ayer')).toBeInTheDocument();
  });

  it('dispara callbacks de acciones', async () => {
    const user = userEvent.setup();
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();
    renderWithTheme(
      <CommentItem
        name="Ana"
        text="X"
        timestamp="hoy"
        onEdit={handleEdit}
        onDelete={handleDelete}
      />,
    );
    await user.click(screen.getByRole('button', { name: /editar comentario/i }));
    await user.click(screen.getByRole('button', { name: /eliminar comentario/i }));
    expect(handleEdit).toHaveBeenCalled();
    expect(handleDelete).toHaveBeenCalled();
  });
});
