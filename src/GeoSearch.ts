import fetch from 'node-fetch'

import {
  ApiKey, AutoCompleteRequestResponse, AutoCompleteResponse, GeoSearchConfig, PlaceRequestResponse,
  PlaceResponse, SearchResult
} from '.'
import { DEFAULT_CONFIG, OK } from './constants'

export default class GeoSearch {
  autoCompleteUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
  detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json'

  constructor (
    private readonly apiKey: ApiKey,
    private readonly config: GeoSearchConfig = DEFAULT_CONFIG
  ) {}

  autoComplete = async (input: string): Promise<SearchResult[]> => {
    if (!input) {
      throw new Error('Missing input')
    }
    const url = `${this.autoCompleteUrl}?language=${this.config.language}&input=${input}`
    const response = await this.fetch<AutoCompleteRequestResponse>(url)

    return this.formatAutoCompleteResponse(response.predictions)
  }

  place = async (placeId: string): Promise<PlaceResponse> => {
    if (!placeId) {
      throw new Error('Missing placeId')
    }

    const { result } = await this.fetch<PlaceRequestResponse>(`${this.detailsUrl}?placeid=${placeId}`)

    if (!result) {
      throw new Error('No result')
    }

    return {
      latitude: result?.geometry?.location.lat,
      longitude: result?.geometry?.location.lng,
      latitudeDelta: result?.geometry?.viewport.northeast.lat - result?.geometry?.viewport.southwest.lat,
      longitudeDelta: result?.geometry?.viewport.northeast.lng - result?.geometry?.viewport.southwest.lng
    }
  }

  private fetch = async <T = unknown>(url: string): Promise<T> => {
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

  private formatAutoCompleteResponse = (predictions: AutoCompleteResponse[]) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    return predictions.map(({ structured_formatting, place_id }: AutoCompleteResponse) => ({
      mainText: structured_formatting.main_text,
      secondaryText: structured_formatting.secondary_text,
      placeId: place_id
    }))
  }
}
