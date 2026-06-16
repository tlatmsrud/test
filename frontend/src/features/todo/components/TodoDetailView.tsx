'use client';

import { ArrowLeft, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

import { useTodoDeleteMutation } from '../hooks/useTodoDeleteMutation';
import { useTodoDetailQuery } from '../hooks/useTodoDetailQuery';
import { useTodoStatusMutation } from '../hooks/useTodoStatusMutation';
import { TODO_STATUSES, TODO_STATUS_LABEL, type TodoStatus } from '../types/Todo';
import { TodoImageUploader } from './TodoImageUploader';

interface Props {
  todoId: number;
}

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('ko-KR') : '—';

export const TodoDetailView = ({ todoId }: Props) => {
  const router = useRouter();
  const { data: todo, isLoading, error } = useTodoDetailQuery(todoId);
  const statusMutation = useTodoStatusMutation(todoId);
  const deleteMutation = useTodoDeleteMutation();

  if (isLoading) return <div className="py-12 text-center text-slate-400">로딩 중...</div>;
  if (error) return <div className="py-12 text-center text-danger-500">{error.message}</div>;
  if (!todo) return null;

  const handleStatusChange = (next: string) => {
    statusMutation.mutate(next as TodoStatus);
  };

  const handleDelete = () => {
    if (!confirm('이 할 일을 삭제하시겠습니까?')) return;
    deleteMutation.mutate(todo.id, {
      onSuccess: () => router.push(`/projects/${todo.projectId}`),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={`/projects/${todo.projectId}`}
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        프로젝트로 돌아가기
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle>{todo.title}</CardTitle>
            <Button intent="danger" size="sm" onClick={handleDelete} disabled={deleteMutation.isPending}>
              <Trash2 className="h-4 w-4" />
              삭제
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-slate-500">시작일</p>
              <p className="text-sm font-medium text-slate-900">{formatDate(todo.startDate)}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">마감일</p>
              <p className="text-sm font-medium text-slate-900">{formatDate(todo.dueDate)}</p>
            </div>
            <div>
              <p className="mb-1 text-xs text-slate-500">상태</p>
              <Select value={todo.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TODO_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {TODO_STATUS_LABEL[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {todo.content ? (
            <div>
              <p className="mb-1 text-xs text-slate-500">내용</p>
              <p className="whitespace-pre-wrap text-sm text-slate-800">{todo.content}</p>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-5">
          <TodoImageUploader todoId={todo.id} images={todo.images} />
        </CardContent>
      </Card>
    </div>
  );
};
