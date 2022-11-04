import { makeElem, getIaqi, makeHTMLElfromArr, extractDataArr, compressDataForChart, getDynDates } from './utils.js';
import './../styles/chart.css';

export default {
    async init(api) {
        const canvas = makeElem('canvas', 'canvas');
        const chartContainer = document.querySelector('.bottom-container');
        const { chartData, infoNow } = await api.prepareChartData();

        const legend = makeElem('div', 'user-info');
        const moreInfo = makeElem('div', 'more-info');
        const iaqi = getIaqi(infoNow.iaqi);

        const iaqiEls = makeHTMLElfromArr(iaqi, 'li');
        const moreInfoBTN = makeElem('button', 'more-info_btn', 'more');
        moreInfoBTN.addEventListener('click', (e) => {
          e.preventDefault();
          document.querySelector('.more-info_ul').classList.toggle('more-visible')
        })
        moreInfo.innerHTML = `<ul class="more-info_ul">${iaqiEls}</ul>`;
        moreInfo.prepend(moreInfoBTN);
        legend.innerHTML += `<div class="user-aqi">My aqi - <span>${infoNow.aqi}</span></div><div class="user-idx">My IDX -  ${infoNow.idx}</div>`;


        const leftCont = document.querySelector('.left-container');
        leftCont.prepend(legend);
        legend.appendChild(moreInfo);
        const endTimestamp = + new Date();
        const dynamicDates = getDynDates(endTimestamp);
        const res = extractDataArr(chartData, compressDataForChart);

        chartContainer.appendChild(canvas);
        const myChart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: dynamicDates,
                datasets: [{ 
                    data: res[0],
                    label: "AQI",
                    borderColor: "#F0009C",
                    fill: false
                  },
                  {
                    data: res[1],
                    label: "CO",
                    borderColor: "#0BDBE7",
                    fill: false
                  },
                  { 
                    data: res[2],
                    label: "NO",
                    borderColor: "#109EFC",
                    fill: false
                  },
                  {
                    data: res[3],
                    label: "NO2",
                    borderColor: "#6E0099",
                    fill: false
                  },
                  { 
                    data: res[4],
                    label: "O3",
                    borderColor: "#6C00E2",
                    fill: false
                  },
                  {
                    data: res[5],
                    label: "SO2",
                    borderColor: "#FF5EB5",
                    fill: false
                  },
                  { 
                    data: res[6],
                    label: "PM2_5",
                    borderColor: "#FFBBE4",
                    fill: false
                  },
                  {
                    data: res[7],
                    label: "PM10",
                    borderColor: "#558EFF",
                    fill: false
                  },
                  { 
                    data: res[8],
                    label: "NH3",
                    borderColor: "#40ff80",
                    fill: false
                  }                  
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
                title: {
                  display:true,
                  text:"Quality of air in my location",
                  fontStyle: "normal",
                  fontColor: "#fff"
                },
            }
        });
    }
};
