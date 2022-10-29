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
    const img = document.querySelector('header');
    img.style.backgroundImage = 'url("https://4.downloader.disk.yandex.ru/preview/76029d2ecead2c3166f7b4d102330586ba6955740fcfa9a8a3a008b19fa50567/inf/otX4tw_aApzMR5vKZIuoIZT5bEE_5vuydbpDEgBTi4WvwTSarH1XhyJXC2sNM9CseCizLmyOkl9eDJCbN0uRIg%3D%3D?uid=92464393&filename=thunder.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=92464393&tknv=v2&size=1841x920")';
  },
};
