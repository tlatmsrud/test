import { ProjectCreateDialog } from '@/features/project/components/ProjectCreateDialog';
import { ProjectList } from '@/features/project/components/ProjectList';

const ProjectsPage = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">프로젝트</h1>
          <p className="mt-1 text-sm text-slate-500">프로젝트별로 할 일을 관리하세요.</p>
        </div>
        <ProjectCreateDialog />
      </div>
      <ProjectList />
    </div>
  );
};

export default ProjectsPage;
