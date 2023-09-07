export const centerLat = 38.925;
export const centerLong = 35.41;
export const minLat = 35.81;
export const maxLat = 42.11;
export const minLon = 25.66;
export const maxLon = 44.81;

export function isWithinTurkeyBounds(latitude: number, longitude: number) {
  return latitude >= minLat && latitude <= maxLat && longitude >= minLon && longitude <= maxLon;
}
