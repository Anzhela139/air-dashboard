// Полезные функции для AirDashboard
/**
 * @description - сжимает массив данных по веществам для графика, 
 * содержания веществ в воздухе
 * @param {Array<Number>} arr - масссив изначальных данных
 * @param {Number} comp - число, до значения которого нужно сжать массив
 * @return {Array<Number>} - сжатый массив данных по веществам для графика
 */
function compressDataForChart(arr, comp) {
    let result = [];
    for (let i = 0; i < comp; i += 1) {
        let temp = arr.slice(i * comp, i * comp + comp);
        result.push(temp.reduce((sum, item) => (sum + item), 0) / comp);
    }
    return result;
}

/**
 * @description - возвращает массив значений Iaqi (коэффициента качества воздуха) для графика
 * @param {Object} obj - объект со значениями Iaqi по местоположению пользователя
 * @return {Array<String>} - массив значений Iaqi (коэффициента качества воздуха) для графика
 */
function getIaqi(obj) {
    let res = [];
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            res.push(`${key} — ${obj[key].v}`);     
        }
    }
    return res;
}

/**
 * @description - создает строку DOM с текстовым наполнением из значений массива
 * @param {Array<String>} arr - массив со значениями - текстовым наполнением
 * @param {HtmlTagObject} tag - DOM элемент
 * @return {String} - строка DOM с текстовым наполнением из значений массива
 */
function makeHTMLElfromArr(arr, tag) {
    let temp = [];
    arr.map((item) => temp.push(`<${tag}>${item}</${tag}>`))
    return temp.join('');
}

/**
 * @description - возвращает массив с датами, до определенной даты
 * @param {Date} endStamp - конечная дата
 * @return {Array<Date>} - массив с датами, до определенной даты
 */
function getDynDates(endStamp) {
    let result = [];
    for (let  i = 0; i < 6; i += 1) {
        let temp = endStamp - (i * 43200);
        let date = new Date(temp * 1000);
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let month = months[date.getMonth()];
        let day = date.getDate();
        let hour = date.getHours();
        let min = date.getMinutes();
        let time = `${day} ${month} ${hour}:${min}`;
        result.push(time);
    }
    return result.reverse();
}

/**
 * @description - возвращает массив данных для графика
 * @param {Object} obj - объект с данными Iaqi (коэффициента качества воздуха) для графика
 * @param {Function} func - функция, которая обрабатывает каждый раздел массива для графика
 * @return {Array<Object>} - массив данных для графика
 */
function extractDataArr(obj, func) {
    let dataAqi = [];
    let co = [];
    let no = [];
    let no2 = [];
    let o3 = [];
    let so2 = [];
    let pm2_5 = [];
    let pm10 = [];
    let nh3 = [];

    obj.list.forEach(item => {
        dataAqi.push(item.main.aqi);
        co.push(item.components.co);
        no.push(item.components.no);
        no2.push(item.components.no2);
        o3.push(item.components.o3);
        so2.push(item.components.so2);
        pm2_5.push(item.components.pm2_5);
        pm10.push(item.components.pm10);
        nh3.push(item.components.nh3);
    });

    let res = [];
    res.push(func(dataAqi, 6));
    res.push(func(co, 6));
    res.push(func(no, 6));
    res.push(func(no2, 6));
    res.push(func(o3, 6));
    res.push(func(so2, 6));    
    res.push(func(pm2_5, 6));
    res.push(func(pm10, 6));
    res.push(func(nh3, 6));

    return res;
}

/**
 * @description - создает элемент DOM с заданными классами и тектовым наполнением
 * @param {HtmlTagObject} type - тег элемента DOM 
 * @param {String|Array<String>} [className=''] - одни или несколько классов элемента DOM 
 * @param {String} [text=''] - тектово наполнение
 * @return {HTMLElement} - элемент DOM с заданными классами и тектовым наполнением
 */
const makeElem = (type, className = '', text = '') => {
    let el = document.createElement(type);

    if (className) {
        if (typeof className === 'string') {
            el.classList.add(className);
        } else {
            className.forEach(item => el.classList.add(item));
        }
    };
    
    let textNode = document.createTextNode(text);
    el.appendChild(textNode);
    return el;
}

/**
 * @description - возвращает отсортированный массив данных aqi по городам мира
 * @param {Array<Object>} arr - массив данных aqi по городам мира
 * @return {Array<Object>} - отсортированный массив данных aqi по городам мира
 */
function sortObj(arr) {
    return arr.sort((a,b) => (+a.aqi > +b.aqi) ? 1 : ((+b.aqi > +a.aqi) ? -1 : 0)); 
}

/**
 * @description - возвращает отфильрованный от значений без города массив данных aqi по городам мира
 * @param {Array<Object>} arr -  массив данных aqi по городам мира
 * @return {Array<Object>} - отфильрованный от значений без города массив данных aqi по городам мира
 */
function filterArr(arr) {
    return arr.filter((item) => (!item.aqi.includes('-')));
}

/**
 * @description - возвращает подсвеченные результаты поиска
 * @param {String} aqi - коэффициента качества воздуха
 * @param {String} [specie="aqi"] - подвид поиска
 * @return {String|HTMLElement} - подсвеченные результаты поиска
 */
function colorize(aqi, specie = "aqi") {
    if (["pm25", "pm10", "no2", "so2", "co", "o3", "aqi"].indexOf(specie) < 0)
      return aqi;
   
    let spectrum = [
      { a: 0, b: "#cccccc", f: "#ffffff" },
      { a: 50, b: "#009966", f: "#ffffff" },
      { a: 100, b: "#ffde33", f: "#000000" },
      { a: 150, b: "#ff9933", f: "#000000" },
      { a: 200, b: "#cc0033", f: "#ffffff" },
      { a: 300, b: "#660099", f: "#ffffff" },
      { a: 500, b: "#7e0023", f: "#ffffff" },
    ];
   
    let i = 0;
    for (i = 0; i < spectrum.length - 2; i++) {
      if (aqi === "-" || aqi <= spectrum[i].a) break;
    }
    let result = makeElem('div', 'search-results', aqi);
    result.style.backgroundColor = `${spectrum[i].b}`;
    result.style.color = `${spectrum[i].f}`;
    return result;
}

export { makeElem, sortObj, filterArr, getIaqi, makeHTMLElfromArr, colorize, extractDataArr, compressDataForChart, getDynDates };