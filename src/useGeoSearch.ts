import { ApiKey, GeoSearchConfig } from '.'
import { DEFAULT_CONFIG } from './constants'
import GeoSearch from './GeoSearch'

export const useGeoSearch = (apiKey: ApiKey, config: GeoSearchConfig = DEFAULT_CONFIG) => new GeoSearch(apiKey, config)
