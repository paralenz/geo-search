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
declare type Config = {
    language: string;
};
declare type ApiKey = string;
export declare const useGeoSearch: (apiKey: ApiKey, config?: Config) => GeoSearch;
export default class GeoSearch {
    private readonly apiKey;
    private readonly config;
    constructor(apiKey: ApiKey, config?: Config);
    autoComplete: (input: string) => Promise<SearchResult[]>;
    place: (placeId: string) => Promise<PlaceResponse>;
    private fetch;
    private formatAutoCompleteResponse;
}
export {};
