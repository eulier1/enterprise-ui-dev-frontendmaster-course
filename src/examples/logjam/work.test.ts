import { test, expect, vi } from 'vitest';
import { log } from './log';

vi.mock('react-redux', (args) => {
  return {
    useDispatch() {},
    useSelector() {},
  };
});

test('it spies on the multiply method', () => {
  const add = (x: number, y: number) => x + y;
  const testfn = (x?: string) => {
    if (x) {
      return {
        name: x,
        description: `It's a nice person`,
        add,
      };
    }
  };

  const mock = vi.fn(add);
  const mockFn = testfn('Joe');

  vi.spyOn(mockFn, 'add').mockImplementation(() => 5);

  console.log(mockFn?.add(5, 5));

  expect(mockFn?.add(10, 5)).toEqual(5);
});
