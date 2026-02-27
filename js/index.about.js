function render() {
  new Splide( '.splide--about', {
    type       : 'loop',     // Нескінченна прокрутка
    perPage    : 3,          // Показувати 3 елементи на десктопі
    perMove    : 1,          // Гортати по 1 елементу
    gap        : '20px',     // Відступ між слайдами (замінює CSS margin)
    pagination : false,      // Вимкнути пагінацію (крапочки)
    breakpoints: {
      768: {
        perPage: 2,          // На планшетах показувати 2 елементи
      },
      425: {
        perPage: 1,          // На телефонах показувати 1 елемент
      },
    }
  }).mount();
}
render();