import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from '.';
import { render } from 'test/utilities';

test('it should render the component', () => {
  const wrapper = render(<Counter />);
  expect(wrapper.container).toBe(wrapper.container);
});

test('it should increment when the "Increment" button is pressed', async () => {
  const { user } = render(<Counter/>)
  const buttonElement = screen.getByRole('button', { name: 'Increment' });
  const counterContent = screen.getByTestId('current-count');

  //screen.debug(document);
  await user.click(buttonElement);
  //screen.debug(document);

  expect(counterContent.textContent).toBe('1');
});
