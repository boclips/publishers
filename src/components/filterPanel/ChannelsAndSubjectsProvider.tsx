import React, { createContext, useContext } from 'react';
import { PAGE_SIZE } from 'src/views/search/SearchResultsView';
import { useSearchQuery } from 'src/hooks/api/useSearchQuery';
import { VideoSearchResults } from 'boclips-api-client/dist/sub-clients/videos/model/VideoSearchResults';

interface Props {
  query: string;
  children: React.ReactNode;
}
export const channelsAndSubjectsContext = createContext<
  VideoSearchResults | undefined
>(null);

export const ChannelsAndSubjectsProvider = ({ children, query }: Props) => {
  const { data } = useSearchQuery({
    query,
    page: 1,
    pageSize: PAGE_SIZE,
    filters: {
      channel: [],
      duration: [],
      prices: [],
      subject: [],
      video_type: [],
    },
  });

  return (
    <channelsAndSubjectsContext.Provider value={data}>
      {children}
    </channelsAndSubjectsContext.Provider>
  );
};

export const useChannelsAndSubjectsProvider = () =>
  useContext(channelsAndSubjectsContext);
