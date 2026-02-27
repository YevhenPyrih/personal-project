function render() {
  new Splide(".splide--testimonials", {
    type: "slide", // Нескінченна прокрутка
    perPage: 1, // Показувати 2 елементи
    perMove: 1, // ГОРТАТИ ПО 1 ЕЛЕМЕНТУ (те, що ви шукали!)
    gap: "1rem",
    pagination: true,
  }).mount();
}
render();
