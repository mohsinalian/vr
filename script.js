"use strict";

const slogan = document.querySelector(".slogan");
const headerTitle = document.querySelector(".header-title");
const headerImg = document.querySelector(".header-img");

const nav = document.querySelector(".nav");

const header = document.querySelector(".header");

// animations

const textAnimator = function (e) {
  {
    const x = window.pageYOffset;
    slogan.style.left = -x + "px";
    headerTitle.style.left = x + "px";
  }
};

window.addEventListener("scroll", textAnimator);

//
// nav.scrollIntoView({ behavior: "smooth" });

// navigation animation

let id;
const navigator = function (e) {
  if (!e.target.classList.contains("nav__link--btn")) return;
  e.preventDefault();
  id = e.target.getAttribute("scroll");
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
  });
};
nav.addEventListener("click", navigator);

const a = function () {
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
  });
  console.log("a");
};

// slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const slider = document.querySelector(".slider");
  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");
  const dotContainer = document.querySelector(".dots");

  let currentSlide = 0;
  const maxSlide = slides.length;

  // slider.style.transform = `scale(.7) translateX(-200px)`;
  // slider.style.overflow = 'visible';

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot " data-slide="${i}"></button>`
      );
    });
  };

  const activateDots = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((d) => d.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activateDots(currentSlide);
  };
  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activateDots(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDots(0);
  };
  init();
  // Event Listners

  setInterval(nextSlide, 6000);

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    e.key === "ArrowLeft" && previousSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDots(slide);
    }
  });
};
slider();

// Intersection animations

const allProducts = document.querySelectorAll(".product");

const animation = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting || !entry.intersectionRatio > 0.16) return;
  entry.target.classList.remove("animate");
  observer.unobserve(entry.target);
};
const productObserver = new IntersectionObserver(animation, {
  root: null,
  threshold: 0.13,
});
allProducts.forEach((p) => {
  productObserver.observe(p);
  p.classList.add("animate");
});

// sticky nav

const navHeight = nav.getBoundingClientRect().height;

const stickyNavCallBack = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const stickyNavObserver = new IntersectionObserver(stickyNavCallBack, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

stickyNavObserver.observe(header);
