# react-nyc-choropleth
React component for New York City choropleth map


## Demo
Live Demo coming soon!


## Installation
Using [npm](https://www.npmjs.com/):
```
npm install --save react-nyc-neighborhoods
```


## Preparation
Please perform the following steps in preparation

**Step 1**: Include [leaflet.js](http://leafletjs.com/)'s CSS file link in the `<head>` section of your `index.html`
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css" integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ==" crossorigin=""/>
```

**Step 2**: Obtain a free `mapboxAccessToken` from [Mapbox](https://www.mapbox.com/). You have to create an account to obtain this token


## Usage
```javascript

import React from 'react';
import ReactNYC from 'react-nyc-choropleth';

class Example extends React.Component {
  render() {
    const mapboxAccessToken = "" // Your access token
    const mapboxType = "streets";
    const position = [40.7831, -73.9712];
    const zoom = 12;
    const data = [
      {
        name: "Chelsea",
        values: [{label: "Population", val: 20000}, {label: "Restaurants", val: "690"}],
        color: "#E31A1C"
      }
    ]
    const neighborhoodStyle = { weight: 1, opacity: 1, color: '#666', dashArray: '3', fillOpacity: 0.7 };
    const neighborhoodHoverStyle = { weight: 5, color: '#FFF', dashArray: '1', fillOpacity: 0.7 };
    const excludeNeighborhoods = ["Liberty Island", "Ellis Island"];

    return (
      <div>

        <ReactNYC
          mapboxAccessToken={mapboxAccessToken} // Required
          mapHeight="800px" // Required
          mapWidth="600px"
          className="container"
          mapboxType={mapboxType}
          mapCenter={position}
          mapZoom={zoom}
          mapScrollZoom={false}
          neighborhoodOn={true}
          tooltip={true}
          tooltipSticky={false}
          data={data}
          neighborhoodStyle={neighborhoodStyle}
          neighborhoodHoverStyle={neighborhoodHoverStyle}
          excludeNeighborhoods={excludeNeighborhoods}
        />

      </div>
    )
  }
}

export default Example;
```


## Properties
The `ReactNYC` component accepts the following props

Name  | Type | Default | Req/Opt | Description
--- | --- | --- | --- | ---
`mapboxAccessToken` | string | | **Required** | Access Token from [Mapbox](https://www.mapbox.com/)
`mapHeight` | string | | **Required** | Height of the map
`mapWidth` | string | `100%` | Optional | Width of the map. Default value is 100% of the containing element
`className` | string | | Optional | Class name to be applied to the map
`mapboxType` | string | `streets` | Optional | Mapbox provides many types of [map themes](https://www.mapbox.com/maps/). This component supports 5 such themes: `light`, `dark`, `streets`, `outdoors`, and `satellite`. Default value is `streets`
`mapCenter` | array | `[40.7831, -73.9712]` | Optional | Geographical coordinates (latitude and longitude) where the map should be centered. Default value is `[40.7831, -73.9712]`
`mapZoom` | integer | `12` | Optional | Initial zoom level for the map. Default value is `12`
`mapScrollZoom` | boolean | `false` | Optional | Indicates whether the map can be zoomed by using the mouse wheel. Default value is `false`
`neighborhoodOn` | boolean | `true` | Optional | Indicates whether the neighborhood tiles should be displayed. Default value is `true`
`tooltip` | boolean | `true` | Optional | Indicates whether the tooltip should appear when hovering over a neighborhood tile. Default value is `true`
`tooltipSticky` | boolean | `false` | Optional | If `true`, the tooltip will follow the mouse instead of being fixed at the feature center. Default value is `false`
`neighborhoodStyle` | object | | Optional | Style of the neighborhood tile. Default is `{ weight: 1, opacity: 1, color: '#666', dashArray: '3', fillOpacity: 0.7 }`
`neighborhoodHoverStyle` | object | | Optional | Style of the neighborhood tile when hovered over. Default is `{ weight: 5, color: '#FFF', dashArray: '1', fillOpacity: 0.7 }`
`excludeNeighborhoods` | array | | Optional | To exclude any neighborhoods from the map, provide the neighborhood names in an array. Default will show all 38 neighborhoods
`data` | array | | Optional | See the Data section below for details

**Note on hover styles**: To ensure that the tile style behaves as expected when hovered over and away from the tile, please include matching CSS properties in both `neighborhoodStyle` and `neighborhoodHoverStyle`. For example, if the `fillOpacity` CSS property is defined in `neighborhoodStyle`, then please define `fillOpacity` in `neighborhoodHoverStyle` as well, and vice versa. Otherwise, some properties assigned during hover will remain even when hovered away and vice versa.


## Data
The `data` prop is an array of objects. Each object is dedicated to a neighborhood and must have the following keys:
* `name`: Name of the neighborhood
* `values`: Array of objects with keys `label` and `val`
* `color`: Color of the neighborhood tile. If color is unspecified, the default color for all tiles is `#FFEDA0`

For example, if you want to highlight the below neighborhoods with their data, then simply pass the below `data` array of objects.
```javascript
const data = [
  {
    name: "Chelsea",
    values: [{label: "Population", val: 20000}, {label: "Restaurants", val: "690"}],
    color: "#E31A1C"
  },
  {
    name: "Upper West Side",
    values: [{label: "Population", val: "20,000"}],
    color: "#666"
  }
]
```

[ColorBrewer](http://colorbrewer2.org/) is a nice tool that helps you choose nice colors for neighborhood tiles


## Neighborhoods
There are 38 New York City (Manhattan) neighborhoods shown on the map

Neighborhood | Neighborhood | Neighborhood | Neighborhood
--- | --- | --- | ---
Battery Park City | Governors Island | Marble Hill | Spanish Harlem
Central Harlem | Gramercy | Midtown East | Stuyvesant Town
Central Park | Greenwich Village | Midtown West | Tribeca
Chelsea | Hamilton Heights | Morningside Heights | Two Bridges
Chinatown | Hell's Kitchen | Murray Hill | Upper East Side
City Hall Area | Inwood | NoHo | Upper West Side
East Village | Kips Bay | Nolita | Washington Heights
Ellis Island | Liberty Island | Randall's Island | West Village
Financial District | Little Italy | Roosevelt Island
Flatiron District | Lower East Side | SoHo


## License
MIT


## Credits
* [Leaflet.js](http://leafletjs.com/)
* [react-leaflet](https://github.com/PaulLeCam/react-leaflet)
* [Mapbox](https://www.mapbox.com/)
* [Who's On First](https://whosonfirst.mapzen.com/) by [Mapzen](https://mapzen.com/)
