import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../theme';
import { RadioButtonGroup, RadioButtonOption } from './RadioButtonGroup';

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

const options: RadioButtonOption[] = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
];

describe('RadioButtonGroup', () => {
  it('renders all options and only one can be selected', () => {
    renderWithTheme(
      <RadioButtonGroup value="a" options={options} onChange={() => {}} />,
    );
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios).toHaveLength(3);
    expect(radios[0].checked).toBe(true);
    expect(radios[1].checked).toBe(false);
  });

  it('selects option on click and calls onChange', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <RadioButtonGroup value="a" options={options} onChange={handleChange} />,
    );
    const radios = screen.getAllByRole('radio');
    await user.click(radios[1]);
    expect(handleChange).toHaveBeenCalled();
  });

  it('navigates with keyboard', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <RadioButtonGroup value="a" options={options} onChange={handleChange} />,
    );
    await user.tab(); // focus first radio
    await user.keyboard('[ArrowDown]');
    await user.keyboard('[Space]');
    expect(handleChange).toHaveBeenCalled();
  });

  it('is disabled when group disabled', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    renderWithTheme(
      <RadioButtonGroup value="a" options={options} onChange={handleChange} disabled />,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toBeDisabled();
    await expect(user.click(radios[1])).rejects.toThrow();
    expect(handleChange).not.toHaveBeenCalled();
  });
});
