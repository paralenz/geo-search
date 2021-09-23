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

type Coords = {
  lat: number;
  lng: number
}

type Config = {
  language: string
}

type ApiKey = string

const DEFAULT_CONFIG: Config = {
  language: 'en'
}

export type PlaceRequestResponse = {
  result?: {
    geometry?: {
      location: Coords,
      viewport: {
        northeast: Coords;
        southwest: Coords;
      }
    }
  }
}

export type AutoCompleteRequestResponse = {
  // @see: https://developers.google.cn/maps/documentation/places/web-service/autocomplete#PlaceAutocompletePrediction
  predictions: Prediction[];
  // @see: https://developers.google.cn/maps/documentation/places/web-service/autocomplete#PlacesAutocompleteStatus
  status: 'OK'
    | 'ZERO_RESULTS'
    | 'INVALID_REQUEST'
    | 'OVER_QUERY_LIMIT'
    | 'REQUEST_DENIED'
    | 'UNKNOWN_ERROR';
    error_message?: string;
    info_messages?: string[];
}

type PlaceAutocompleteTerm = {
  length: number;
  offset: number;
}

export type Prediction = {
  description: string;
  matched_substrings: PlaceAutocompleteTerm[];
  place_id: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: PlaceAutocompleteTerm[]
    secondary_text: string;
  };
  terms: PlaceAutocompleteTerm[];
  types: PlaceAutocompleteTerm;
  reference?: string;
}

export const useGeoSearch = (apiKey: ApiKey, config: Config = DEFAULT_CONFIG) => new GeoSearch(apiKey, config)

export default class GeoSearch {
  autoCompleteUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json'
  detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json'

  constructor (
    private readonly apiKey: ApiKey,
    private readonly config: Config = DEFAULT_CONFIG
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
    return predictions.map(({ structured_formatting, place_id }: AutoCompleteResponse) => ({
      mainText: structured_formatting.main_text,
      secondaryText: structured_formatting.secondary_text,
      placeId: place_id
    }))
  }
}
