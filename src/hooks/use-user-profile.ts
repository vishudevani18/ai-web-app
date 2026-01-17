// User profile hook using React Query
// Fetches user profile from API and manages caching

import { useQuery } from '@tanstack/react-query';
import { getProfile, type UserProfile } from '@/lib/auth';

export const useUserProfile = () => {
  return useQuery<UserProfile>({
    queryKey: ['user-profile'],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes - credits only change after generation/login
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: true, // Refetch when component mounts (first load)
    retry: 1, // Retry once on failure
  });
};
