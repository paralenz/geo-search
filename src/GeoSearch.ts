import fetch from 'node-fetch'

import {
  ApiKey, AutoCompleteRequestResponse, AutoCompleteResponse, GeoSearchConfig, PlaceRequestResponse,
  PlaceResponse, SearchResult
} from '.'
import { DEFAULT_CONFIG, OK } from './constants'

export interface IGeoSearch {
  apiKey: ApiKey
  config: GeoSearchConfig
  autoComplete: (input: string) => Promise<SearchResult[]>
  place: (placeId: string) => Promise<PlaceResponse>,
}
export class GeoSearch implements IGeoSearch {
  readonly autoCompleteUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
  readonly detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json'
  apiKey: ApiKey
  config: GeoSearchConfig

  constructor (
    apiKey: ApiKey,
    config: GeoSearchConfig = DEFAULT_CONFIG
  ) {
    this.apiKey = apiKey
    this.config = config
  }

  autoComplete = async (input: string): Promise<SearchResult[]> => {
    if (!input && input.length === 0) {
      throw new Error("Missing input")
    }
    const url = `${this.autoCompleteUrl}?language=${this.config.language}&input=${input}`
    const response = await this.fetch<AutoCompleteRequestResponse>(url)

    return this.formatAutoCompleteResponse(response.predictions)
  }

  place = async (placeId: string): Promise<PlaceResponse> => {
    if (!placeId) {
      throw new Error('Missing placeId')
    }
    const url = `${this.detailsUrl}?placeid=${placeId}`
    const { result } = await this.fetch<PlaceRequestResponse>(url)

    if (!result) {
      throw new Error('No result')
    }

    return {
      latitude: result?.geometry?.location.lat,
      longitude: result?.geometry?.location.lng,
      ...this.calculateDeltas(result?.geometry)
    }
  }

  calculateDeltas = (geometry: PlaceRequestResponse['result']['geometry']) => {
    return {
      latitudeDelta: geometry?.viewport.northeast.lat - geometry?.viewport.southwest.lat,
      longitudeDelta: geometry?.viewport.northeast.lng - geometry?.viewport.southwest.lng
    }
  }

  fetch = async <T = unknown>(url: string): Promise<T> => {
    if (!this.apiKey) {
      throw new Error('Missing apiKey')
    }

    const response = await fetch(`${url}&key=${this.apiKey}`)

    if (response?.status !== OK) {
      throw new Error('No result')
    }

    const json = await response.json()
    return json
  }

  formatAutoCompleteResponse = (predictions: AutoCompleteResponse[]) => {
    return predictions.map(({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      structured_formatting: { main_text, secondary_text },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      place_id
    }: AutoCompleteResponse) => ({
      mainText: main_text,
      secondaryText: secondary_text,
      placeId: place_id
    }))
  }
}
