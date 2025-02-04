import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
import { render } from 'test/utilities';
import { expect } from 'vitest';

test('it should render the component', () => {
  render(<Counter />);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const initialValue = 0;
  const { user } = render(<Counter initialCount={initialValue} />);
  const textCounter = screen.getByTestId('current-count');
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  expect(textCounter).toHaveTextContent(initialValue.toString());

  await user.click(incrementButton);

  expect(textCounter).toHaveTextContent('1');
});

test('it should render the component with an initial count', () => {
  render(<Counter initialCount={400} />);
  const textCounter = screen.getByTestId('current-count');

  expect(textCounter).toHaveTextContent('400');
});

test('it should reset the count when the "Reset" button is pressed', async () => {
  const { user } = render(<Counter initialCount={400} />);
  const textCounter = screen.getByTestId('current-count');
  const resetButton = screen.getByRole('button', { name: 'Reset' });
  const incrementButton = screen.getByRole('button', { name: 'Increment' });

  await user.click(incrementButton);

  expect(textCounter).toHaveTextContent('401');

  await user.click(resetButton);

  expect(textCounter).toHaveTextContent('0');
});
