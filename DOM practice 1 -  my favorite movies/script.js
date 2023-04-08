// 資料
const movies = [{
  title: 'The Avengers',
  image: 'https://assets-lighthouse.alphacamp.co/uploads/image/file/15305/TheAvengersPoster.jpg',
  rating: 0
},
{
  title: 'Our Times',
  image: 'https://assets-lighthouse.alphacamp.co/uploads/image/file/15304/OurtimesPoster.jpeg',
  rating: 0
},
{
  title: 'Aquaman',
  image: 'https://assets-lighthouse.alphacamp.co/uploads/image/file/15303/AquamanPoster.jpg',
  rating: 0
}]

// 選取節點
const dataPanel = document.querySelector("#data-panel");

// 函式
function displayMovieList(movies) {
  let htmlContent = `
    <table class="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Rating</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
    `;

  movies.forEach((movie) => {
    htmlContent += `
        <tr>
          <td>
            <img src="${movie.image}" width="70" class="img-thumbnail">
          </td>
          <td>${movie.title}</td>
          <td>
            <span class="fa fa-thumbs-up"></span>
            <span class="fa fa-thumbs-down px-2"></span>
            <span>${movie.rating}</span>
          </td>
          <td>
            <button class="btn btn-sm btn-success fa fa-thumbs-up"></button>
          </td>
          <td>
            <button class="btn btn-sm btn-danger">X</button>
          </td>

        </tr>
      `;
  });

  htmlContent += `
      </tbody>
    </table>
  `;

  return htmlContent;
}

// 主程式
dataPanel.innerHTML = displayMovieList(movies);

// 掛監聽器
dataPanel.addEventListener('click', event => {
  const botton = event.target
  
  // 評分按鈕
  if (botton.matches('span.fa-thumbs-up') || botton.matches('span.fa-thumbs-down')) {
    let rating = Number(botton.parentElement.children[2].textContent)
    if (botton.matches('span.fa-thumbs-up')) {
      rating += 1    
    } else {
      if (rating > 0) {
        rating -= 1
      }
    }
    botton.parentElement.children[2].textContent = rating
  } else if (botton.matches('.btn.fa-thumbs-up')) {
    let rating = Number(botton.parentElement.previousElementSibling.children[2].textContent)
    rating += 10
    botton.parentElement.previousElementSibling.children[2].textContent = rating   
  }
  
  // 刪除按鈕
  if (botton.matches('.btn-danger')) {
    const deleteItem = botton.parentElement.parentElement
    deleteItem.remove()
  }
})