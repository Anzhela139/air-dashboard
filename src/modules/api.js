import { sortObj, filterArr } from './utils.js';
import { WAQI_URL, USER_INFO_MOW_URL, MAPBOX_URL } from './constans.js';

class Api {
    async wrapFetchCall( url, spareUrl = '' ) {
        try {
            let controller = new AbortController()
            setTimeout(() => controller.abort(), 3000); 
            let resp = await fetch(url, {signal: controller.signal});

            if (!resp && spareUrl || resp.status != 'ok' && spareUrl) {
                resp = await fetch(spareUrl);
            } else if (!resp && spareUrl || resp.status != 'ok' && spareUrl) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }

            return await resp.json();
        } catch (e) {
            console.log(e);

            if(spareUrl) {
                let resp = await fetch(spareUrl);  
                return await resp.json();
            }
        }
    }

    getCity = async (lat, lon, aqi) => {
        const url = MAPBOX_URL(lat, lon); 
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
            navigator.geolocation.getCurrentPosition(success.bind(this), error, {
                enableHighAccuracy: true
            }) 
        }
    }

    getUserInfoHistory = async (lat, lon) => {
        try {
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
        const obj = await this.wrapFetchCall(WAQI_URL);
        let data = await filterArr(sortObj(obj.data));

        const dirtyCities = await this.getCities(data);
        const cleanCities = await this.getCities(data.reverse());
        return {dirtyCities, cleanCities};
    }

    async prepareChartData() {
        const dataNow = await this.wrapFetchCall(USER_INFO_MOW_URL);
        const infoNow = await dataNow?.data;

        const chartData = await this.getUserInfoHistory(infoNow.city?.geo[0], infoNow.city?.geo[1]);
        return { chartData, infoNow };
    }
}

export default Api;