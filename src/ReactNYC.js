import React from 'react';
import { Map, TileLayer, Tooltip, GeoJSON } from 'react-leaflet';
import { cityData } from './nyc.js';

class ReactNYC extends React.Component {
  constructor() {
    super();
    this.getColor = this.getColor.bind(this);
    this.style = this.style.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  getColor(value) {
    let color;
    this.props.data && this.props.data.forEach(curr => { if(curr.name === value) color = curr.color});
    return color ? color : "#FFEDA0";
  }

  style(feature) {
    const defaultNeighborhoodStyle = { weight: 1, opacity: 1, color: '#666', dashArray: '3', fillOpacity: 0.7 };
    let object = this.props.neighborhoodStyle ? this.props.neighborhoodStyle : defaultNeighborhoodStyle;
    object["fillColor"] = this.getColor(feature.properties["wof:name"]);
    return object;
  }

  handleMouseEnter(event, name) {
    const defaultNeighborhoodHoverStyle = { weight: 5, color: '#FFF', dashArray: '1', fillOpacity: 0.7 };
    event.target.setStyle(this.props.neighborhoodHoverStyle ? this.props.neighborhoodHoverStyle : defaultNeighborhoodHoverStyle);
    event.target.bringToFront();
  }

  handleMouseLeave(event) {
    event.target.setStyle(this.style);
  }

  render() {
    const defaultPosition = [40.7831, -73.9712];
    const defaultZoom = 12;
    const mapboxType = this.props.mapboxType ? this.props.mapboxType : "streets";

    return (
      <div>
        <Map
          className={this.props.className ? this.props.className : null}
          scrollWheelZoom={this.props.mapScrollZoom}
          center={this.props.mapCenter ? this.props.mapCenter : defaultPosition}
          zoom={this.props.mapZoom ? this.props.mapZoom : defaultZoom}
          style={{width: this.props.mapWidth, height: this.props.mapHeight, marginBottom: '60px'}}
        >

        <TileLayer
          url={`https://api.tiles.mapbox.com/v4/mapbox.${mapboxType}/{z}/{x}/{y}.png?access_token=${this.props.mapboxAccessToken}`}
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> | &copy; <a href=&quot;http://mapbox.com&quot;>Mapbox</a>"
        />

        {
          (this.props.neighborhoodOn===undefined || this.props.neighborhoodOn) &&
          cityData.features.map((curr, index) => {
            let currName = curr.properties["wof:name"];
            let show = true;
            this.props.excludeNeighborhoods && this.props.excludeNeighborhoods.forEach(curr => { if(currName===curr) show=false });

            if(show) {
              let dataValues = null;
              this.props.data && this.props.data.map(curr => { if(currName === curr.name) dataValues = curr.values });
              return (
                <div key={index}>
                  <GeoJSON
                    data={curr}
                    style={this.style}
                    onmouseover={event => this.handleMouseEnter(event, curr.properties["wof:name"])}
                    onmouseout={event => this.handleMouseLeave(event)}
                  >
                  {
                    this.props.tooltip===undefined || this.props.tooltip ?
                    <Tooltip key={index} sticky={this.props.tooltipSticky ? this.props.tooltipSticky: false}>
                      <div>
                        <div style={{fontWeight: 'bold'}}>{currName}</div>
                        { dataValues && dataValues.map((curr, i) => <div key={i}>{curr.label}: {curr.val}</div>) }
                      </div>
                    </Tooltip>
                    :
                    null
                  }
                  </GeoJSON>
                </div>
              )
            }
          })
        }
        </Map>
      </div>
    )
  }
}

export default ReactNYC;
