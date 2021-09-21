# @paralenz/geo-search
Utility class to easily perform google search


## Installation
```
yarn add @paralenz/geo-search
// or
npm install @paralenz/geo-search
```

## Prerequisites
You will need an google maps api code to use this library


## Usage
This package can be used in two ways. By instansiating the GeoSearch class or by using the `useGeoSearch` hook.

### Auto complete
The `autoComplete` method lets you use google autocomplete api to perform a search.
This method returns a `Promise`
```ts
import GeoSearch from '@paralenz/geo-search'

// Using the class
const { autoComplete } = new GeoSearch(__GOOGLE_API_KEY__)

// Using the hook
const { autoComplete } = useGeoSearch(__GOOGLE_API_KEY__)

await autoComplete('Paralenz')
```

### Place
The `place` method lets you use google places api to perform a search by a place id
This method returns a `Promise`
```ts
import GeoSearch from '@paralenz/geo-search'

// Using the class
const { place } = new GeoSearch(__GOOGLE_API_KEY__)

// Using the hook
const { place } = useGeoSearch(__GOOGLE_API_KEY__)

await place('__PLACE_ID__')
```
