const imgSlider = document.querySelector(".img-slider");
const imgFruits = document.querySelectorAll(".img-item.fruit");
const infoSlider = document.querySelector(".info-slider");
const infoItems = document.querySelectorAll(".info-item");
const bgs = document.querySelectorAll(".bg");
const carousel = document.querySelector(".carousel");

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let index = 0;
let direction = 0;

function updateActiveItems() {
  imgFruits.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });

  bgs.forEach((bg, i) => {
    bg.classList.toggle("active", i === index);
  });

  infoItems.forEach((item, i) => {
    if (i === index) {
      item.style.opacity = 0;
      item.style.display = "flex";

      item.offsetHeight;
      item.style.transition = "opacity 0.5s ease-in-out";
      item.style.opacity = 1;
    } else {
      item.style.opacity = 0;
      setTimeout(() => {
        item.style.display = "none";
      }, 500);
    }
  });

  const activeBg = getComputedStyle(bgs[index]).backgroundColor;
  carousel.style.backgroundColor = activeBg;
}

function handleTransition() {
  infoSlider.style.transition =
    "transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)";
  infoSlider.style.transform = `translateY(${direction * 25}%)`;

  setTimeout(() => {
    infoSlider.style.transition = "none";
    infoSlider.style.transform = "translateY(0%)";
  }, 500);
}

function updateCarousel() {
  imgSlider.style.transform = `rotate(${index * -90}deg)`;
  updateActiveItems();
  handleTransition();
}

function changeIndex(step) {
  index = (index + step + imgFruits.length) % imgFruits.length;
  updateCarousel();
}

nextBtn.addEventListener("click", () => {
  direction = -1;
  changeIndex(1);
});

prevBtn.addEventListener("click", () => {
  direction = 1;
  changeIndex(-1);
});

infoSlider.addEventListener("transitionend", () => {
  if (direction === -1) {
    infoSlider.appendChild(infoSlider.firstElementChild);
  } else if (direction === 1) {
    infoSlider.prepend(infoSlider.lastElementChild);
  }
});
