import React from 'react';
import { MapContainer as LeafletMap, TileLayer, useMapEvents, MapConsumer } from 'react-leaflet';
import L from "leaflet";


var marker1, rect;
var currentLat, currentLng;
var style_point = {
    radius: 5,
    stroke:false,
    weight: 1,
    opacity: 1,
    fillOpacity: 1,
    className: "style_point"
};

class MapCl extends React.Component {
  render() {
    return (
      <form onClick={this.props.weatherMethod}>
      <LeafletMap
        center={[48.7071, 44.5170]}
        zoom={6}
        maxZoom={100}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
      <MapConsumer>
      {() => {
        const map = useMapEvents({
          click: (e) => {
            if (marker1) {
              marker1.remove();
              rect.remove();
            }
            const { lat, lng } = e.latlng;
            currentLat = lat;
            currentLng = lng;
            marker1 = L.circleMarker([lat, lng], style_point).addTo(map);
            rect = L.rectangle([[lat+1, lng+2], [lat-1, lng-2]]);
            map.addLayer(rect);
            this.props.updateData(currentLat, currentLng);
          }
        });
        return null;
      }}
      </MapConsumer>
      </LeafletMap>
      <div class="rec_btn"><button onClick={this.props.rectangleMethod}>Получить погоду в области прямоугольника</button></div>
      </form>
    );
  }
}

export default MapCl;
