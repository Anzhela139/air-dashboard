//const WAQI_URL = 'https://api.waqi.info/map/bounds/?latlng=0,0.091230,90,180.784382&token=9120f123f86a8763aaf5c82d32ce313797553c24';
const WAQI_URL = 'src/modules/api-waqi.json';
const ACCESS_TOKEN_MAPBOX = 'pk.eyJ1IjoiYW56aGVsYTEzOSIsImEiOiJja2lzbjVobGkwZ2F6MzBwZGdsbmVzbWduIn0.5Mz3cROAenKuKLg9RFIj7A';
const MAPBOX_URL = ( lat, lon ) => `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon}, ${lat}.json?access_token=${ACCESS_TOKEN_MAPBOX}`;
const USER_INFO_MOW_URL = 'https://api.waqi.info/feed/here/?token=9120f123f86a8763aaf5c82d32ce313797553c24';
const STATION_URL = ( station ) => `https://api.waqi.info/feed/@${station}/?token=9120f123f86a8763aaf5c82d32ce313797553c24`;
const SEARCH_URL = ( keyword ) => `https://api.waqi.info/search/?token=9120f123f86a8763aaf5c82d32ce313797553c24&keyword=${keyword}`

export {
    WAQI_URL, 
    MAPBOX_URL,
    USER_INFO_MOW_URL,
    STATION_URL,
    SEARCH_URL
}