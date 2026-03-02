function render() {
  new Splide(".splide--testimonials", {
    type: "slide", // Нескінченна прокрутка
    perPage: 1, // Показувати 1 елемент
    perMove: 1, // ГОРТАТИ ПО 1 ЕЛЕМЕНТУ (те, що ви шукали!)
    gap: "1rem", // Відступ між слайдами
    autoHeight: true, // Дозволити висоті адаптуватися до контенту
    pagination: true,
  }).mount();
}
render();
