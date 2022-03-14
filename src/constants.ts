import { GeoSearchConfig } from './types'

export const DEFAULT_CONFIG: GeoSearchConfig = {
  language: 'en'
}

export const HTTP_STATUS_OK = 200
export const CIRCOMFERENCE = 40075
export const ONE_DEFREE_OF_LATITUDE_IN_METERS = 111320
export const AUTO_COMPLETE_URL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
export const PLACE_DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json'
