import React, { Component } from 'react';
import { prop, find } from 'ramda';
import 'whatwg-fetch';

import { LOADING, SUCCESS, FAILURE, MAPBOX_ACCESS_TOKEN } from '../constants';

function fetchPlace(latLng) {
  const { lng, lat } = latLng;
  return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}`)
    .then(res => res.json())
    .then(prop('features'))
    .then(find(({ place_type }) => place_type[0] === 'place'))
    .then(prop('place_name'))
}

const withLocation = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        place: {
          name: 'Loading Location...',
          status: LOADING
        },
        coordinates: {
          lng: 0,
          lat: 0
        }
      }
    }

    handleLocationSuccess(position) {
      const { coords: { longitude, latitude } } = position;
      console.log(`location success: (${longitude}, ${latitude})`)

      const latLng = {
        lng: longitude,
        lat: latitude
      }

      fetchPlace(latLng)
        .then((placeName) => {
          this.setState({ place: {
            name: placeName,
            status: SUCCESS
          }})
        })
        .catch(() => {
          this.setState({ place: {
            name: 'Location Not Found',
            status: FAILURE
          }})
        });

      this.setState({ location: latLng })
    }

    handleLocationError() {
      console.error("Could not retrieve your location.");
      this.setState({ place: {
        name: 'Location Not Found',
        status: FAILURE
      }})
    }

    componentDidMount() {
      if (!navigator.geolocation) {
        return this.handleLocationError();
      }

      navigator.geolocation.getCurrentPosition(
        this.handleLocationSuccess.bind(this),
        this.handleLocationError.bind(this)
      );
    }

    render() {
      return (
        <WrappedComponent {...this.props}
          place={ this.state.place }
          location={ this.state.location }
        />
      )
    }
  }
}

export default withLocation;
