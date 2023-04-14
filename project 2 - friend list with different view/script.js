const BASE_URL = "https://user-list.alphacamp.io/api/v1/users/";
const dataPanel = document.querySelector(".data-panel");
const modalTitle = document.querySelector("#modal-title");
const modalAvatar = document.querySelector(".modal-avatar");
const modalInfo = document.querySelector(".modal-info");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input")
const pagination = document.querySelector('.pagination')
const switchButton = document.querySelector('.switch-button')
const personPerPage = 12
let personalList = [];
let searchList = [];
let displayMode = 'card-mode'
let nowPage = 1

axios.get(BASE_URL).then((response) => {
  const data = response.data.results;
  personalList = data
  renderPersonalList(displayMode, renderPersonByPage ('1'));
  renderPagination(personalList)
});

dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-info")) {
    showPersonalInfo(event.target.dataset.id);
  } else if (event.target.matches(".btn-add-favorite")) {
    addToFavorite(event.target.dataset.id)
  }
});

searchForm.addEventListener('submit', function onSearchClicked (event) {
  event.preventDefault()
  const search = searchInput.value.toLowerCase().trim()
  searchList = personalList.filter(person => person.name.toLowerCase().trim().includes(search)) 
  if (!searchList.length) {
    return alert(`keyword: ${searchInput.value} --> no match result!`)
  }
  renderPersonalList(displayMode, renderPersonByPage('1')) 
  nowPage = 1   
  renderPagination(searchList)       
})

switchButton.addEventListener('click', function switchMode (event) {
  if (event.target.dataset.mode === displayMode) return
  else if (event.target.dataset.mode === 'card-mode') {
    displayMode = 'card-mode'
    renderPersonalList(displayMode, renderPersonByPage(nowPage))
  } else if (event.target.dataset.mode === 'list-mode') {
    displayMode = 'list-mode'
    renderPersonalList(displayMode, renderPersonByPage(nowPage))
  }
})

pagination.addEventListener('click', function onPageClicked (event) {
  if (event.target.tagName !== 'A') return
  nowPage = event.target.dataset.page
  renderPersonalList(displayMode, renderPersonByPage(nowPage))
})

function renderPersonalList(displayMode, data) {
  let rawHTML = "";
  if (displayMode === 'card-mode') {
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
              <button class="btn btn-info btn-add-favorite btn-success" data-id="${person.id}">+</button>
            </div>
          </div>
        </div>
      `;
    });
  } else if (displayMode === 'list-mode') {
    rawHTML += `
      <ul class="list-group list-group-flush">
      `;
    data.forEach((person) => {
      rawHTML += `
        <li class="list-group-item d-flex justify-content-between col-12 mb-2">
          <span>  
            <img src=${person.avatar} alt="avatar" width="45" height="45">  
            &emsp;Name:&emsp;<strong>${person.name}</strong>
          </span> 
          <span>
            <button
              class="btn btn-primary btn-show-info"
              data-bs-toggle="modal"
              data-bs-target="#person-modal"
              data-id="${person.id}"
            >
              More
            </button>
            <button
              class="btn btn-info btn-add-favorite"
              data-id="${person.id}"
            >
              +
            </button>
          </span>
        </li>
      `;
    });
    rawHTML += `</ul>`;
  }
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
        <li>Birthday: ${person.birthday}</li>
      </ul>
      `;
    })
    .catch((err) => console.log(err));
}

function addToFavorite (id) {
  const favoritePersonalList = JSON.parse(localStorage.getItem('favoritePersonalList')) || []
  let person = personalList.find(person => String(person.id) === id)
  if (favoritePersonalList.some(favoritePerson => String(favoritePerson.id) === id)) {
    return alert('the person is already in the favorite list!')
  }
  favoritePersonalList.push(person)
  localStorage.setItem('favoritePersonalList',JSON.stringify(favoritePersonalList))
}

function renderPagination (list) {
  let rawHTML = ''
  pages = Math.ceil(list.length / personPerPage)
  for (let page = 1; page <= pages; page ++ ) {
    rawHTML += `
      <li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>
    `  
  pagination.innerHTML = rawHTML
  }
}

function renderPersonByPage (pageNumber) {
  const startIndex = (Number(pageNumber)-1) * personPerPage
  let list = searchList.length ? searchList : personalList
  list = list.slice(startIndex, startIndex+personPerPage)
  return list 
} 