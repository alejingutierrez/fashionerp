import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { TableRowItem } from './TableRowItem';
import { Icon } from '../atoms';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('TableRowItem', () => {
  it('renders each cell value', () => {
    renderWithTheme(
      <table>
        <tbody>
          <TableRowItem cells={['SKU1', 'Camisa', 10]} />
        </tbody>
      </table>,
    );
    expect(screen.getByText('SKU1')).toBeInTheDocument();
    expect(screen.getByText('Camisa')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('calls onAction with id', async () => {
    const user = userEvent.setup();
    const handle = jest.fn();
    renderWithTheme(
      <table>
        <tbody>
          <TableRowItem
            id="row1"
            cells={['A']}
            actionIcon={<Icon name="settings" />}
            onAction={handle}
          />
        </tbody>
      </table>,
    );
    await user.click(screen.getByRole('button'));
    expect(handle).toHaveBeenCalledWith('row1');
  });

  it('shows placeholder when cell value missing', () => {
    renderWithTheme(
      <table>
        <tbody>
          <TableRowItem cells={['SKU1', null, undefined]} />
        </tbody>
      </table>,
    );
    const cells = screen.getAllByText('-');
    expect(cells).toHaveLength(2);
  });

  it('applies selected state', () => {
    renderWithTheme(
      <table>
        <tbody>
          <TableRowItem cells={['A']} selected />
        </tbody>
      </table>,
    );
    const row = screen.getByRole('row');
    expect(row).toHaveClass('Mui-selected');
  });
});
