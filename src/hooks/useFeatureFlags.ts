import { useGetUserQuery } from 'src/hooks/api/userQuery';

function useFeatureFlags() {
  const { data: user } = useGetUserQuery();
  return user?.features;
}

export default useFeatureFlags;
