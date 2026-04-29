import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getIssues, createIssue, updateIssue, Issue } from '../api/issues';

export const useIssues = (projectId: string) => {
  return useQuery({
    queryKey: ['issues', projectId],
    queryFn: () => getIssues(projectId),
    enabled: !!projectId,
  });
};

export const useCreateIssue = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newIssue: Partial<Issue>) => createIssue(projectId, newIssue),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues', projectId] });
    },
  });
};

export const useUpdateIssue = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ issueId, data }: { issueId: string; data: Partial<Issue> }) => updateIssue(projectId, issueId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['issues', projectId] });
    },
  });
};
