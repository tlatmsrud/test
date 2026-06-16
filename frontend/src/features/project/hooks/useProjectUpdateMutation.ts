import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectApi, type ProjectUpdateInput } from '../api/projectApi';
import { projectKeys } from '../api/projectKeys';

export const useProjectUpdateMutation = (id: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: ProjectUpdateInput) => projectApi.update(id, input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: projectKeys.detail(id) });
      qc.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
};
