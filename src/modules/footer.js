import { makeElem, } from './utils.js';

/**
 * модуль, который создает DOM footer приложения
 * @module myFooter
 */
export default {
  elements: {
    wrapperFooter: null,
    infoContainer: null,
    personalReference1: null,
    personalReference2: null,
    year: null,
    logo: null,
    schoolReference: null,
  },
  init() {
    // создаем элементы
    this.elements.wrapperFooter = makeElem('div', ['wrapper', 'wrapper-footer']);
    this.elements.infoContainer = makeElem('div', 'info-container');
    this.elements.personalReference1 = makeElem('a', 'personal-reference', 'Little-plumelet. GitHub.');
    this.elements.personalReference2 = makeElem('a', 'personal-reference', 'Anzhela Abitova. GitHub.');
    this.elements.year = makeElem('p', 'year', '2020');

    // добавляем классы и атрибуты
    this.elements.personalReference1.setAttribute('href', 'https://github.com/little-plumelet');
    this.elements.personalReference2.setAttribute('href', 'https://github.com/anzhelaAbitova');

    // добавляем элементы в DOM
    const footerContent = document.querySelector('footer');
    footerContent.appendChild(this.elements.wrapperFooter);
    this.elements.wrapperFooter.appendChild(this.elements.infoContainer);
    this.elements.infoContainer.appendChild(this.elements.personalReference1);
    this.elements.infoContainer.appendChild(this.elements.personalReference2);
    this.elements.infoContainer.appendChild(this.elements.year);
  },
};