import { useQuery } from '@tanstack/react-query';

import { projectApi } from '../api/projectApi';
import { projectKeys } from '../api/projectKeys';

export const useProjectListQuery = () =>
  useQuery({
    queryKey: projectKeys.list(),
    queryFn: projectApi.list,
  });
