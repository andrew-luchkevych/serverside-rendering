import { FILTERS_FETCH, FILTERS_SUCCESS, FILTERS_FAILED } from './constants';

export const loadFilters = () => ({
	type: FILTERS_FETCH,
});

export const filtersLoaded = (objectsTypes: any[]) => ({
	type: FILTERS_SUCCESS,
	payload: objectsTypes,
});

export const setError = (error: Error) => ({
	type: FILTERS_FAILED,
	payload: error,
});
