import Link from 'next/link';

import type { TodoSummaryResponse } from '../types/Todo';
import { TodoStatusBadge } from './TodoStatusBadge';

interface Props {
  todo: TodoSummaryResponse;
}

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }) : null;

export const TodoListItem = ({ todo }: Props) => {
  const start = formatDate(todo.startDate);
  const due = formatDate(todo.dueDate);
  return (
    <Link
      href={`/todos/${todo.id}`}
      className="flex items-center justify-between gap-3 rounded-input border border-slate-200 bg-white px-4 py-3 hover:border-brand-300 hover:bg-brand-50/30"
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-900">{todo.title}</p>
        {(start || due) ? (
          <p className="mt-0.5 text-xs text-slate-500">
            {start ?? '—'} ~ {due ?? '—'}
          </p>
        ) : null}
      </div>
      <TodoStatusBadge status={todo.status} />
    </Link>
  );
};
