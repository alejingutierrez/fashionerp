import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../theme';
import { ApprovalStepItem } from './ApprovalStepItem';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('ApprovalStepItem', () => {
  it('shows correct label and color for approved status', () => {
    const { container } = renderWithTheme(
      <ApprovalStepItem name="Juan" status="approved" />,
    );
    expect(screen.getByText('Aprobado')).toBeInTheDocument();
    const chip = container.querySelector('.MuiChip-root') as HTMLElement;
    expect(chip).toHaveClass('MuiChip-colorSuccess');
  });

  it('uses placeholder when no name', () => {
    renderWithTheme(<ApprovalStepItem />);
    expect(screen.getByText('Por asignar')).toBeInTheDocument();
  });

  it('renders info text', () => {
    renderWithTheme(<ApprovalStepItem name="Ana" info="Paso 1 de 3" />);
    expect(screen.getByText('Paso 1 de 3')).toBeInTheDocument();
  });

  it('applies vertical orientation', () => {
    const { container } = renderWithTheme(
      <ApprovalStepItem name="Ana" orientation="vertical" />,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveStyle({ flexDirection: 'column' });
  });
});
