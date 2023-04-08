// 初始變數
const list = document.querySelector("#my-todo");
const addBtn = document.querySelector("#add-btn");
const input = document.querySelector("#new-todo");

// 資料
const todos = [
  "Hit the gym",
  "Read a book",
  "Buy eggs",
  "Organize office",
  "Pay bills"
];

list.innerHTML = `
  <div class="fs-4 fw-bold" id='todo-list'>Todo</div>
  <div class="fs-4 fw-bold" id='done-list'>Done</div>
`;
const todoList = document.querySelector("div#todo-list");
const doneList = document.querySelector("div#done-list");

for (let todo of todos) {
  addItem(todo);
}

// 函式
function addItem(text) {
  const newItem = document.createElement("li");
  newItem.innerHTML = `
    <label for="todo" class="fs-6 fw-normal">${text}</label>
    <i class="delete fa fa-trash fs-6 fw-normal"></i>
  `;
  todoList.appendChild(newItem);
}

// Create
addBtn.addEventListener("click", function () {
  const inputValue = input.value;
  if (inputValue.trim("").length > 0) {
    addItem(inputValue);
  }
});

input.addEventListener("keyup", (event) => {
  const inputValue = input.value;
  if (inputValue.trim("").length > 0 && event.key === "Enter") {
    addItem(inputValue);
  }
});

// Delete and check
list.addEventListener("click", function (event) {
  const target = event.target;
  const parentElement = target.parentElement;
  if (target.classList.contains("delete")) {
    parentElement.remove();
  } else if (
    target.tagName === "LABEL" &&
    parentElement.parentElement.matches("#todo-list")
  ) {
    //  移動至done、checked
    target.classList.toggle("checked");
    doneList.appendChild(parentElement);
  }
});