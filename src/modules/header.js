import { makeElem, } from './utils.js';

/**
 * модуль, который создает DOM header приложения
 * @module myHeader
 */
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
    this.elements.wrapperHeader = makeElem('div', 'wrapper');
    this.elements.title = makeElem('div');
    this.elements.h1 = makeElem('h1', '', 'AIR-POLLUTION. Dashboard');
    this.elements.menuWrapper = makeElem('div', 'menu-wrapper');


    // добавляем элементы в DOM
    const header = document.querySelector('header');
    header.appendChild(this.elements.wrapperHeader);
    this.elements.wrapperHeader.appendChild(this.elements.title);
    this.elements.title.appendChild(this.elements.h1);
    this.elements.wrapperHeader.appendChild(this.elements.menuWrapper);
  },
};
