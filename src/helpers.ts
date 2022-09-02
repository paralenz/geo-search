import { CIRCOMFERENCE, ONE_DEFREE_OF_LATITUDE_IN_METERS } from './constants'
import { RegionFrom } from './types'

export const regionFrom = ({ latitude, longitude }: RegionFrom, distance: number) => {
  const angularDistance = distance / CIRCOMFERENCE

  const latitudeDelta = distance / ONE_DEFREE_OF_LATITUDE_IN_METERS
  const longitudeDelta = Math.abs(Math.atan2(
    Math.sin(angularDistance) * Math.cos(latitude),
    Math.cos(angularDistance) - Math.sin(latitude) * Math.sin(latitude)))

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta
  }
}

export const zoomToAltitude = (zoom: number) => {
  // see: google.maps.v3.all.debug.js
  return Math.max(35200000 / 2 ** zoom, 300)
}
