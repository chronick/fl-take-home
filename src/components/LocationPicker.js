import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_ID } from '../constants';

const Map = ReactMapboxGl({
  accessToken: MAPBOX_ACCESS_TOKEN,
  doubleClickZoom: false
});

class LocationPicker extends Component {
  constructor(props) {
    super(props);

    const { lng, lat } = props.latLng
    this.state = {
      initialCenter: [lng, lat]
    }
  }

  handleDblClick(map, e) {
    if(!e.lngLat) return;
    this.props.onChange(e.lngLat);
  }

  render() {
    const { lng, lat } = this.props.latLng

    return (
      <div>
        <em style={{ display: 'block', margin: '0.5em 0' }}>
          Drag the map to move around.
          <br/>
          Double-click the map to set the location.
        </em>
        <Map
          style={ `mapbox://styles/${MAPBOX_STYLE_ID}` }
          center={ this.state.initialCenter }
          onDblClick={ this.handleDblClick.bind(this) }
          containerStyle={{
            height: "300px",
            width: "300px"
          }}>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-editor" }}>
            <Feature coordinates={ [lng, lat] }/>
          </Layer>
        </Map>
      </div>
    )
  }
}

LocationPicker.defaultProps = {
  latLng: { lng: 0, lat: 0 }
}

LocationPicker.propTypes = {
  latLng: PropTypes.shape({
    lng: PropTypes.number,
    lat: PropTypes.number
  }),
  onChange: PropTypes.func.isRequired
}

export default LocationPicker;
