// defining html elements in index.hmtl
const btn_play_new = document.querySelector('#btn_play_new')
const btn_play_cont = document.querySelector('#btn_play_cont')
const start_menu = document.querySelector('#start_menu')
const game_div = document.querySelector('#game_div')

// init menu, hide game UI
start_menu.style.display = 'block'
game_div.style.display = 'none'

function game(money, profit,day) {
  console.log('game initialized')
  console.log(money)
  console.log(profit)
  console.log(day)

  const money_log = game_div.querySelector('#money_log')
  const profit_log = game_div.querySelector('#profit_log')
  const day_log = game_div.querySelector('#day_log')
  day_log.innerText = day
  money_log.innerText = money
  profit_log.innerText = profit

}

btn_play_new.addEventListener('click', () => {
  // show game content, hide start menu
  const ask_new_game = confirm("Opravdu chceš začít novou hru? Předchozí hra bude smazána!");
  if (ask_new_game) {
    game_div.style.display = 'block'
    start_menu.style.display = 'none'

    // define money and profit
    let init_money = 20000000
    // daily profit
    let init_profit = 0
    let init_day = 1
    localStorage.setItem('money', init_money)
    localStorage.setItem('profit', init_profit)
    localStorage.setItem('day', init_day) +
    game(init_money,init_profit,init_day)
  }
})

btn_play_cont.addEventListener('click', () => {

  if (localStorage.getItem('money') === null) {
    alert('Neexistuje rozehraná hra!');
    return;
  }
  let init_money = localStorage.getItem('money');
  let init_profit = localStorage.getItem('profit');
  let init_day = localStorage.getItem('day');

  game_div.style.display = 'block';
  start_menu.style.display = 'none';

  game(init_money, init_profit, init_day);
});
