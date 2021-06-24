/* eslint-disable @typescript-eslint/naming-convention */
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
  constructor (
    private readonly apiKey: ApiKey,
    private readonly config: Config = DEFAULT_CONFIG
  ) {}

  autoComplete = async (input: string): Promise<SearchResult[]> => {
    if (!input) {
      throw new Error('Missing input')
    }

    // eslint-disable-next-line max-len
    const response = await this.fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?language=${this.config.language}&input=${input}`)

    return this.formatAutoCompleteResponse(response.predictions)
  }

  place = async (placeId: string): Promise<PlaceResponse> => {
    if (!placeId) {
      throw new Error('Missing placeId')
    }

    const { result } = await this.fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}`)

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private fetch = async (url: string): Promise<any> => {
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
    return predictions.map(({ structured_formatting, place_id }: AutoCompleteResponse) => ({
      mainText: structured_formatting.main_text,
      secondaryText: structured_formatting.secondary_text,
      placeId: place_id
    }))
  }
}
