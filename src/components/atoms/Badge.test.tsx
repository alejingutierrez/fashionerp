import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Badge } from './Badge';

test('renders number content', () => {
  render(
    <Badge content={5}>
      <span>icon</span>
    </Badge>
  );
  expect(screen.getByText('5')).toBeInTheDocument();
});

test('applies max and shows overflow', () => {
  render(
    <Badge content={100} max={99}>
      <span>icon</span>
    </Badge>
  );
  expect(screen.getByText('99+')).toBeInTheDocument();
});

test('hides zero when showZero is false', () => {
  render(
    <Badge content={0}>
      <span>icon</span>
    </Badge>
  );
  expect(screen.queryByText('0')).not.toBeInTheDocument();
});

test('shows zero when showZero is true', () => {
  render(
    <Badge content={0} showZero>
      <span>icon</span>
    </Badge>
  );
  expect(screen.getByText('0')).toBeInTheDocument();
});
