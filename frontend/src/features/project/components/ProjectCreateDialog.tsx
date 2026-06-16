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
import { Textarea } from '@/components/ui/Textarea';

import { useProjectCreateMutation } from '../hooks/useProjectCreateMutation';
import { projectFormSchema, type ProjectFormInput } from './projectForm.schema';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#0ea5e9', '#8b5cf6'];

interface Props {
  trigger?: React.ReactNode;
}

export const ProjectCreateDialog = ({ trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const createMutation = useProjectCreateMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: { name: '', description: '', color: COLORS[0] },
  });
  const color = watch('color');

  const onSubmit = handleSubmit((data) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger ?? <Button>새 프로젝트</Button>}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 프로젝트</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">이름</Label>
            <Input id="name" {...register('name')} />
            <FieldError message={errors.name?.message} />
          </div>
          <div>
            <Label htmlFor="description">설명</Label>
            <Textarea id="description" rows={3} {...register('description')} />
            <FieldError message={errors.description?.message} />
          </div>
          <div>
            <Label>색상</Label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`색상 ${c}`}
                  onClick={() => setValue('color', c, { shouldDirty: true })}
                  className={`h-8 w-8 rounded-full border-2 ${color === c ? 'border-slate-900' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
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
