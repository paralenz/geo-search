"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGeoSearch = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
var node_fetch_1 = __importDefault(require("node-fetch"));
var OK = 200;
var DEFAULT_CONFIG = {
    language: 'en'
};
var useGeoSearch = function (apiKey, config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    return new GeoSearch(apiKey, config);
};
exports.useGeoSearch = useGeoSearch;
var GeoSearch = /** @class */ (function () {
    function GeoSearch(apiKey, config) {
        var _this = this;
        if (config === void 0) { config = DEFAULT_CONFIG; }
        this.apiKey = apiKey;
        this.config = config;
        this.autoComplete = function (input) { return __awaiter(_this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!input) {
                            throw new Error('Missing input');
                        }
                        return [4 /*yield*/, this.fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?language=" + this.config.language + "&input=" + input)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, this.formatAutoCompleteResponse(response.predictions)];
                }
            });
        }); };
        this.place = function (placeId) { return __awaiter(_this, void 0, void 0, function () {
            var result;
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!placeId) {
                            throw new Error('Missing placeId');
                        }
                        return [4 /*yield*/, this.fetch("https://maps.googleapis.com/maps/api/place/details/json?placeid=" + placeId)];
                    case 1:
                        result = (_g.sent()).result;
                        if (!result) {
                            throw new Error('No result');
                        }
                        return [2 /*return*/, {
                                latitude: (_a = result === null || result === void 0 ? void 0 : result.geometry) === null || _a === void 0 ? void 0 : _a.location.lat,
                                longitude: (_b = result === null || result === void 0 ? void 0 : result.geometry) === null || _b === void 0 ? void 0 : _b.location.lng,
                                latitudeDelta: ((_c = result === null || result === void 0 ? void 0 : result.geometry) === null || _c === void 0 ? void 0 : _c.viewport.northeast.lat) - ((_d = result === null || result === void 0 ? void 0 : result.geometry) === null || _d === void 0 ? void 0 : _d.viewport.southwest.lat),
                                longitudeDelta: ((_e = result === null || result === void 0 ? void 0 : result.geometry) === null || _e === void 0 ? void 0 : _e.viewport.northeast.lng) - ((_f = result === null || result === void 0 ? void 0 : result.geometry) === null || _f === void 0 ? void 0 : _f.viewport.southwest.lng)
                            }];
                }
            });
        }); };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.fetch = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var response, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.apiKey) {
                            throw new Error('Missing apiKey');
                        }
                        return [4 /*yield*/, node_fetch_1.default(url + "&key=" + this.apiKey)];
                    case 1:
                        response = _a.sent();
                        if ((response === null || response === void 0 ? void 0 : response.status) !== OK) {
                            throw new Error('No result');
                        }
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, json];
                }
            });
        }); };
        this.formatAutoCompleteResponse = function (predictions) {
            return predictions.map(function (_a) {
                var structured_formatting = _a.structured_formatting, place_id = _a.place_id;
                return ({
                    mainText: structured_formatting.main_text,
                    secondaryText: structured_formatting.secondary_text,
                    placeId: place_id
                });
            });
        };
    }
    return GeoSearch;
}());
exports.default = GeoSearch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5REFBeUQ7QUFDekQsMERBQThCO0FBRTlCLElBQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQTtBQTRCZCxJQUFNLGNBQWMsR0FBVztJQUM3QixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUE7QUFFTSxJQUFNLFlBQVksR0FBRyxVQUFDLE1BQWMsRUFBRSxNQUErQjtJQUEvQix1QkFBQSxFQUFBLHVCQUErQjtJQUFLLE9BQUEsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztBQUE3QixDQUE2QixDQUFBO0FBQWpHLFFBQUEsWUFBWSxnQkFBcUY7QUFFOUc7SUFDRSxtQkFDbUIsTUFBYyxFQUNkLE1BQStCO1FBRmxELGlCQUdJO1FBRGUsdUJBQUEsRUFBQSx1QkFBK0I7UUFEL0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQXlCO1FBR2xELGlCQUFZLEdBQUcsVUFBTyxLQUFhOzs7Ozt3QkFDakMsSUFBSSxDQUFDLEtBQUssRUFBRTs0QkFDVixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO3lCQUNqQzt3QkFHZ0IscUJBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQywyRUFBeUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLGVBQVUsS0FBTyxDQUFDLEVBQUE7O3dCQUEzSSxRQUFRLEdBQUcsU0FBZ0k7d0JBRWpKLHNCQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUE7OzthQUM3RCxDQUFBO1FBRUQsVUFBSyxHQUFHLFVBQU8sT0FBZTs7Ozs7O3dCQUM1QixJQUFJLENBQUMsT0FBTyxFQUFFOzRCQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTt5QkFDbkM7d0JBRWtCLHFCQUFNLElBQUksQ0FBQyxLQUFLLENBQUMscUVBQW1FLE9BQVMsQ0FBQyxFQUFBOzt3QkFBekcsTUFBTSxHQUFLLENBQUEsU0FBOEYsQ0FBQSxPQUFuRzt3QkFFZCxJQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7eUJBQzdCO3dCQUVELHNCQUFPO2dDQUNMLFFBQVEsRUFBRSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxRQUFRLDBDQUFFLFFBQVEsQ0FBQyxHQUFHO2dDQUN4QyxTQUFTLEVBQUUsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsUUFBUSwwQ0FBRSxRQUFRLENBQUMsR0FBRztnQ0FDekMsYUFBYSxFQUFFLENBQUEsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsUUFBUSwwQ0FBRSxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBRyxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxRQUFRLDBDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFBO2dDQUNsRyxjQUFjLEVBQUUsQ0FBQSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxRQUFRLDBDQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFHLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFFBQVEsMENBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUE7NkJBQ3BHLEVBQUE7OzthQUNGLENBQUE7UUFFRCw4REFBOEQ7UUFDdEQsVUFBSyxHQUFHLFVBQU8sR0FBVzs7Ozs7d0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFOzRCQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7eUJBQ2xDO3dCQUVnQixxQkFBTSxvQkFBSyxDQUFJLEdBQUcsYUFBUSxJQUFJLENBQUMsTUFBUSxDQUFDLEVBQUE7O3dCQUFuRCxRQUFRLEdBQUcsU0FBd0M7d0JBRXpELElBQUksQ0FBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsTUFBTSxNQUFLLEVBQUUsRUFBRTs0QkFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTt5QkFDN0I7d0JBRVkscUJBQU0sUUFBUSxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBNUIsSUFBSSxHQUFHLFNBQXFCO3dCQUNsQyxzQkFBTyxJQUFJLEVBQUE7OzthQUNaLENBQUE7UUFFTywrQkFBMEIsR0FBRyxVQUFDLFdBQW1DO1lBQ3ZFLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQXlEO29CQUF2RCxxQkFBcUIsMkJBQUEsRUFBRSxRQUFRLGNBQUE7Z0JBQTZCLE9BQUEsQ0FBQztvQkFDckYsUUFBUSxFQUFFLHFCQUFxQixDQUFDLFNBQVM7b0JBQ3pDLGFBQWEsRUFBRSxxQkFBcUIsQ0FBQyxjQUFjO29CQUNuRCxPQUFPLEVBQUUsUUFBUTtpQkFDbEIsQ0FBQztZQUpvRixDQUlwRixDQUFDLENBQUE7UUFDTCxDQUFDLENBQUE7SUF0REUsQ0FBQztJQXVETixnQkFBQztBQUFELENBQUMsQUEzREQsSUEyREMifQ==