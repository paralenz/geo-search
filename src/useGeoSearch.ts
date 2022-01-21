import { ApiKey, GeoSearchConfig } from './types'
import { DEFAULT_CONFIG } from './constants'
import { GeoSearch, IGeoSearch } from './GeoSearch'

export const useGeoSearch = (
  apiKey: ApiKey,
  config: GeoSearchConfig = DEFAULT_CONFIG
): IGeoSearch => new GeoSearch(apiKey, config)
