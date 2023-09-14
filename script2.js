"use strict";

const allImg = document.querySelectorAll(".img");

allImg.forEach((img) => {
  img.addEventListener("mouseover", function (e) {
    img.style.scale = 1.1;
  });
  img.addEventListener("mouseout", function (e) {
    img.style.scale = 1;
  });
});
