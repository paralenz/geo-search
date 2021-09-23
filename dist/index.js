"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGeoSearch = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const node_fetch_1 = __importDefault(require("node-fetch"));
const OK = 200;
const DEFAULT_CONFIG = {
    language: 'en'
};
const useGeoSearch = (apiKey, config = DEFAULT_CONFIG) => new GeoSearch(apiKey, config);
exports.useGeoSearch = useGeoSearch;
class GeoSearch {
    apiKey;
    config;
    autoCompleteUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
    detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
    constructor(apiKey, config = DEFAULT_CONFIG) {
        this.apiKey = apiKey;
        this.config = config;
    }
    autoComplete = async (input) => {
        if (!input) {
            throw new Error('Missing input');
        }
        const url = `${this.autoCompleteUrl}?language=${this.config.language}&input=${input}`;
        const response = await this.fetch(url);
        return this.formatAutoCompleteResponse(response.predictions);
    };
    place = async (placeId) => {
        if (!placeId) {
            throw new Error('Missing placeId');
        }
        const { result } = await this.fetch(`${this.detailsUrl}?placeid=${placeId}`);
        if (!result) {
            throw new Error('No result');
        }
        return {
            latitude: result?.geometry?.location.lat,
            longitude: result?.geometry?.location.lng,
            latitudeDelta: result?.geometry?.viewport.northeast.lat - result?.geometry?.viewport.southwest.lat,
            longitudeDelta: result?.geometry?.viewport.northeast.lng - result?.geometry?.viewport.southwest.lng
        };
    };
    fetch = async (url) => {
        if (!this.apiKey) {
            throw new Error('Missing apiKey');
        }
        const response = await node_fetch_1.default(`${url}&key=${this.apiKey}`);
        if (response?.status !== OK) {
            throw new Error('No result');
        }
        const json = await response.json();
        return json;
    };
    formatAutoCompleteResponse = (predictions) => {
        return predictions.map(({ structured_formatting, place_id }) => ({
            mainText: structured_formatting.main_text,
            secondaryText: structured_formatting.secondary_text,
            placeId: place_id
        }));
    };
}
exports.default = GeoSearch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx5REFBeUQ7QUFDekQsNERBQThCO0FBRTlCLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQTtBQWtDZCxNQUFNLGNBQWMsR0FBVztJQUM3QixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUE7QUErQ00sTUFBTSxZQUFZLEdBQUcsQ0FBQyxNQUFjLEVBQUUsU0FBaUIsY0FBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFBakcsUUFBQSxZQUFZLGdCQUFxRjtBQUU5RyxNQUFxQixTQUFTO0lBS1Q7SUFDQTtJQUxuQixlQUFlLEdBQUcsOERBQThELENBQUE7SUFDaEYsVUFBVSxHQUFHLHlEQUF5RCxDQUFBO0lBRXRFLFlBQ21CLE1BQWMsRUFDZCxTQUFpQixjQUFjO1FBRC9CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUF5QjtJQUMvQyxDQUFDO0lBRUosWUFBWSxHQUFHLEtBQUssRUFBRSxLQUFhLEVBQTJCLEVBQUU7UUFDOUQsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUE7U0FDakM7UUFDRCxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLGFBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLFVBQVUsS0FBSyxFQUFFLENBQUE7UUFDckYsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUE4QixHQUFHLENBQUMsQ0FBQTtRQUVuRSxPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDOUQsQ0FBQyxDQUFBO0lBRUQsS0FBSyxHQUFHLEtBQUssRUFBRSxPQUFlLEVBQTBCLEVBQUU7UUFDeEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtTQUNuQztRQUVELE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQXVCLEdBQUcsSUFBSSxDQUFDLFVBQVUsWUFBWSxPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBRWxHLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1NBQzdCO1FBRUQsT0FBTztZQUNMLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHO1lBQ3hDLFNBQVMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxHQUFHO1lBQ3pDLGFBQWEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHO1lBQ2xHLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHO1NBQ3BHLENBQUE7SUFDSCxDQUFDLENBQUE7SUFFTyxLQUFLLEdBQUcsS0FBSyxFQUFlLEdBQVcsRUFBYyxFQUFFO1FBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtTQUNsQztRQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sb0JBQUssQ0FBQyxHQUFHLEdBQUcsUUFBUSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUV6RCxJQUFJLFFBQVEsRUFBRSxNQUFNLEtBQUssRUFBRSxFQUFFO1lBQzNCLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7U0FDN0I7UUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNsQyxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUMsQ0FBQTtJQUVPLDBCQUEwQixHQUFHLENBQUMsV0FBbUMsRUFBRSxFQUFFO1FBQzNFLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUF3QixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JGLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxTQUFTO1lBQ3pDLGFBQWEsRUFBRSxxQkFBcUIsQ0FBQyxjQUFjO1lBQ25ELE9BQU8sRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFBO0NBQ0Y7QUE1REQsNEJBNERDIn0=