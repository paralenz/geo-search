/* eslint-disable @typescript-eslint/naming-convention */
export type SearchResult = {
    mainText: string;
    secondaryText: string;
    placeId: string;
}

export type AutoCompleteResponse = {
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

export type RegionFrom = {
  latitude: number
  longitude: number
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
  status:
  | 'OK'
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
