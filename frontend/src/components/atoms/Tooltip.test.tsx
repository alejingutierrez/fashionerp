import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';
import { ThemeProvider } from '../../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('Tooltip', () => {
  it('shows tooltip text on hover', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Tooltip title="Info">
        <button>Trigger</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Trigger'));
    expect(await screen.findByText('Info')).toBeInTheDocument();
  });

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Tooltip title="Focus text">
        <button>Btn</button>
      </Tooltip>,
    );
    const btn = screen.getByText('Btn');
    await user.tab();
    expect(btn).toHaveFocus();
    expect(await screen.findByText('Focus text')).toBeInTheDocument();
  });

  it('applies placement and arrow', () => {
    renderWithTheme(
      <Tooltip title="Test" placement="right" arrow open>
        <button>Icon</button>
      </Tooltip>,
    );
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toHaveAttribute('data-popper-placement', 'right');
    expect(tooltip.querySelector('.MuiTooltip-arrow')).toBeInTheDocument();
  });
});
