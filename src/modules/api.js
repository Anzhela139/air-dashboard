import { sortObj, filterArr } from './utils.js';

const accessToken = 'pk.eyJ1IjoiYW56aGVsYTEzOSIsImEiOiJja2lzbjVobGkwZ2F6MzBwZGdsbmVzbWduIn0.5Mz3cROAenKuKLg9RFIj7A';

class Api {
    constructor() {
        this.location = [];
    }
    async wrapFetchCall( url, spareUrl ) {
        try {
            let controller = new AbortController()
            setTimeout(() => controller.abort(), 3000);  // abort after 3 seconds
            let resp = await fetch(url, {signal: controller.signal});
            console.log(resp)
            if (!resp && spareUrl || resp.status != 'ok' && spareUrl) {
                resp = await fetch(spareUrl);
            } else if (!resp && spareUrl || resp.status != 'ok' && spareUrl) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }

            return await resp.json();
        } catch (e) {
            let resp = await fetch(spareUrl);
            console.log(resp)
            console.log(e);
            return await resp.json();
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
            return body;
        }
        catch (e) {
            console.error(e);
        } 
    }

    async getUserLocation() {
        function success({ coords }) {
            const { latitude, longitude } = coords;
            window.userLocation = {
                latitude: latitude, 
                longitude: longitude
            };
        }
          
        function error({ message }) {
            console.log(message);
        }
        if (navigator.geolocation) {
            const geoObj = navigator.geolocation.getCurrentPosition(success.bind(this), error, {
                enableHighAccuracy: true
            }) 
        }
    }

    getUserInfoHistory = async (lat, lon) => {
        try {
            console.log(window.userLocation)
            const endTimestamp = + new Date();
            const startTimestamp = endTimestamp - 259200;
            const response = await this.wrapFetchCall(
                `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${
                    window.userLocation?.latitude || lat
                }&lon=${
                    window.userLocation?.longitude || lon
                }&start=${startTimestamp}&end=${endTimestamp}&appid=3368d25e656a521f14b4de50a62fbd93`, 
                'src/modules/api-history.json'
            )
            return response;
        }
        catch (e) {
            console.error(e);
        }
    }

    prepareTableData = async () => {
        const obj = await this.getWaqi();
        let data = await filterArr(sortObj(obj));

        const dirtyCities = await this.getCities(data);
        const cleanCities = await this.getCities(data.reverse());
        return {dirtyCities, cleanCities};
    }

    async prepareChartData() {
        const infoNow = await this.getUserInfoNow();

        const chartData = await this.getUserInfoHistory(infoNow.city.geo[0], infoNow.city.geo[1]);
        return { chartData, infoNow };
    }
}

export default Api;