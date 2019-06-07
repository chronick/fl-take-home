import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_ID } from '../constants';
import { generateStaticMapboxURL } from './util';

it('returns the correct Mapbox URL', () => {
  const size = '200x200';
  const testString = `http://api.mapbox.com/styles/v1/${MAPBOX_STYLE_ID}/static/pin-m(-83.14542259999999,42.4534577)/-83.14542259999999,42.4534577,10/${size}/?access_token=${MAPBOX_ACCESS_TOKEN}`;
  const params = {
    latLng: {
      lng: -83.14542259999999,
      lat: 42.4534577
    },
    size
  }
  const url = generateStaticMapboxURL(params)

  expect(url).toEqual(testString)
});
