import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

import type { ProjectResponse } from '../types/Project';

interface Props {
  project: ProjectResponse;
}

export const ProjectCard = ({ project }: Props) => {
  return (
    <Link href={`/projects/${project.id}`} className="block">
      <Card className="transition hover:shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: project.color ?? '#94a3b8' }}
            />
            <CardTitle>{project.name}</CardTitle>
          </div>
          {project.description ? <CardDescription>{project.description}</CardDescription> : null}
        </CardHeader>
        <CardContent>
          <p className="text-xs text-slate-400">
            생성: {new Date(project.createdAt).toLocaleDateString('ko-KR')}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};
