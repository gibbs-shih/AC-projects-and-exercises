const game = document.querySelector("div");
let score = Number(document.querySelector(".display-3").textContent);

game.addEventListener("mousedown", (event) => {
  // 換圖
  event.target.parentElement.children[2].src =
    "https://popcat.click/img/op.353767c3.png";
  // 加數字
  score += 1;
  event.target.parentElement.children[1].textContent = score;
});

game.addEventListener("mouseup", (event) => {
  // 換圖
  event.target.parentElement.children[2].src =
    "https://popcat.click/img/p.1e9d00be.png";
  // 音效
  event.target.parentElement.children[3].play();
});