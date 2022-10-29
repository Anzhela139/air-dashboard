// import './styles/footer.css'
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
    this.elements.wrapperFooter = document.createElement('div');
    this.elements.infoContainer = document.createElement('div');
    this.elements.personalReference1 = document.createElement('a');
    this.elements.personalReference2 = document.createElement('a');
    this.elements.year = document.createElement('p');
    this.elements.year.textContent = '2020';
    this.elements.logo = document.createElement('img');
    this.elements.schoolReference = document.createElement('a');
    // добавляем классы и атрибуты
    this.elements.wrapperFooter.classList.add('wrapper');
    this.elements.wrapperFooter.classList.add('wrapper-footer');
    this.elements.infoContainer.classList.add('info-container');
    this.elements.personalReference1.classList.add('personal-reference');
    this.elements.personalReference2.classList.add('personal-reference');
    this.elements.personalReference1.setAttribute('href', 'https://github.com/little-plumelet');
    this.elements.personalReference2.setAttribute('href', 'https://github.com/anzhelaAbitova');
    this.elements.year.classList.add('year');
    this.elements.logo.classList.add('logo');
    this.elements.schoolReference.classList.add('school-reference');
    this.elements.schoolReference.setAttribute('href', 'https://rs.school/js/');
    this.elements.logo.setAttribute('src', 'https://rs.school/images/rs_school_js.svg');
    // добавляем внутреннее наполнение
    this.elements.schoolReference.innerHTML = 'Курс «JavaScript/Front-end»';
    this.elements.personalReference1.innerHTML = 'Little-plumelet. GitHub.';
    this.elements.personalReference2.innerHTML = 'Anzhela Abitova. GitHub.';
    // добавляем элементы в DOM
    const footerContent = document.querySelector('footer');
    footerContent.appendChild(this.elements.wrapperFooter);
    this.elements.wrapperFooter.appendChild(this.elements.infoContainer);
    this.elements.infoContainer.appendChild(this.elements.personalReference1);
    this.elements.infoContainer.appendChild(this.elements.personalReference2);
    this.elements.infoContainer.appendChild(this.elements.year);

    const img = document.querySelector('footer');
  },
};