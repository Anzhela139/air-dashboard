import { makeElem, colorize, } from './utils.js';
import { SEARCH_URL, STATION_URL } from './constans.js';
import './../styles/search.css';

// по мотивам https://aqicn.org/json-api/demo/
const search = async (keyword, output, api) => {
    output.innerHTML = '<h2>Search results:</h2>';
    output.appendChild(makeElem('div', '', 'Loading...'));
    output.appendChild(makeElem('div', ['cp-spinner', 'cp-meter']));
    const result = await api.wrapFetchCall(SEARCH_URL(keyword));
    output.innerHTML = '<h2>Search results :</h2>';
    console.log(result)
    if (!result || result.status != "ok") {
      output.appendChild(makeElem('div', '', 'Sorry, something wrong happend: '));
      if (result.data) output.appendChild(makeElem('code', '', result.data));
      return;
    } else if (result.length == 0) {
      output.appendChild(makeElem('div', '', 'Sorry, there is no result for your query!'));
      return;
    } else {
      let table = makeElem('table', 'result');
      output.appendChild(table);
  
      output.appendChild(makeElem('div', '', 'Click on any of the station to see the detailled AQI'));
  
      let stationInfo = makeElem('div', 'station-info');
      output.appendChild(stationInfo);
  
      result.data.forEach(function (station) {
        let tr = makeElem('tr');
        tr.appendChild(makeElem('td', '', station.station.name));
        tr.appendChild(colorize(station.aqi));
        tr.addEventListener('click', function () {
          showStation(station, stationInfo);
        });
        table.appendChild(tr);
      });
    }
}

const showStation = async (station, output) => {
  output.innerHTML = '<h2>Pollutants & Weather conditions:</h2>';
  output.appendChild(makeElem('div', '', 'Loading...'));
  output.appendChild(makeElem('div', ['cp-spinner', 'cp-meter']));
  const result = await this.elements.api.wrapFetchCall(STATION_URL(station.uid));
 
      output.innerHTML = '<h2>Pollutants & Weather conditions:</h2>';
      if (!result || result.status != 'ok') {
        output.appendChild('Sorry, something wrong happend: ');
        if (result.data) output.appendChild(makeElem('code', '', result.data));
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
 
      output.appendChild(makeElem('div', '', 'Station: ' + result.data.city.name + ' on ' + result.data.time.s));
 
      let table = makeElem('table', 'result');
      output.appendChild(table);
 
      for (let specie in result.data.iaqi) {
        let aqi = result.data.iaqi[specie].v;
        let tr = makeElem('tr');
        tr.appendChild(makeElem('td', '', names[specie] || specie));
        tr.appendChild(makeElem('td', '', colorize(aqi, specie)));
        table.appendChild(tr);
      }
}

export default {
    elements: {
        input: null,
        output: null,
        token: '9120f123f86a8763aaf5c82d32ce313797553c24',
    },

    async init(api) {
        let timer = null;
        this.elements.input = makeElem('input', 'input-search');
        this.elements.output = makeElem('div', 'output-search');
        document.querySelector('.left-container').prepend(this.elements.input);
        this.elements.input.after(this.elements.output);
        this.elements.input.addEventListener('keyup', function (e, ) {
            //if (timer) clearTimeout(timer);
            search(this.value, document.querySelector('.output-search'), api)
            //timer = setTimeout(function () {search(this.value, document.querySelector('.output-search'))}, 250);
        });
   }
}