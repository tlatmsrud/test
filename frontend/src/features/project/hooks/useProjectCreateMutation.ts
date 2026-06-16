import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectApi } from '../api/projectApi';
import { projectKeys } from '../api/projectKeys';

export const useProjectCreateMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: projectApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: projectKeys.lists() }),
  });
};
