import { Badge } from '@/components/ui/Badge';

import { TODO_STATUS_LABEL, type TodoStatus } from '../types/Todo';

interface Props {
  status: TodoStatus;
}

const INTENT_BY_STATUS: Record<TodoStatus, 'default' | 'brand' | 'success' | 'warning'> = {
  TODO: 'default',
  IN_PROGRESS: 'brand',
  DONE: 'success',
  ARCHIVED: 'warning',
};

export const TodoStatusBadge = ({ status }: Props) => (
  <Badge intent={INTENT_BY_STATUS[status]}>{TODO_STATUS_LABEL[status]}</Badge>
);
