import { useMutation, useQueryClient } from '@tanstack/react-query';

import { projectApi } from '../api/projectApi';
import { projectKeys } from '../api/projectKeys';

export const useProjectDeleteMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: projectApi.delete,
    onSuccess: () => qc.invalidateQueries({ queryKey: projectKeys.all }),
  });
};
