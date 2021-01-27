import {
  Facet,
  VideoFacets,
} from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import React from 'react';
import { Filters } from 'src/hooks/useFilterOptions';
import { SearchFilters } from 'src/hooks/useLocationParams';
import { DEFAULT_DURATIONS } from 'src/types/DefaultDurations';
import { FilterOption } from 'src/types/FilterOption';

export const convertFacets = (
  facets?: VideoFacets,
  filters?: SearchFilters,
): Filters => {
  const safeFacets = {
    channels: facets?.channels || [],
    subjects: facets?.subjects || [],
    videoTypes: facets?.videoTypes || [],
    durations: facets?.durations || [],
  };

  return {
    channels: safeFacets.channels.map((it) =>
      convertFacet(it, filters?.channel),
    ),
    subjects: safeFacets.subjects.map((it) =>
      convertFacet(it, filters?.subject),
    ),
    videoTypes: safeFacets.videoTypes.map((it) =>
      convertFacet(it, filters?.video_type, getVideoTypeLabel),
    ),
    durations: safeFacets.durations.map((it) =>
      convertFacet(it, filters?.duration, getDurationLabel),
    ),
  };
};

const convertFacet = (
  facet: Facet,
  selectedIds: string[] = [],
  convertName?: (rawName: string) => string,
): FilterOption => {
  const name = convertName ? convertName(facet.name) : facet.name;
  return {
    name,
    label: <span>{name}</span>,
    hits: facet.hits,
    id: facet.id,
    isSelected: selectedIds.includes(facet.id),
  };
};

const getVideoTypeLabel = (name: string): string => {
  switch (name.toUpperCase()) {
    case 'INSTRUCTIONAL':
      return 'Educational';
    case 'STOCK':
      return 'Raw Footage';
    case 'NEWS':
      return 'News';
    default:
      return name;
  }
};

const getDurationLabel = (name: string): string => {
  switch (name) {
    case DEFAULT_DURATIONS[0]:
      return 'Up to 1 min';
    case DEFAULT_DURATIONS[1]:
      return '1 - 5 min';
    case DEFAULT_DURATIONS[2]:
      return '5 - 10 min';
    case DEFAULT_DURATIONS[3]:
      return '10 - 20 min';
    case DEFAULT_DURATIONS[4]:
      return '20 min +';
    default:
      return name;
  }
};
