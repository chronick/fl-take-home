import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_ID } from '../constants';

export function generateStaticMapboxURL({ latLng, size, zoom = 10 }) {
  const { lng, lat } = latLng;

  return [
    `http://api.mapbox.com/styles/v1/${MAPBOX_STYLE_ID}/static/`, // boilerplate
    `pin-m(${lng},${lat})/`, // marker type: oneOf(['pin-s', 'pin-m', 'pin-l'])
    `${lng},${lat},${zoom}/`, // image map center
    `${size}/`, // image size
    `?access_token=${MAPBOX_ACCESS_TOKEN}`
  ].join('')
}
