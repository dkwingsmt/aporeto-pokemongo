export function gpsToText(gps) {
  return gps.name ? gps.name :
    `${(gps.lon||0).toFixed(2)}, ${(gps.lat||0).toFixed(2)}`
}
