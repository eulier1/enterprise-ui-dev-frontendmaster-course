import { describe, expect, it } from 'vitest';
import { KanbanBoard, defaultStatuses } from '$lib/kanban-board';
import { toKebabCase } from '@/lib/to-kebab-case';

/**
 * expect.any(constructor): https://vitest.dev/api/expect.html#expect-any
 * expect.arrayContaining(): https://vitest.dev/api/expect.html#expect-arraycontaining
 * expect.objectContaining(): https://vitest.dev/api/expect.html#expect-objectcontaining
 */

describe('Kanban Board', () => {
  it.todo(
    'should create a board with a title and an array of default statuses',
    () => {
      const title = 'Important Things';
      const board = new KanbanBoard(title);

      expect.hasAssertions();
    },
  );

  it.todo('add a status to a board using #addStatus', () => {
    const title = 'Important Things';
    const status = 'Verifying';
    const board = new KanbanBoard(title);

    board.addStatus(status);

    expect.hasAssertions();

    // We don't really care what else is in board.statuses.
    // We just want to verify that it has the new status.
  });

  it('have a URL property that has the title in kebab case', () => {
    const title = 'Important Things';
    const board = new KanbanBoard(title);

    expect(board).toEqual(
      expect.objectContaining({
        url: expect.stringContaining(toKebabCase(title)),
      }),
    );
  });
});
