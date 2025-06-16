import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { InfoTooltipIcon } from './InfoTooltipIcon';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('InfoTooltipIcon', () => {
  it('renders icon and tooltip on hover', async () => {
    const user = userEvent.setup();
    renderWithTheme(<InfoTooltipIcon text="Ayuda" />);
    const icon = screen.getByLabelText('Ayuda');
    await user.hover(icon);
    expect(await screen.findByText('Ayuda')).toBeInTheDocument();
    await user.unhover(icon);
    await waitForElementToBeRemoved(() => screen.queryByText('Ayuda'));
  });

  it('shows tooltip on focus and hides on blur', async () => {
    const user = userEvent.setup();
    renderWithTheme(<InfoTooltipIcon text="Detalle" />);
    const icon = screen.getByLabelText('Detalle');
    await user.tab();
    expect(icon).toHaveFocus();
    expect(await screen.findByText('Detalle')).toBeInTheDocument();
    await user.tab();
    await waitForElementToBeRemoved(() => screen.queryByText('Detalle'));
  });
});
