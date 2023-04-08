// DEFAULT CODE ////////////////////////
const BASE_URL = "https://webdev.alphacamp.io/api/lyrics/";
const songList = document.querySelector("#song-list");
const lyricsPanel = document.querySelector("#lyrics-panel");
const album = {
  artist: "Adele",
  album: "25",
  tracks: [
    "Hello",
    "Send My Love (To Your New Lover)",
    "I Miss You",
    "When We Were Young",
    "Remedy",
    "Water Under the Bridge",
    "River Lea",
    "Love in the Dark",
    "Million Years Ago",
    "All I Ask",
    "Sweetest Devotion"
  ]
};

// WRITE YOUR CODE ////////////////////////
// 加曲目
album.tracks.forEach((name) => {
  const songName = document.createElement("li");
  songName.className = "nav-item"
  songName.innerHTML =  `
  <a class="nav-link">${name}</a>
  `;
  songList.append(songName);
});

// 掛監聽
songList.addEventListener ('click', event => {
// 強調效果
  const song = event.target.textContent
  const pill = document.querySelector('a.active')
  if (pill) {
  pill.classList.remove('active')
  } 
  event.target.classList.add('active')
  
// 加歌名＆歌詞 
  const url = `
  ${BASE_URL}${album.artist}/${song}.json
  `
  axios.get(url) 
    .then( response => {
      lyricsPanel.innerHTML = `
      <h1>${song}</h1>
      <pre>${response.data.lyrics}</pre>
      `
    })
    .catch( error => {
    console.log(error)
  })
})

// 參考answer
// 可以用<a class="nav-link" data-bs-toggle="pill" href="#" role="tab"></a>來完成toggle