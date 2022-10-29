export default {
  elements: {
    wrapperBody: null,
    leftContainer: null,
    mapContainer: null,
    centralContainer: null,
    bottomContainer: null,
  },

  init() {
    // создаем элементы
    this.elements.wrapperBody = document.createElement('div');
    this.elements.centralContainer = document.createElement('div');
    this.elements.leftContainer = document.createElement('div');
    this.elements.mapContainer = document.createElement('div');
    this.elements.bottomContainer = document.createElement('div');
    // добавляем классы и атрибуты
    this.elements.wrapperBody.classList.add('wrapper');
    this.elements.centralContainer.classList.add('central-container');
    this.elements.leftContainer.classList.add('left-container');
    this.elements.mapContainer.classList.add('map-container');
    this.elements.bottomContainer.classList.add('bottom-container');
    // добавляем элементы в DOM
    const bodyContent = document.querySelector('main');
    bodyContent.appendChild(this.elements.wrapperBody);
    this.elements.wrapperBody.appendChild(this.elements.centralContainer);
    this.elements.centralContainer.appendChild(this.elements.leftContainer);
    this.elements.centralContainer.appendChild(this.elements.mapContainer);
    this.elements.centralContainer.appendChild(this.elements.bottomContainer);
    const bodyImg = document.querySelector('body');
  },
};
