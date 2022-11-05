import { makeElem, colorize, } from './utils.js';
import { SEARCH_URL, STATION_URL } from './constans.js';
import './../styles/search.css';

/** инициализирует поиск */
class Search {
  /**
   * @param {ClassInstance} api - инстанс класса Api
   */
  constructor(api) {
    this.api = api;
    this.input = null;
    this.output = null;
    this.token = '9120f123f86a8763aaf5c82d32ce313797553c24';
    this.stationInfo = null;
    this.searchOutput = null;

    this.init()
  }

  /**
   * @description - инициализирует поиск
   */
  async init() {
    this.input = makeElem('input', 'input-search');
    this.searchOutput = makeElem('div', 'output-search');
    document.querySelector('.left-container').prepend(this.input);
    this.input.after(this.searchOutput);
    this.input.addEventListener('keyup', this.handleSearch.bind(this));
  }

  /**
   * @description - производит и отображает поиск
   */
  // по мотивам https://aqicn.org/json-api/demo/
  async handleSearch() {
    const keyword = this.input.value;
    this.searchOutput.innerHTML = '<h2>Search results:</h2>';
    this.searchOutput.appendChild(makeElem('div', '', 'Loading...'));
    this.searchOutput.appendChild(makeElem('div', ['cp-spinner', 'cp-meter']));
    const result = await this.api.wrapFetchCall(SEARCH_URL(keyword));
    this.searchOutput.innerHTML = '<h2>Search results :</h2>';

    if (!result || result.status != "ok") {
      this.searchOutput.appendChild(makeElem('div', '', 'Sorry, something wrong happend: '));
      if (result.data) this.searchOutput.appendChild(makeElem('code', '', result.data));
      return;
    } else if (result.length == 0) {
      this.searchOutput.appendChild(makeElem('div', '', 'Sorry, there is no result for your query!'));
      return;
    } else {
      let table = makeElem('table', 'result');
      this.searchOutput.appendChild(table);

      this.searchOutput.appendChild(makeElem('div', '', 'Click on any of the station to see the detailled AQI'));

      this.stationInfo = makeElem('div', 'station-info');
      this.searchOutput.appendChild(this.stationInfo);

      result.data.forEach((station) => {
        let tr = makeElem('tr');
        tr.appendChild(makeElem('td', '', station.station.name));
        tr.appendChild(colorize(station.aqi));
        tr.addEventListener('click', this.showStation.bind(this, station));
        table.appendChild(tr);
      });
    }
  }

  /**
   * @description - показывает ближайщую станцию к объекту поиска
   */
  async showStation(station) {
    this.stationInfo.innerHTML = '<h2>Pollutants & Weather conditions:</h2>';
    this.stationInfo.appendChild(makeElem('div', '', 'Loading...'));
    this.stationInfo.appendChild(makeElem('div', ['cp-spinner', 'cp-meter']));
    const result = await this.api.wrapFetchCall(STATION_URL(station.uid));
  
    this.stationInfo.innerHTML = '<h2>Pollutants & Weather conditions:</h2>';
    if (!result || result.status != 'ok') {
      this.stationInfo.appendChild('Sorry, something wrong happend: ');
      if (result.data) this.stationInfo.appendChild(makeElem('code', '', result.data));
      return;
    }
  
    let names = {
      pm25: 'PM<sub>2.5</sub>',
      pm10: 'PM<sub>10</sub>',
      o3: 'Ozone',
      no2: 'Nitrogen Dioxide',
      so2: 'Sulphur Dioxide',
      co: 'Carbon Monoxyde',
      t: 'Temperature',
      w: 'Wind',
      r: 'Rain (precipitation)',
      h: 'Relative Humidity',
      d: 'Dew',
      p: 'Atmostpheric Pressure',
    };
  
    this.stationInfo.appendChild(makeElem('div', '', 'Station: ' + result.data.city.name + ' on ' + result.data.time.s));
  
    let table = makeElem('table', 'result');
    this.stationInfo.appendChild(table);
  
    for (let specie in result.data.iaqi) {
      let aqi = result.data.iaqi[specie].v;
      let tr = makeElem('tr');
      tr.appendChild(makeElem('td', '', names[specie] || specie));
      tr.appendChild(makeElem('td', '', colorize(aqi, specie)));
      table.appendChild(tr);
    }
  }
}

export default Search;