export default {
  elements: {
    menu: null,
    menuBtn: null,
    ticker: null,
    list: null,
    span1: null,
    span2: null,
    span3: null,
    listMenu: [
      '1 пункт',
      '2 пункт',
      '3 пункт',
    ],
  },

  init() {
    const listItemArray = ['Main page'];
    this.elements.listMenu.forEach((element) => {
      listItemArray.push(element);
    });

    // создаем элементы
    this.elements.menu = document.createElement('div');
    this.elements.ticker = document.createElement('input');
    this.elements.menuBtn = document.createElement('label');
    this.elements.span1 = document.createElement('span');
    this.elements.span2 = document.createElement('span');
    this.elements.span3 = document.createElement('span');
    this.elements.list = document.createElement('ul');

    // добавляем классы и атрибуты
    this.elements.menu.classList.add('menu');
    this.elements.ticker.classList.add('hidden-menu-ticker');
    this.elements.ticker.setAttribute('type', 'checkbox');
    this.elements.ticker.setAttribute('id', 'hmt');
    this.elements.menuBtn.classList.add('btn-menu');
    this.elements.menuBtn.setAttribute('for', 'hmt');
    this.elements.span1.classList.add('first');
    this.elements.span2.classList.add('second');
    this.elements.span3.classList.add('third');
    this.elements.list.classList.add('hidden-menu');

    // добавляем элементы в DOM
    const navigation = document.querySelector('.menu-wrapper');
    navigation.appendChild(this.elements.menu);
    this.elements.menu.appendChild(this.elements.ticker);
    this.elements.menu.appendChild(this.elements.menuBtn);
    this.elements.menuBtn.appendChild(this.elements.span1);
    this.elements.menuBtn.appendChild(this.elements.span2);
    this.elements.menuBtn.appendChild(this.elements.span3);
    this.elements.menu.appendChild(this.elements.list);
    this.elements.list.appendChild(this.createReferenes(listItemArray));
    const checker = document.querySelector('.hidden-menu-ticker');

    document.addEventListener('click', (e) => {
      const menuBar = document.querySelector('.hidden-menu');
      const target = e.clientX;
      if (target > menuBar.offsetLeft) {
        checker.checked = true;
        if (checker.checked) {
          checker.checked = false;
        }
      }
    });
  },

  createReferenes(array) {
    const fragment = document.createDocumentFragment();

    array.forEach((element) => {
      const reference = document.createElement('li');
      reference.classList.add('reference');
      reference.textContent = element;
      fragment.appendChild(reference);
      const checker = document.querySelector('.hidden-menu-ticker');
      switch (element) {
        case 'Main page':
          reference.addEventListener('click', () => {
            const arr = document.querySelectorAll('.activated');
            arr.forEach((elem) => {
              elem.classList.remove('activated');
            });
            reference.classList.add('activated');
            checker.checked = true;
            if (checker.checked) {
              checker.checked = false;
            }
          });
          break;
        default:
          reference.addEventListener('click', () => {
            const arr = document.querySelectorAll('.activated');
            arr.forEach((el) => {
              el.classList.remove('activated');
            });
            reference.classList.add('activated');
            checker.checked = true;
            if (checker.checked) {
              checker.checked = false;
            }
          });
          break;
      }
    });
    return fragment;
  },
};
