import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { PaginationControls } from './PaginationControls';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('PaginationControls', () => {
  it('calls onPageChange when clicking next and prev', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <PaginationControls page={2} totalPages={5} onPageChange={handleChange} />,
    );
    await user.click(screen.getByRole('button', { name: /siguiente/i }));
    expect(handleChange).toHaveBeenLastCalledWith(3);
    await user.click(screen.getByRole('button', { name: /anterior/i }));
    expect(handleChange).toHaveBeenLastCalledWith(1);
  });

  it('disables prev on first page and next on last page', () => {
    renderWithTheme(
      <PaginationControls page={1} totalPages={1} onPageChange={() => {}} />,
    );
    const prev = screen.getByRole('button', { name: /anterior/i });
    const next = screen.getByRole('button', { name: /siguiente/i });
    expect(prev).toBeDisabled();
    expect(next).toBeDisabled();
  });

  it('jumps to page when clicking number', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <PaginationControls page={1} totalPages={3} onPageChange={handleChange} />,
    );
    await user.click(screen.getByRole('button', { name: '2' }));
    expect(handleChange).toHaveBeenCalledWith(2);
  });
});
