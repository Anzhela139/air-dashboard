import '../styles/map.css';
import L from 'leaflet';
import 'leaflet-search';
import geojsonFeature from './countries.json';

let geoJsonLayer;

function mapStyle() {
  return {
    fillColor: 'white',
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.2,
  };
}

function hightlightFeature(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 2,
    color: 'black',
    fillColor: '#D3D3D3',
    fillOpacity: 0.6,
  });
  layer.openPopup();// bindPopup('<p>' + layer.feature.properties.name + '</p>');
}

function resetHighlight(e) {
  e.target.closePopup();
  geoJsonLayer.setStyle(mapStyle());
}

function onEachFeature(feature, layer) {
  layer.bindPopup(`<p> ${feature.properties.name} </p>`);
  layer.on({
    mouseover: hightlightFeature,
    mouseout: resetHighlight,
  });
}

function init() {
  // создаем элементы
  const map = document.createElement('div');
  // добавляем классы и атрибуты
  map.classList.add('map');
  map.setAttribute('id', 'mapid');
  // добавляем элементы в DOM
  const mapContainer = document.querySelector('.map-container');
  mapContainer.appendChild(map);

  const myMap = L.map('mapid').setView([40, 20], 1.5);
  const mapLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10', // light-v10
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGl0dGxlLXBsdW1lbGV0IiwiYSI6ImNraXBxbjNteTFwaG8ydXFqamk1NmRwZXYifQ.7Bc83zb77pOrF_yPLkYHJQ'
  }).addTo(myMap);

  const searchLayer = L.geoJson(geojsonFeature, {
    style: mapStyle,
    onEachFeature: onEachFeature,
  }).addTo(myMap);

  geoJsonLayer = L.geoJson(geojsonFeature, {
    style: mapStyle,
    onEachFeature: onEachFeature,
  }).addTo(myMap);

  // search bar
  const searchControl = new L.Control.Search({
    // position: 'topleft', // where do you want the search bar?
    layer: searchLayer, // name of the layer
    initial: false,
    zoom: 5, // set zoom to found location when searched
    marker: false,
    textPlaceholder: 'search...', // placeholder while nothing is searched
    propertyName: 'name',
    animateLocation: true, // animate a circle over location found
    circleLocation: true, // draw a circle in location found
    markerLocation: true,
  });
  myMap.addControl(searchControl); // add it to the map

  // Information about air
  const WAQI_URL = 'https://tiles.waqi.info/tiles/usepa-aqi/{z}/{x}/{y}.png?token=_TOKEN_ID_';
  const WAQI_ATTR = 'Air  Quality  Tiles  &copy;  <a  href="http://waqi.info">waqi.info</a>';
  const waqiLayer = L.tileLayer(WAQI_URL, { attribution: WAQI_ATTR });
  myMap.addLayer(mapLayer).addLayer(waqiLayer);
  waqiLayer.bringToFront();
}

export default { init };
