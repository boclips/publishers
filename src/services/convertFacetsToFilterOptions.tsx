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

export const convertFacetsToFilterOptions = (
  facets?: VideoFacets,
  appliedFilters?: SearchFilters,
): Filters => {
  const safeFacets = {
    channels: facets?.channels || [],
    subjects: facets?.subjects || [],
    videoTypes: facets?.videoTypes || [],
    durations: facets?.durations || [],
    prices: facets?.prices || [],
  };

  return {
    channels: createFilterOptions(
      safeFacets.channels,
      appliedFilters?.channel || [],
      'channel',
    ),
    subjects: createFilterOptions(
      safeFacets.subjects,
      appliedFilters?.subject || [],
      'subject',
    ),
    videoTypes: createFilterOptions(
      safeFacets.videoTypes,
      appliedFilters?.video_type || [],
      'video_type',
      getVideoTypeLabel,
    ),
    durations: createFilterOptions(
      safeFacets.durations,
      appliedFilters?.duration || [],
      'duration',
      getDurationLabel,
    ),
    prices: createFilterOptions(
      safeFacets.prices,
      appliedFilters?.prices || [],
      'prices',
      getPriceLabel,
    ),
  };
};

const createFilterOptions = (
  facetsForOneCategory: Facet[],
  selectedFiltersIds: string[],
  filterKey: FilterKey,
  convertName?: (rawName: string) => string,
): FilterOption[] =>
  facetsForOneCategory.map((facet) => {
    const name = convertName ? convertName(facet.name) : facet.name;
    return {
      name,
      label: <span>{name}</span>,
      hits: facet.hits,
      id: facet.id,
      isSelected: selectedFiltersIds.includes(facet.id),
      key: filterKey,
    };
  });

export const getFilterLabel = (key, id, originalFacets) => {
  // TODO: MOVE STRING TO VARS
  switch (key) {
    case 'video_type':
      return getVideoTypeLabel(id);
    case 'duration':
      return getDurationLabel(id);
    case 'prices':
      return getPriceLabel(id);
    case 'channel':
      return getChannelLabel(id, originalFacets);
    case 'subject':
      return getSubjectsLabel(id, originalFacets);
    default:
      throw 'not supported filter key';
  }
};

const getChannelLabel = (id, originalFacets) => {
  return originalFacets.facets.channels.find((it) => it.id === id).name;
};

const getSubjectsLabel = (id, originalFacets) => {
  return originalFacets.facets.subjects.find((it) => it.id === id).name;
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
