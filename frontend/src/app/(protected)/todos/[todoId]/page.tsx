import { TodoDetailView } from '@/features/todo/components/TodoDetailView';

interface Props {
  params: Promise<{ todoId: string }>;
}

const TodoDetailPage = async ({ params }: Props) => {
  const { todoId } = await params;
  return <TodoDetailView todoId={Number(todoId)} />;
};

export default TodoDetailPage;
