function initCarousel() {
  // ваш код...
  const carouselInner = document.querySelector(".carousel__inner");
  const prevBtn = document.querySelector(".carousel__arrow_left");
  const nextBtn = document.querySelector(".carousel__arrow_right");

  let current = 1;
  let offset = 0;

  prevBtn.style.display = "none";

  prevBtn.addEventListener("click", () => {
    current -= 1;
    offset -= carouselInner.offsetWidth;

    handleChangeSlide(current, offset);
  });

  nextBtn.addEventListener("click", () => {
    current += 1;
    offset += carouselInner.offsetWidth;

    handleChangeSlide(current, offset);
  });

  const handleChangeSlide = (slide, space) => {
    carouselInner.style.transform = `translateX(-${space}px)`;

    const lastSlide = carouselInner.children.length;

    switch (true) {
      case slide === 1:
        prevBtn.style.display = "none";
        break;
      case slide > 1 && slide < lastSlide:
        nextBtn.style.display = "";
        prevBtn.style.display = "";
        break;
      case slide === lastSlide:
        nextBtn.style.display = "none";
        break;
    }
  };
}
