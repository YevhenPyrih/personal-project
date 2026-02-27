function render() {
  new Splide( '.splide', {
    type   : 'loop',     // Нескінченна прокрутка
    perPage: 2,          // Показувати 2 елементи
    perMove: 1,          // ГОРТАТИ ПО 1 ЕЛЕМЕНТУ (те, що ви шукали!)
    gap    : '1rem',
    pagination: false,  // Вимкнути пагінацію
    breakpoints: {
      1024: {
        perPage: 1,      // На планшетах показувати 1
      }
    }
  } ).mount();
}
render();