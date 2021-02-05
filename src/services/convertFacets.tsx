import {
  Facet,
  VideoFacets,
} from 'boclips-api-client/dist/sub-clients/videos/model/VideoFacets';
import React from 'react';
import { Filters } from 'src/hooks/useFilterOptions';
import { SearchFilters } from 'src/hooks/useLocationParams';
import { DEFAULT_DURATIONS } from 'src/types/DefaultDurations';
import { FilterOption } from 'src/types/FilterOption';
import { createPriceDisplayValue } from 'src/services/createPriceDisplayValue';
import { FilterKey } from 'src/types/search/FilterKey';

export const convertFacets = (
  facets?: VideoFacets,
  filters?: SearchFilters,
): Filters => {
  const safeFacets = {
    channels: facets?.channels || [],
    subjects: facets?.subjects || [],
    videoTypes: facets?.videoTypes || [],
    durations: facets?.durations || [],
    prices: facets?.prices || [],
  };

  return {
    channels: safeFacets.channels.map((it) =>
      convertFacet(it, filters?.channel, 'channel'),
    ),
    subjects: safeFacets.subjects.map((it) =>
      convertFacet(it, filters?.subject, 'subject'),
    ),
    videoTypes: safeFacets.videoTypes.map((it) =>
      convertFacet(it, filters?.video_type, 'video_type', getVideoTypeLabel),
    ),
    durations: safeFacets.durations.map((it) =>
      convertFacet(it, filters?.duration, 'duration', getDurationLabel),
    ),
    prices: safeFacets.prices.map((price) =>
      convertFacet(price, filters?.prices, 'prices', getPriceLabel),
    ),
  };
};

const convertFacet = (
  facet: Facet,
  selectedIds: string[] = [],
  filterKey: FilterKey,
  convertName?: (rawName: string) => string,
): FilterOption => {
  const name = convertName ? convertName(facet.name) : facet.name;
  return {
    name,
    label: <span>{name}</span>,
    hits: facet.hits,
    id: facet.id,
    isSelected: selectedIds.includes(facet.id),
    key: filterKey,
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

const getPriceLabel = (name: string): string => {
  const price = `${name.slice(0, name.length - 2)}.${name.slice(
    name.length - 2,
  )}`;
  return createPriceDisplayValue(parseFloat(price), 'USD') || name;
};
