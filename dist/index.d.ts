export declare type SearchResult = {
    mainText: string;
    secondaryText: string;
    placeId: string;
};
export declare type PlaceResponse = {
    longitude: number;
    latitude: number;
    longitudeDelta: number;
    latitudeDelta: number;
};
declare type Coords = {
    lat: number;
    lng: number;
};
declare type Config = {
    language: string;
};
declare type ApiKey = string;
export declare type PlaceRequestResponse = {
    result?: {
        geometry?: {
            location: Coords;
            viewport: {
                northeast: Coords;
                southwest: Coords;
            };
        };
    };
};
export declare type AutoCompleteRequestResponse = {
    predictions: Prediction[];
    status: 'OK' | 'ZERO_RESULTS' | 'INVALID_REQUEST' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'UNKNOWN_ERROR';
    error_message?: string;
    info_messages?: string[];
};
declare type PlaceAutocompleteTerm = {
    length: number;
    offset: number;
};
export declare type Prediction = {
    description: string;
    matched_substrings: PlaceAutocompleteTerm[];
    place_id: string;
    structured_formatting: {
        main_text: string;
        main_text_matched_substrings: PlaceAutocompleteTerm[];
        secondary_text: string;
    };
    terms: PlaceAutocompleteTerm[];
    types: PlaceAutocompleteTerm;
    reference?: string;
};
export declare const useGeoSearch: (apiKey: ApiKey, config?: Config) => GeoSearch;
export default class GeoSearch {
    private readonly apiKey;
    private readonly config;
    autoCompleteUrl: string;
    detailsUrl: string;
    constructor(apiKey: ApiKey, config?: Config);
    autoComplete: (input: string) => Promise<SearchResult[]>;
    place: (placeId: string) => Promise<PlaceResponse>;
    private fetch;
    private formatAutoCompleteResponse;
}
export {};
