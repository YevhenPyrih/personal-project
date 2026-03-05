new Splide('.splide--certificates', {
  type: 'loop',
  perPage: 2,
  perMove: 1,
  gap: '1rem',
  pagination: false,
  autoHeight: true,
  breakpoints: {
    768: {
      perPage: 1,
    },
  },
}).mount();