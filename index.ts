/* eslint-disable @typescript-eslint/naming-convention */
import { URL } from 'url'
import fetch from 'node-fetch'

const OK = 200

export type SearchResult = {
  mainText: string;
  secondaryText: string;
  placeId: string;
}

type AutoCompleteResponse = {
    structured_formatting: {
      main_text: string
      secondary_text: string
    }
    place_id: string
};

export type PlaceResponse = {
  longitude: number
  latitude: number
  longitudeDelta: number
  latitudeDelta: number
}

type Config = {
  language: string
}
type ApiKey = string

const DEFAULT_CONFIG: Config = {
  language: 'en'
}

export const useGeoSearch = (apiKey: ApiKey, config: Config = DEFAULT_CONFIG) => new GeoSearch(apiKey, config)

export default class GeoSearch {
  private autoCompleteUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
  private placeUrl = 'https://maps.googleapis.com/maps/api/place/details/json'

  constructor (
    private readonly apiKey: ApiKey,
    private readonly config: Config = DEFAULT_CONFIG
  ) {}

  autoComplete = async (input: string): Promise<SearchResult[]> => {
    if (!input) {
      throw new Error('Missing input')
    }
    const url = new URL(this.autoCompleteUrl)
    url.searchParams.append('language', this.config.language)
    url.searchParams.append('input', input)

    const response = await this.fetch(url)

    return this.formatAutoCompleteResponse(response.predictions)
  }

  place = async (placeId: string): Promise<PlaceResponse> => {
    if (!placeId) {
      throw new Error('Missing placeId')
    }
    const url = new URL(this.placeUrl)
    url.searchParams.append('placeid', placeId)

    const { result } = await this.fetch(url)
    const { geometry } = result

    return {
      latitude: geometry.location.lat,
      longitude: geometry.location.lng,
      latitudeDelta: geometry.viewport.northeast.lat - geometry.viewport.southwest.lat,
      longitudeDelta: geometry.viewport.northeast.lng - geometry.viewport.southwest.lng
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private fetch = async (url: URL): Promise<any> => {
    if (!this.apiKey) {
      throw new Error('Missing apiKey')
    }

    url.searchParams.append('key', this.apiKey)

    const response = await fetch(url.toString())

    if (response?.status !== OK) {
      throw new Error('No result')
    }

    return await response.json()
  }

  private formatAutoCompleteResponse = (predictions: AutoCompleteResponse[]) => {
    return predictions.map(({ structured_formatting, place_id }: AutoCompleteResponse) => ({
      mainText: structured_formatting.main_text,
      secondaryText: structured_formatting.secondary_text,
      placeId: place_id
    }))
  }
}
