const playSound = (sound) => {
    sound.currentTime = 0;
    sound.play();
}

function getAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

function getDescendant(el, cls) {
    while ((el = el.lastElementChild) && !el.classList.contains(cls));
    return el;
}

function compressDataForChart(arr, comp) {
    let result = [];
    for (let i = 0; i < comp; i += 1) {
        let temp = arr.slice(i * comp, i * comp + comp);
        result.push(temp.reduce((sum, item) => (sum + item), 0) / comp);
    }
    return result;
}

function getIaqi(obj) {
    let res = [];
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            res.push(`${key} — ${obj[key].v}`);     
        }
    }
    return res;
}

function makeHTMLElfromArr(arr, tag) {
    let temp = [];
    arr.map((item) => temp.push(`<${tag}>${item}</${tag}>`))
    return temp.join('');
}

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

const randomArr = (arr) => arr.slice(0).sort((a, b) => 0.5 - Math.random());

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

function sortObj(arr, mean) {
    return arr.sort((a,b) => (+a.aqi > +b.aqi) ? 1 : ((+b.aqi > +a.aqi) ? -1 : 0)); 
}

function get5Smallest(arr) {
    return arr.filter((item) => typeof item === 'number').slice(0, 5);
}

function filterArr(arr) {
    return arr.filter((item) => (!item.aqi.includes('-')));
}

function get5Biggest(arr) {
    let res = [];
    arr.reverse();
    for (let i = 0; i < arr.length; i += 1) {
        if (!res.includes(arr[i])) {
            res.push(arr[i]);
        } else {
            res.push([arr[i]])
        }
        if (res.length = 5) {
            return;
        }
    }
    return arr.slice(arr.length - 5, arr.length);
}

function groupObj(obj) { 
    data1.reduce((result, {category, value}) => {
    let target = result.find(row => row.category == category);
    if(!target) {
      target = {category, values: []};
      result.push(target);
    };
    target.values.push(value);
    return result;
  }, [])
}

function colorize(aqi, specie = null) {
    specie = specie || "aqi";
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

export { playSound, getAncestor, getDescendant, randomArr, makeElem, sortObj, filterArr, get5Smallest, getIaqi, makeHTMLElfromArr, colorize, get5Biggest, groupObj, extractDataArr, compressDataForChart, getDynDates };