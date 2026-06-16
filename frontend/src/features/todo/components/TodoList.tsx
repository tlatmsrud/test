'use client';

import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

import { useTodoListQuery } from '../hooks/useTodoListQuery';
import { TODO_STATUSES, TODO_STATUS_LABEL, type TodoStatus } from '../types/Todo';
import { TodoListItem } from './TodoListItem';

interface Props {
  projectId: number;
}

const ALL = 'ALL';

export const TodoList = ({ projectId }: Props) => {
  const [statusFilter, setStatusFilter] = useState<TodoStatus | typeof ALL>(ALL);
  const { data, isLoading, error } = useTodoListQuery({
    projectId,
    status: statusFilter === ALL ? undefined : statusFilter,
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700">할 일 목록</h2>
        <div className="w-40">
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as TodoStatus | typeof ALL)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>전체</SelectItem>
              {TODO_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {TODO_STATUS_LABEL[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-slate-400">로딩 중...</div>
      ) : error ? (
        <div className="py-8 text-center text-danger-500">{error.message}</div>
      ) : !data || data.length === 0 ? (
        <div className="rounded-input border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500">
          아직 할 일이 없습니다.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {data.map((t) => (
            <TodoListItem key={t.id} todo={t} />
          ))}
        </div>
      )}
    </div>
  );
};
