(async function () {
  const response = await fetch("../api/certificates.json");
  const data = await response.json();

  const leftImage = document.querySelector(".certificates__carousel-img-left");
  const rightImage = document.querySelector(
    ".certificates__carousel-img-right",
  );

  const leftArrow = document.querySelector(
    ".certificates__carousel-left-arrow",
  );
  const rightArrow = document.querySelector(
    ".certificates__carousel-right-arrow",
  );

  const rightHiddenImage = document.querySelector(
    ".certificates__carousel-img-hidden-right",
  );
  const leftHiddenImage = document.querySelector(
    ".certificates__carousel-img-hidden-left",
  );

  const carouselWrapper = document.querySelector(".carousel__image-wrapper");

  let currentCertificateIndex = 0;

  let paused = false;

  function getIndex(idx, length) {
    return ((idx % length) + length) % length;
  }

  function renderCertificates(certificates) {
    const len = certificates.length;
    leftImage.src = certificates[getIndex(currentCertificateIndex, len)].src;
    leftImage.alt = certificates[getIndex(currentCertificateIndex, len)].name;
    rightImage.src =
      certificates[getIndex(currentCertificateIndex + 1, len)].src;
    rightImage.alt =
      certificates[getIndex(currentCertificateIndex + 1, len)].name;
  }

  renderCertificates(data);

  function slideLeft() {
    paused = true;
    renderHiddenImage("right", data);
    carouselWrapper.classList.toggle("carousel__left-motion");
    setTimeout(() => {
      carouselWrapper.classList.toggle("carousel__left-motion");
      paused = false;
      currentCertificateIndex++;
      renderCertificates(data);
    }, 500);
  }

  function slideRight() {
    paused = true;
    renderHiddenImage("left", data);
    carouselWrapper.classList.toggle("carousel__right-motion");
    setTimeout(() => {
      carouselWrapper.classList.toggle("carousel__right-motion");
      paused = false;
      currentCertificateIndex--;
      renderCertificates(data);
    }, 500);
  }

  function renderHiddenImage(image, certificates) {
    const len = certificates.length;
    switch (image) {
      case "left":
        leftHiddenImage.src =
          certificates[getIndex(currentCertificateIndex - 1, len)].src;
        leftHiddenImage.alt =
          certificates[getIndex(currentCertificateIndex - 1, len)].name;
        break;
      case "right":
        rightHiddenImage.src =
          certificates[getIndex(currentCertificateIndex + 2, len)].src;
        rightHiddenImage.alt =
          certificates[getIndex(currentCertificateIndex + 2, len)].name;
        break;
    }
  }

  leftArrow.addEventListener("click", () => {
    if (!paused) {
      slideLeft();
    }
  });

  rightArrow.addEventListener("click", () => {
    if (!paused) {
      slideRight();
    }
  });
})();
