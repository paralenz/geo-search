export type SearchResult = {
    mainText: string;
    secondaryText: string;
    placeId: string;
  }

export type AutoCompleteResponse = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  structured_formatting: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    main_text: string
    // eslint-disable-next-line @typescript-eslint/naming-convention
    secondary_text: string
  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  place_id: string
  };

export type PlaceResponse = {
    longitude: number
    latitude: number
    longitudeDelta: number
    latitudeDelta: number
  }

export type Coords = {
    lat: number;
    lng: number
  }

export type GeoSearchConfig = {
    language: string
  }

export type ApiKey = string

export type PlaceRequestResponse = {
    result: {
      geometry: {
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    error_message?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    info_messages?: string[];
  }

  type PlaceAutocompleteTerm = {
    length: number;
    offset: number;
  }

export type Prediction = {
  description: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  matched_substrings: PlaceAutocompleteTerm[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  place_id: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  structured_formatting: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    main_text: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    main_text_matched_substrings: PlaceAutocompleteTerm[]
    // eslint-disable-next-line @typescript-eslint/naming-convention
    secondary_text: string;
  };
  terms: PlaceAutocompleteTerm[];
  types: PlaceAutocompleteTerm;
  reference?: string;
}
