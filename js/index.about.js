new Splide('.splide--about', {
  type: 'loop',
  perPage: 3,
  perMove: 1,
  gap: '1.25rem',
  autoHeight: true,
  pagination: false,
  breakpoints: {
    1024: {
      perPage: 2,
    },
    768: {
      perPage: 1,
    },
  },
}).mount();