"use strict";

const scrollBtn = document.querySelector(".scroll-btn");
const section1 = document.querySelector(".section1");

scrollBtn.addEventListener("click", function () {
  section1.scrollIntoView({
    behavior: "smooth",
  });
});
