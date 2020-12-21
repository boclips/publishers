import { ApiClientWrapper } from 'src/services/apiClientWrapper';
import { useQuery } from 'react-query';

export const doGetUser = () => {
  return ApiClientWrapper.get().then((client) => {
    return client.users.getCurrentUser();
  });
};

export const useGetUserQuery = () => {
  return useQuery('user', async () => doGetUser());
};
