import { makeElem, } from './utils.js';

export default {
  elements: {
    wrapperHeader: null,
    menuWrapper: null,
    title: null,
    h1: null,
    p: null,
  },

  init() {
    // создаем элементы
    this.elements.wrapperHeader = document.createElement('div');
    this.elements.title = document.createElement('div');
    this.elements.h1 = document.createElement('h1');
    this.elements.h1.textContent = 'AIR-POLLUTION. Dashboard';
    this.elements.menuWrapper = document.createElement('div');
    // добавляем классы
    this.elements.wrapperHeader.classList.add('wrapper');
    this.elements.menuWrapper.classList.add('menu-wrapper');

    // добавляем элементы в DOM
    const header = document.querySelector('header');
    header.appendChild(this.elements.wrapperHeader);
    this.elements.wrapperHeader.appendChild(this.elements.title);
    this.elements.title.appendChild(this.elements.h1);
    this.elements.wrapperHeader.appendChild(this.elements.menuWrapper);
  },
};
