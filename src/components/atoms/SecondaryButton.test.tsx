import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SecondaryButton } from './SecondaryButton';

test('renders the provided text', () => {
  render(<SecondaryButton>Click me</SecondaryButton>);
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
});

test('disabled button does not trigger onClick', async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();
  render(
    <SecondaryButton disabled onClick={handleClick}>
      Do action
    </SecondaryButton>
  );
  const button = screen.getByRole('button', { name: /do action/i });
  expect(button).toBeDisabled();
  await user.click(button);
  expect(handleClick).not.toHaveBeenCalled();
});
