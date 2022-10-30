import { playSound, getAncestor, getDescendant, randomArr, makeElem, sortObj, filterArr, get5Smallest, get5Biggest, groupObj } from './utils.js';

const accessToken = 'pk.eyJ1IjoiYW56aGVsYTEzOSIsImEiOiJja2lzbjVobGkwZ2F6MzBwZGdsbmVzbWduIn0.5Mz3cROAenKuKLg9RFIj7A';

class Api {
    getOpenWeather = async () => {
        try {
            const response = await fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat=50&lon=50&appid=3368d25e656a521f14b4de50a62fbd93');
            const body = await response.json();
            return body;
        }
        catch (e) {
            console.error(e);
        }
    }

    getAirVisual = async () => {
        try {
            const response = await fetch('http://api.airvisual.com/v2/countries?key=86703661-afa6-4052-ad13-8da523b06ef0');
            const body = await response.json();
            return body;
        }
        catch (e) {
            console.error(e);
        }
    }

    getWaqi = async () => {
        try {
            //const url = 'https://api.waqi.info/map/bounds/?latlng=0,0.091230,90,180.784382&token=9120f123f86a8763aaf5c82d32ce313797553c24';
            //const response = await fetch('https://api.waqi.info/map/bounds/?latlng=0,0.091230,90,180.784382&token=9120f123f86a8763aaf5c82d32ce313797553c24');
            const response = await fetch('src/modules/api-waqi.json');
            const body = await response.json();
            return body.data;
        }
        catch (e) {
            console.error(e);
        }
    }

    getCity = async (lat, lon, aqi) => {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon}, ${lat}.json?access_token=${accessToken}`; 
        try {
            const response = await fetch(url);
            const body = await response.json();
            return [body.features[2].place_name, aqi];
        }
        catch (e) {
            console.error(e);
        }
    }

    getCities = async (data) => {
        let result = [];
        for (let i = 0; i < data.length; i += 1) {
            let el = await this.getCity(data[i].lat, data[i].lon, data[i].aqi);
            if (!result.includes(el)) {
                result.push(el);
            }
            if (result.length === 5) return result;
        }
    }

    getUserInfoNow = async () => {
        try {
            const response = await fetch('https://api.waqi.info/feed/here/?token=9120f123f86a8763aaf5c82d32ce313797553c24');
            const body = await response.json();
            return body.data;
        }
        catch (e) {
            console.error(e);
        }
    }

    getStation = async (station) => {
        try {
            const response = await fetch(`https://api.waqi.info/feed/@${station}/?token=9120f123f86a8763aaf5c82d32ce313797553c24`);
            const body = await response.json();
            return body;
        }
        catch (e) {
            console.error(e);
        } 
    }

    getSearchInfo = async (keyword) => {
        try {
            const response = await fetch(`https://api.waqi.info/search/?token=9120f123f86a8763aaf5c82d32ce313797553c24&keyword=${keyword}`);
            const body = await response.json();
            console.log(`https://api.waqi.info/search/?token=9120f123f86a8763aaf5c82d32ce313797553c24&keyword=${keyword}`)
            return body;
        }
        catch (e) {
            console.error(e);
        } 
    }

    getUserLocation = async () => {
        let position = {};
        if (navigator.geolocation) {
            position = navigator.geolocation.getCurrentPosition((position) => position);   
        }
        console.log(position);
        return position;
    }

    getUserInfoHistory = async (lat, lon) => {
        try {
            //const url = `http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${startTimestamp}&end=${endTimestamp}&appid=3368d25e656a521f14b4de50a62fbd93`;
            const endTimestamp = + new Date();
            const startTimestamp = endTimestamp - 259200;
            let response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&start=${startTimestamp}&end=${endTimestamp}&appid=3368d25e656a521f14b4de50a62fbd93`);
            if (!response  || response.status != 'ok') response = await fetch('src/modules/api-history.json');
            const body = await response.json();
            return body;
        }
        catch (e) {
            console.error(e);
        }
    }

    prepareTableData = async () => {
        const obj = await this.getWaqi();
        let data = await filterArr(sortObj(obj));
        let dataReverse = await data.reverse();

        const dirtyCities = await this.getCities(data);
        const cleanCities = await this.getCities(data.reverse());
        return {dirtyCities, cleanCities};
    }

    prepareChartData = async () => {
        const infoNow = await this.getUserInfoNow();

        const chartData = await this.getUserInfoHistory(infoNow.city.geo[0], infoNow.city.geo[1]);
        return { chartData, infoNow };
    }
}

export default Api;