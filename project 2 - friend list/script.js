const BASE_URL = "https://user-list.alphacamp.io/api/v1/users/";
const dataPanel = document.querySelector("#data-panel");
const modalTitle = document.querySelector("#modal-title");
const modalAvatar = document.querySelector(".modal-avatar");
const modalInfo = document.querySelector(".modal-info");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input")
const pagination = document.querySelector('.pagination')
const personPerPage = 12
let personalList = [];
let searchList = []

axios.get(BASE_URL).then((response) => {
  const data = response.data.results;
  personalList = data
  renderPersonalList(renderPersonByPage ('1'));
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
  renderPersonalList(renderPersonByPage('1'))    
  renderPagination(searchList)
           
})

pagination.addEventListener('click', function onPageClicked (event) {
  if (event.target.tagName !== 'A') return
  renderPersonalList(renderPersonByPage(event.target.dataset.page))
})

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
          <button class="btn btn-info btn-add-favorite btn-success" data-id="${person.id}">+</button>
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

function addToFavorite (id) {
  const favoritePersonalList = JSON.parse(localStorage.getItem('favoritePersonalList')) || []
  let person = personalList.find(person => String(person.id) === id)
  if (favoritePersonalList.some(favoritrePerson => String(favoritrePerson.id) === id)) {
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