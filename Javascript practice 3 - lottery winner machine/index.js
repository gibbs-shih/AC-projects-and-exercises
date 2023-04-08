// DATA /////////////////////////////////////

const players = [
  { name: 'Bernard', email: 'bernard@example.com' },
  { name: 'Youchi', email: 'youchi@example.com' },
  { name: 'Yenting', email: 'yenting@example.com' },
  { name: 'Angela', email: 'angela@example.com' },
  { name: 'Yvonne', email: 'yvonne@example.com' },
  { name: 'Ellen', email: 'ellen@example.com' },
  { name: 'Walter', email: 'walter@example.com' },
  { name: 'Kevin', email: 'kevin@example.com' },
  { name: 'Tim', email: 'tim@example.com' },
  { name: 'Russell', email: 'russell@example.com' }
]

// FUNCTIONS /////////////////////////////////////

function drawWinner(players, prize) {
  // write your code here
  let index = Math.floor(Math.random() * players.length)
  announceMsg(players[index], prize)
  players.splice(index, 1)
}

function announceMsg(winner, prize) {
  // 請新增 encodeName 和 encodeEmail 函式進行字串處理 
  console.log(`${winner.num} | ${encodeName(winner.name)} | ${encodeEmail(winner.email)} | ${prize}`)
}

function encodeName(name) {
  // 請封裝你之前寫好的程式碼，並設計必要參數
  let showName = name.slice(0, 2)
  let hideName = ''
  for (let i = 2; i < name.length; i++) {
    hideName += '*'
  }
  return showName + hideName
}

function encodeEmail(email) {
  // 請封裝你之前寫好的程式碼，並設計必要參數
  let index = email.indexOf('@')
  // @前面
  let name = email.slice(0, index)
  let show = ''
  if (name.length % 2 === 0) {
    show = name.slice(0, (name.length) / 2)
  } else {
    show = name.slice(0, (name.length + 1) / 2 - 1)
  }
  // ＠後面
  let address = email.slice(index)
  // 組合回傳
  return show + '...' + address
}

// // add more functions here
function getNum() {
  let ticket = ''
  const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < 6; i++) {
    if (i < 2) {
      let x = char[getRandomInt(0, 25)]
      ticket = ticket + x
    } else {
      x = getRandomInt(0, 9).toString()
      ticket = ticket + x
    }
  }
  return ticket
}

//Getting a random integer between two values, inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// EXECUTING /////////////////////////////////////

// each player gets a lottery ticket
// write your code here
let numList = []
for (let person in players) {
  if (numList.length < 1) {
    let number = getNum()
    numList.push(number)
    players[person]['num'] = number
  } else {
    number = getNum()
    while (numList.includes(number)) {
      number = getNum()
    }
    numList.push(number)
    players[person]['num'] = number
  }
}

// draw 3 winners and announce the results
drawWinner(players, '頭獎')
drawWinner(players, '貮獎')
drawWinner(players, '叁獎')

// the rest of players get participation award
// write your code here
while (players.length > 0) {
  drawWinner(players, '參加獎')
}
