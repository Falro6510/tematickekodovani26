// defining html elements in index.hmtl
const btn_play = document.querySelector('#btn_play')
const start_menu = document.querySelector('#start_menu')
const game = document.querySelector('#game')

// init menu, hide game UI
start_menu.style.display = 'block'
game.style.display = 'none'

btn_play.addEventListener('click', () => {
// show game content, hide start menu
  game.style.display = 'block'
  start_menu.style.display = 'none'
})
