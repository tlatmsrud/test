'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { TodoCreateDialog } from '@/features/todo/components/TodoCreateDialog';
import { TodoList } from '@/features/todo/components/TodoList';

import { useProjectDetailQuery } from '../hooks/useProjectDetailQuery';

interface Props {
  projectId: number;
}

export const ProjectDetailView = ({ projectId }: Props) => {
  const { data: project, isLoading, error } = useProjectDetailQuery(projectId);

  if (isLoading) return <div className="py-12 text-center text-slate-400">로딩 중...</div>;
  if (error) return <div className="py-12 text-center text-danger-500">{error.message}</div>;
  if (!project) return null;

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        프로젝트 목록
      </Link>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: project.color ?? '#94a3b8' }}
            />
            <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
          </div>
          {project.description ? (
            <p className="mt-1 text-sm text-slate-500">{project.description}</p>
          ) : null}
        </div>
        <TodoCreateDialog projectId={projectId} />
      </div>

      <TodoList projectId={projectId} />
    </div>
  );
};
