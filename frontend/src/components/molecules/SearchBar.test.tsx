import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { SearchBar } from './SearchBar';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('SearchBar', () => {
  it('renders input and button', () => {
    renderWithTheme(<SearchBar onSearch={() => {}} />);
    expect(screen.getByLabelText('search input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates query on typing', async () => {
    const user = userEvent.setup();
    renderWithTheme(<SearchBar onSearch={() => {}} />);
    const input = screen.getByLabelText('search input') as HTMLInputElement;
    await user.type(input, 'zapatos');
    expect(input.value).toBe('zapatos');
  });

  it('calls onSearch when clicking button', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();
    renderWithTheme(<SearchBar onSearch={handleSearch} />);
    const input = screen.getByLabelText('search input');
    await user.type(input, 'jeans');
    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(handleSearch).toHaveBeenCalledWith('jeans');
  });

  it('calls onSearch when pressing Enter', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();
    renderWithTheme(<SearchBar onSearch={handleSearch} />);
    const input = screen.getByLabelText('search input');
    await user.type(input, 'camisas');
    await user.keyboard('[Enter]');
    expect(handleSearch).toHaveBeenCalledWith('camisas');
  });

  it('is not interactive when disabled', async () => {
    const user = userEvent.setup();
    const handleSearch = jest.fn();
    renderWithTheme(<SearchBar onSearch={handleSearch} disabled />);
    const input = screen.getByLabelText('search input');
    const button = screen.getByRole('button', { name: /search/i });
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
    await user.type(input, 'test');
    button.click();
    expect(handleSearch).not.toHaveBeenCalled();
  });
});
