import '../styles/map.css';
import L from 'leaflet';
import 'leaflet-search';
import geojsonFeature from './spareApis/countries.json';
import { makeElem } from './utils.js';

/** инициализирует карту */
class Map {
  constructor() {
    this.geoJsonLayer = null;
    this.init();
  }

  /**
   * @description - инициализирует карту
   */
  init() {
    const map = makeElem('div', 'map');
    map.setAttribute('id', 'mapid');
    const mapContainer = document.querySelector('.map-container');
    mapContainer.appendChild(map);

    const myMap = L.map('mapid').setView([40, 20], 1.5);
    const mapLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/dark-v10',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoibGl0dGxlLXBsdW1lbGV0IiwiYSI6ImNraXBxbjNteTFwaG8ydXFqamk1NmRwZXYifQ.7Bc83zb77pOrF_yPLkYHJQ'
    }).addTo(myMap);

    const searchLayer = L.geoJson(geojsonFeature, {
      style: this.mapStyle,
      onEachFeature: this.onEachFeature.bind(this),
    }).addTo(myMap);

    this.geoJsonLayer = L.geoJson(geojsonFeature, {
      style: this.mapStyle,
      onEachFeature: this.onEachFeature.bind(this),
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

    this.mapLegend();
  }

  /**
   * @description - хандлер события наведения на участки карты
   */
  onEachFeature(feature, layer) {
    layer.bindPopup(`<p> ${feature.properties.name} </p>`);
    layer.on({
      mouseover: this.hightlightFeature.bind(this),
      mouseout: this.resetHighlight.bind(this),
    });
  }

  /**
   * @description - возвращает стили для участков карты при наведении
   * @return {Object} стили для участков карты при наведении
   */
  mapStyle() {
    return {
      fillColor: 'white',
      weight: 1,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.2,
    };
  }
  /**
   * @description - подсвечивает регионы карты и открывает popup при наведении
   */
  hightlightFeature(e) {
    const layer = e.target;
    layer.setStyle({
      weight: 2,
      color: 'black',
      fillColor: '#D3D3D3',
      fillOpacity: 0.6,
    });
    layer.openPopup();
  }
  
  /**
   * @description - возвращает регионы карты к первоначальному состоянию и закрывает popup, когда пользователь убирает наведение
   */
  resetHighlight(e) {
    e.target.closePopup();
    this.geoJsonLayer.setStyle(this.mapStyle());
  }

  /**
   * @description - инициализирует легенду к карте
   */
  mapLegend() {
    const divLegend = makeElem('div', 'info-legend');
    document.querySelector('.map-container').appendChild(divLegend);

    const grades = ['Air quality scale:', 'Good', 'Moderate', 'Unhealthy for sensitive', 'Unhealthy', 'Very Unhealthy','Hazardous'];
    const labels = ['rgba(184,179,179,0.75)', 'rgba(0,153,102,0.75)', 'rgba(255,222,51,0.75)', 'rgba(255,153,51,0.75)', 'rgba(204,0,51,0.75)', 'rgba(102,0,153,0.75)', 'rgba(126,0,35,0.75)'];
    const text = [
      '',
      '.   Air quality is considered satisfactory, and air pollution poses little or no risk.',
      '.   Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
      '.   Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
      '.   Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
      '.   Health warnings of emergency conditions. The entire population is more likely to be affected.',
      '.   Health alert: everyone may experience more serious health effects.',
    ];

    // loop through our grades and generate a label with a colored square for each grade
    for (let i = 0; i < grades.length; i += 1) {
      divLegend.innerHTML += `<div class=button style='background:${labels[i]}'>
                                ${grades[i]}
                                <div class=popup${i}>\
                                  ${grades[i]} ${text[i]}
                                </div>
                              </div>`;
    }
  }
}

export default Map;
