function legend() {
  const divLegend = document.createElement('div');
  divLegend.classList.add('info-legend');
  document.querySelector('.map-container').appendChild(divLegend);
  const grades = ['Air quality scale:', 'Good', 'Moderate', 'Unhealthy for sensitive', 'Unhealthy', 'Very Unhealthy','Hazardous'];
  const labels = ['rgba(184,179,179,0.75)', 'rgba(0,153,102,0.75)', 'rgba(255,222,51,0.75)', 'rgba(255,153,51,0.75)', 'rgba(204,0,51,0.75)', 'rgba(102,0,153,0.75)', 'rgba(126,0,35,0.75)'];
  const text = [
    '',
    '.   Air quality is considered satisfactory, and air pollution poses little or no risk.',
    '.   Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.',
    '.   Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
    '.   Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
    '.   Health warnings of emergency conditions. The entire population is more likely to be affected.',
    '.   Health alert: everyone may experience more serious health effects.',
  ];
  // loop through our grades and generate a label with a colored square for each grade
  for (let i = 0; i < grades.length; i += 1) {
    divLegend.innerHTML += `<div class=button style='background:${labels[i]}'>${grades[i]}<div class=popup${i}>\
    ${grades[i]} ${text[i]}</div></div>`;
  }
}

export default { legend };
