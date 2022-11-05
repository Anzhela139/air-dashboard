/** @constant {String} @description - урл коэффициэнта чистоты воздуха по координатам */
//const WAQI_URL = 'https://api.waqi.info/map/bounds/?latlng=0,0.091230,90,180.784382&token=9120f123f86a8763aaf5c82d32ce313797553c24';
const WAQI_URL = 'src/modules/api-waqi.json';

/** @constant {String} @description - токен апи декодирования координат в города */
const ACCESS_TOKEN_MAPBOX = 'pk.eyJ1IjoiYW56aGVsYTEzOSIsImEiOiJja2lzbjVobGkwZ2F6MzBwZGdsbmVzbWduIn0.5Mz3cROAenKuKLg9RFIj7A';

/** @constant {String} @description - урл декодирования координат в города */
const MAPBOX_URL = ( lat, lon ) => `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon}, ${lat}.json?access_token=${ACCESS_TOKEN_MAPBOX}`;

/** @constant {String} @description - урл коэффициэнта чистоты воздуха по местонахождению пользователя */
const USER_INFO_MOW_URL = 'https://api.waqi.info/feed/here/?token=9120f123f86a8763aaf5c82d32ce313797553c24';

/** @constant {String} @description - урл коэффициэнта чистоты воздуха по координатам по ближайщей станции измерения воздуха */
const STATION_URL = ( station ) => `https://api.waqi.info/feed/@${station}/?token=9120f123f86a8763aaf5c82d32ce313797553c24`;

/** @constant {String} @description - урл коэффициэнта чистоты воздуха при поиска по городам */
const SEARCH_URL = ( keyword ) => `https://api.waqi.info/search/?token=9120f123f86a8763aaf5c82d32ce313797553c24&keyword=${keyword}`

export {
    WAQI_URL, 
    MAPBOX_URL,
    USER_INFO_MOW_URL,
    STATION_URL,
    SEARCH_URL
}