'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { FieldError } from '@/components/ui/FieldError';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';

import { useTodoCreateMutation } from '../hooks/useTodoCreateMutation';
import { TODO_STATUSES, TODO_STATUS_LABEL, type TodoStatus } from '../types/Todo';
import { todoCreateSchema, type TodoCreateFormInput } from './todoForm.schema';

interface Props {
  projectId: number;
  trigger?: React.ReactNode;
}

export const TodoCreateDialog = ({ projectId, trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const createMutation = useTodoCreateMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TodoCreateFormInput>({
    resolver: zodResolver(todoCreateSchema),
    defaultValues: { title: '', content: '', startDate: '', dueDate: '', status: 'TODO' },
  });
  const status = watch('status');

  const onSubmit = handleSubmit((data) => {
    createMutation.mutate(
      {
        projectId,
        title: data.title,
        content: data.content || undefined,
        startDate: data.startDate || undefined,
        dueDate: data.dueDate || undefined,
        status: data.status,
      },
      {
        onSuccess: () => {
          setOpen(false);
          reset();
        },
      },
    );
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? <Button>새 할 일</Button>}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 할 일</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="title">제목</Label>
            <Input id="title" {...register('title')} />
            <FieldError message={errors.title?.message} />
          </div>
          <div>
            <Label htmlFor="content">내용</Label>
            <Textarea id="content" rows={3} {...register('content')} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="startDate">시작일</Label>
              <Input id="startDate" type="date" {...register('startDate')} />
            </div>
            <div>
              <Label htmlFor="dueDate">마감일</Label>
              <Input id="dueDate" type="date" {...register('dueDate')} />
              <FieldError message={errors.dueDate?.message} />
            </div>
          </div>
          <div>
            <Label>상태</Label>
            <Select
              value={status}
              onValueChange={(v) => setValue('status', v as TodoStatus, { shouldDirty: true })}
            >
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
          <DialogFooter>
            <Button intent="ghost" type="button" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting || createMutation.isPending}>
              {createMutation.isPending ? '생성 중...' : '생성'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
