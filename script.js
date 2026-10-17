// defining html elements in index.hmtl
const btn_play_new = document.querySelector('#btn_play_new')
const btn_play_cont = document.querySelector('#btn_play_cont')
const start_menu = document.querySelector('#start_menu')
const game = document.querySelector('#game')

// init menu, hide game UI
start_menu.style.display = 'block'
game.style.display = 'none'

btn_play_new.addEventListener('click', () => {
  // show game content, hide start menu
  const ask_new_game = confirm("Opravdu chceš začít novou hru? Předchozí hra bude smazána!");
  if (ask_new_game) {
    game.style.display = 'block'
    start_menu.style.display = 'none'

    // define money and profit
    let money = 20000000
    // daily profit
    let profit = 0
    let day = 1
    localStorage.setItem('money', money)
    localStorage.setItem('profit', profit)
    localStorage.setItem('day', day)
  }
})

btn_play_cont.addEventListener('click', () => {
  // define money and profit
  if (localStorage.getItem('money') !== null) { let money = localStorage.getItem('money') } else { alert('Neexistuje rozehraná hra!'); return }

  if (localStorage.getItem('profit') !== null) { let profit = localStorage.getItem('profit') } else { alert('Neexistuje rozehraná hra!'); return }

  // show game content, hide start menu
  if (localStorage.getItem('money') !== null) {
    game.style.display = 'block'
    start_menu.style.display = 'none'}
})
