const BASE_URL = "https://user-list.alphacamp.io/api/v1/users/"
const dataPanel = document.querySelector("#data-panel");
const modalTitle = document.querySelector("#modal-title");
const modalAvatar = document.querySelector(".modal-avatar");
const modalInfo = document.querySelector(".modal-info");
let favoritePersonalList = JSON.parse(localStorage.getItem('favoritePersonalList')) || [];

renderPersonalList(favoritePersonalList);

dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-info")) {
    showPersonalInfo(event.target.dataset.id);
  } else if (event.target.matches(".btn-remove-favorite")) {
    removePerson (event.target.dataset.id)
  }
});

function renderPersonalList(data) {
  let rawHTML = "";
  data.forEach((person) => {
    rawHTML += `
    <div class='col-sm-3 mb-2'>
      <div class="card" >
        <img src=${person.avatar} class="card-img-top" alt="avatar">
        <div class="card-body">
          <h5 class="card-title">${person.name}</h5>
          <p class="card-text">${person.surname}</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-info" data-bs-toggle="modal" data-bs-target="#person-modal" data-id="${person.id}">More</button>
          <button class="btn btn-info btn-remove-favorite btn-danger" data-id="${person.id}">x</button>
        </div>
      </div>
    </div>
  `;
  });
  dataPanel.innerHTML = rawHTML;
}

function showPersonalInfo(id) {
  axios
    .get(BASE_URL + id)
    .then((res) => {
      const person = res.data;
      modalTitle.innerText = person.name;
      modalAvatar.src = person.avatar;
      modalInfo.innerHTML = `
      <div></div>
      <ul>
        <li>Surname: ${person.surname}</li>
        <li>Email: ${person.email}</li>
        <li>Gender: ${person.gender}</li>
        <li>Age: ${person.age}</li>
        <li>Region: ${person.region}</li>
        <li>Borthday: ${person.birthday}</li>
      </ul>
      `;
    })
    .catch((err) => console.log(err));
}

function removePerson (id) {
  if (!favoritePersonalList || !favoritePersonalList.length) return
  const personIndex = favoritePersonalList.findIndex(person => String(person.id) === id)
  if (personIndex === -1) return
  favoritePersonalList.splice(personIndex, 1)
  renderPersonalList(favoritePersonalList)
  localStorage.setItem('favoritePersonalList',JSON.stringify(favoritePersonalList))
}