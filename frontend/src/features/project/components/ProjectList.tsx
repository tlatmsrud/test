'use client';

import { useProjectListQuery } from '../hooks/useProjectListQuery';
import { ProjectCard } from './ProjectCard';
import { ProjectCreateDialog } from './ProjectCreateDialog';

export const ProjectList = () => {
  const { data: projects, isLoading, error } = useProjectListQuery();

  if (isLoading) {
    return <div className="py-12 text-center text-slate-400">로딩 중...</div>;
  }
  if (error) {
    return <div className="py-12 text-center text-danger-500">{error.message}</div>;
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-card border border-dashed border-slate-300 bg-white py-16">
        <p className="text-slate-500">아직 프로젝트가 없습니다.</p>
        <ProjectCreateDialog />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
};
