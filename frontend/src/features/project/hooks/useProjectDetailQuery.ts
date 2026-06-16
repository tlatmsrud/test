import { useQuery } from '@tanstack/react-query';

import { projectApi } from '../api/projectApi';
import { projectKeys } from '../api/projectKeys';

export const useProjectDetailQuery = (id: number) =>
  useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectApi.getById(id),
    enabled: Number.isFinite(id),
  });
