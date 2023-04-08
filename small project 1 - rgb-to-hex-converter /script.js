const elements = document.querySelector(".elements");
const body = document.querySelector("body");
const hexNumber = document.querySelector(".hex-number");
let red = Number(elements.children[0].children[1].value);
let green = Number(elements.children[1].children[1].value);
let blue = Number(elements.children[2].children[1].value);

// 初始數值
for (element of Object.values(elements.children)) {
  element.children[2].textContent = element.children[1].value;
}

// 掛監聽器
elements.addEventListener("input", changeValue);

function changeValue(event) {
  const slider = event.target;
  if (slider.matches("#red")) {
    slider.nextElementSibling.textContent = slider.value;
    red = Number(slider.value);
  } else if (slider.matches("#green")) {
    slider.nextElementSibling.textContent = slider.value;
    green = Number(slider.value);
  } else if (slider.matches("#blue")) {
    slider.nextElementSibling.textContent = slider.value;
    blue = Number(slider.value);
  }
  let hexString = hex(red, green, blue);
  hexNumber.textContent = `#${hexString}`;
  body.style = `background-color:#${hexString}`;
}

// 16進位
function hex(red, green, blue) {
  red = red.toString(16).padStart(2, "0");
  green = green.toString(16).padStart(2, "0");
  blue = blue.toString(16).padStart(2, "0");
  return red + green + blue;
}