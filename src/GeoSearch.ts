import fetch from 'node-fetch'
import { DEFAULT_CONFIG, HTTP_STATUS_OK, AUTO_COMPLETE_URL, PLACE_DETAILS_URL } from './constants'
import {
  ApiKey, AutoCompleteRequestResponse, AutoCompleteResponse, GeoSearchConfig, PlaceRequestResponse,
  PlaceResponse, SearchResult
} from './types'

export interface IGeoSearch {
  apiKey: ApiKey
  config: GeoSearchConfig
  autoComplete: (input: string) => Promise<SearchResult[]>
  place: (placeId: string) => Promise<PlaceResponse>,
}
export class GeoSearch implements IGeoSearch {
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
      throw new Error('Missing input')
    }

    const response = await this.fetch<AutoCompleteRequestResponse>(
      `${AUTO_COMPLETE_URL}?language=${this.config.language}&input=${input}`
    )

    return this.formatAutoCompleteResponse(response.predictions)
  }

  place = async (placeId: string): Promise<PlaceResponse> => {
    if (!placeId) {
      throw new Error('Missing placeId')
    }

    const { result } = await this.fetch<PlaceRequestResponse>(`${PLACE_DETAILS_URL}?placeid=${placeId}`)

    if (!result) {
      throw new Error('No result')
    }

    return this.coordinates(result.geometry)
  }

  coordinates = ({ location, viewport }: PlaceRequestResponse['result']['geometry']) => {
    return {
      latitude: location.lat,
      longitude: location.lng,
      ...this.calculateDeltas(viewport)
    }
  }

  calculateDeltas = ({ northeast, southwest }: PlaceRequestResponse['result']['geometry']['viewport']) => {
    return {
      latitudeDelta: northeast.lat - southwest.lat,
      longitudeDelta: northeast.lng - (southwest.lng - this.deltaCompensation({ northeast, southwest }))
    }
  }

  deltaCompensation = ({ northeast, southwest }: PlaceRequestResponse['result']['geometry']['viewport']): number => {
    return southwest.lng > northeast.lng
      ? 360
      : 0
  }

  fetch = async <T = unknown>(url: string): Promise<T> => {
    if (!this.apiKey) {
      throw new Error('Missing apiKey')
    }

    const response = await fetch(`${url}&key=${this.apiKey}`)

    if (response?.status !== HTTP_STATUS_OK) {
      throw new Error('No result')
    }

    const json = await response.json()
    return json
  }

  formatAutoCompleteResponse = (predictions: AutoCompleteResponse[]) => {
    return predictions.map(({
      structured_formatting: { main_text, secondary_text },
      place_id
    }: AutoCompleteResponse) => ({
      mainText: main_text,
      secondaryText: secondary_text,
      placeId: place_id
    }))
  }
}
