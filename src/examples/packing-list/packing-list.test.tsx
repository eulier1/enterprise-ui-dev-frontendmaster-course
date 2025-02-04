import { render as _render, screen, RenderOptions } from 'test/utilities';
import { PackingList } from '.';
import { Provider } from 'react-redux';
import { createStore } from './store';
import { PropsWithChildren } from 'react';

const renderWithProvider = (
  ui: React.ReactElement,
  options?: Parameters<typeof _render>[1],
) => {
  const store = createStore();

  const wrapper = ({ children }: PropsWithChildren) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return _render(ui, { ...options, wrapper });
};

it('renders the Packing List application', () => {
  renderWithProvider(<PackingList></PackingList>);
});

it('has the correct title', async () => {
  renderWithProvider(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  renderWithProvider(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty', async () => {
  const { user } = renderWithProvider(<PackingList />);
  const inputElement = screen.getByLabelText('New Item Name');
  const buttonElement = screen.getByRole('button', { name: 'Add New Item' });

  expect(inputElement).toHaveValue('');
  expect(buttonElement).toBeDisabled();
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = renderWithProvider(<PackingList />);
  const inputElement = screen.getByLabelText('New Item Name');
  const buttonElement = screen.getByRole('button', { name: 'Add New Item' });

  await user.type(inputElement, 'Macbook Pro');

  expect(buttonElement).toBeEnabled();
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = renderWithProvider(<PackingList />);
  const input = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item' });

  await user.type(input, 'Macbook Pro');
  await user.click(addNewItemButton);

  const unpackItemElement = screen.getByText(/Macbook pro/i);

  screen.debug(document);

  expect(unpackItemElement).toBeInTheDocument();
});
