let players = [
  { name: '櫻木花道', pts: 0, reb: 0, ast: 0, stl: 0, blk: 2 },
  { name: '流川楓', pts: 30, reb: 6, ast: 3, stl: 3, blk: 0 },
  { name: '赤木剛憲', pts: 16, reb: 10, ast: 0, stl: 0, blk: 5 },
  { name: '宮城良田', pts: 6, reb: 0, ast: 7, stl: 6, blk: 0 },
  { name: '三井壽', pts: 21, reb: 4, ast: 3, stl: 0, blk: 0 }
]

const dataPanel = document.querySelector('#data-panel')

// write your code here
function displayPlayerList (players) {
//   body - HTML string
  let body = ''
  players.forEach((player) => { 
    body +=  `
      <tr>
    `
    Object.values(player).forEach(value => {
        if ( typeof (value) === "string") {
          body += `
            <td>${value}</td>
          `
        } else {
           body += `
            <td>
              <span>${value}</span>
              <span class = 'fa fa-plus-circle up'></span>
              <span class = 'fa fa-minus-circle down'></span> 
            </td>       
           `
        } 
    })
    body += `
      </tr>
    `
  }) 
  return body
}

dataPanel.innerHTML = displayPlayerList(players)

// 按鈕功能
const scoreBoard = document.querySelector('tbody#data-panel')
scoreBoard.addEventListener('click', event => {
  const button = event.target 
  if (button.matches('.up') || button.matches('.down')) {
    let score = Number(button.parentElement.children[0].textContent)
    if (button.matches('.up')) {
      score += 1
    } else {
      if (score > 0) {
        score -= 1
      }
    }
    button.parentElement.children[0].textContent = score.toString() 
  }
})