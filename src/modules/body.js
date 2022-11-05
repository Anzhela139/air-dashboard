import { makeElem, } from './utils.js';
/**
 * модуль, который создает DOM body приложения, включает в себя карту, поиск и график
 * @module myBody
 */
export default {
  elements: {
    wrapperBody: null,
    leftContainer: null,
    mapContainer: null,
    centralContainer: null,
    bottomContainer: null,
  },

  init() {
    this.elements.wrapperBody = makeElem('div', 'wrapper');
    this.elements.centralContainer = makeElem('div', 'central-container');
    this.elements.leftContainer = makeElem('div', 'left-container');
    this.elements.mapContainer = makeElem('div', 'map-container');
    this.elements.bottomContainer = makeElem('div', 'bottom-container');

    const bodyContent = document.querySelector('main');
    bodyContent.appendChild(this.elements.wrapperBody);
    this.elements.wrapperBody.appendChild(this.elements.centralContainer);
    this.elements.centralContainer.appendChild(this.elements.leftContainer);
    this.elements.centralContainer.appendChild(this.elements.mapContainer);
    this.elements.centralContainer.appendChild(this.elements.bottomContainer);
  },
};
