import { useBoclipsClient } from 'src/components/common/BoclipsClientProvider';

export const TrackPageRendered = async (url: string): Promise<void> => {
  const apiClient = useBoclipsClient();
  return apiClient.events.trackPageRendered({ url });
};
