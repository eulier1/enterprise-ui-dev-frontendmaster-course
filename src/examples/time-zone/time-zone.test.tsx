import { test, expect, vi } from 'vitest';
import { render } from 'test/utilities';
import TimeZone from '.';

beforeEach(() => {
  vi.useFakeTimers({ now: 1679492355195 });
});

test('it should render successfully', () => {
  render(<TimeZone />);
});

test('should match the snapshot', async () => {
  const { container } = render(<TimeZone />);
  expect(container).toMatchSnapshot();
});
