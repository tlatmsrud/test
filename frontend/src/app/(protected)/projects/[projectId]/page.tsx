import { ProjectDetailView } from '@/features/project/components/ProjectDetailView';

interface Props {
  params: Promise<{ projectId: string }>;
}

const ProjectDetailPage = async ({ params }: Props) => {
  const { projectId } = await params;
  return <ProjectDetailView projectId={Number(projectId)} />;
};

export default ProjectDetailPage;
