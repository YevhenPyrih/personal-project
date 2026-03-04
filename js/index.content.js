function render() {
  new Splide(".splide--content", {
    type: "loop", // Нескінченна прокрутка
    perPage: 1, // Показувати 1 елемент
    perMove: 1, // ГОРТАТИ ПО 1 ЕЛЕМЕНТУ (те, що ви шукали!)
    gap: "1rem",
    pagination: false, // Вимкнути пагінацію
    autoHeight: true, // Дозволити висоті адаптуватися до контенту
  }).mount();
}
render();
