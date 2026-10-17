// DOM elements
const btn_play_new = document.querySelector('#btn_play_new')
const btn_play_cont = document.querySelector('#btn_play_cont')
const start_menu = document.querySelector('#start_menu')
const game_div = document.querySelector('#game_div')
const district_original = document.querySelector('#district_original')

// Initial visibility
start_menu.style.display = 'block'
game_div.style.display = 'none'
district_original.style.display = 'none'

let gameInterval = null;
let currentDay = 1;

function game(money, profit, day, districtCount, score) {
  console.log('game initialized')
  console.log('Money:', money)
  console.log('Profit:', profit)
  console.log('Day:', day)
  console.log('Počet čtvrtí:', districtCount)
  console.log('Score:' , score)
  let btn_stop = document.querySelector('#time')
  let btn_shop = document.querySelector('#shop')

  btn_shop.addEventListener('click', () => {
    game_div.style.display = 'none'
    shop.style.display = 'block'





  })



  btn_stop.addEventListener('click', () => {
    if (gameInterval) {
      // Currently running -> Pause it
      clearInterval(gameInterval);
      gameInterval = null;
      console.log('Game paused (time stopped)');
      btn_stop.innerText = "Spustit Čas";
    } else {
      // Currently stopped -> Resume it
      gameInterval = setInterval(updateDay, 2000);
      console.log('Game resumed');
      btn_stop.innerText = "Pozastavit čas";
    }
  });
  currentDay = parseInt(day);

  const money_log = game_div.querySelector('#money_log')
  const profit_log = game_div.querySelector('#profit_log')
  const day_log = game_div.querySelector('#day_log')
  const score_log = game_div.querySelector('#score_log')

  money_log.innerText = money
  profit_log.innerText = profit

  // Cleanup old districts
  const existingDistricts = game_div.querySelectorAll('.dynamic-district');
  existingDistricts.forEach(d => d.remove());

  // Spawn new districts with stable population data stored on the element
  for (let i = 1; i <= districtCount; i++) {
    let clone = district_original.cloneNode(true);

    clone.id = 'district' + i;
    clone.style.display = 'block';
    clone.classList.add('dynamic-district');

    // Stable district population (fixed per district)
    let stablePopulation = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
    clone.dataset.population = stablePopulation;

    let title = clone.querySelector('p');
    if (title) {
      title.innerText = 'Čtvrť ' + i;
    }
    game_div.appendChild(clone);
  }

  // Clear previous timer
  if (gameInterval) {
    clearInterval(gameInterval);
  }

  // Daily tick updater function (1 tick = 1 day)
  const updateDay = () => {
      currentDay++;
      day_log.innerText = currentDay;

      const newlyCreatedDistricts = game_div.querySelectorAll('.dynamic-district');
      let daily_paper = 0;
      let daily_plastic = 0;
      let daily_bio = 0;
      let daily_mix = 0;

      newlyCreatedDistricts.forEach((districtElement) => {
          let population = parseInt(districtElement.dataset.population);

          let paper = districtElement.querySelector('#paper');
          let plastic = districtElement.querySelector('#plastic');
          let bio = districtElement.querySelector('#bio');
          let mix = districtElement.querySelector('#mix');
          let people = districtElement.querySelector('#people');

          if (people) {
              people.innerText = population;

              let dailyNoise = () => (Math.random() * 0.1) + 0.95;

              if (paper) {
                  let val = (population * 0.0000231 * dailyNoise()).toFixed(2);
                  paper.innerText = val;
                  daily_paper += parseFloat(val);
              }
              if (plastic) {
                  let val = (population * 0.0000225 * dailyNoise()).toFixed(2);
                  plastic.innerText = val;
                  daily_plastic += parseFloat(val);
              }
              if (mix) {
                  let val = (population * 0.00015 * dailyNoise()).toFixed(2);
                  mix.innerText = val;
                  daily_mix += parseFloat(val);
              }
              if (bio) {
                  let val = (population * 0.000175 * dailyNoise()).toFixed(2);
                  bio.innerText = val;
                  daily_bio += parseFloat(val);
              }
          }
      });

    daily_paper.toFixed(2)
    daily_plastic.toFixed(2)
    daily_bio.toFixed(2)
    daily_mix.toFixed(2)


  };

  // Initial render run
  day_log.innerText = currentDay;
  const initialDistricts = game_div.querySelectorAll('.dynamic-district');
  initialDistricts.forEach((districtElement) => {
    let population = parseInt(districtElement.dataset.population);
    districtElement.querySelector('#people').innerText = population;
    districtElement.querySelector('#paper').innerText = (population * 0.00002).toFixed(2);
    districtElement.querySelector('#plastic').innerText = (population * 0.0000225).toFixed(2);
    districtElement.querySelector('#mix').innerText = (population * 0.00015).toFixed(2);
    districtElement.querySelector('#bio').innerText = (population * 0.000175).toFixed(2);
  });

  // Start 2-second day cycle
  gameInterval = setInterval(updateDay, 2000);


}

btn_play_new.addEventListener('click', () => {
  const ask_new_game = confirm("Opravdu chceš začít novou hru? Předchozí hra bude smazána!");
  if (ask_new_game) {
    let inputCount = prompt("Zadej počet čtvrtí:", "3");
    let districtCount = parseInt(inputCount);

    if (isNaN(districtCount) || districtCount <= 0) {
      alert("Neplatná hodnota, nastaveno na výchozí 3 čtvrti.");
      districtCount = 3;
    }

    game_div.style.display = 'block'
    start_menu.style.display = 'none'
    let shop_div = document.querySelector('#shop_div')
    shop_div.style.display = 'none'

    let init_money = 20000000
    let init_profit = 0
    let init_day = 1
    let init_score = 0

    // LocalStorage save
    localStorage.setItem('money', init_money)
    localStorage.setItem('profit', init_profit)
    localStorage.setItem('day', init_day)
    localStorage.setItem('districtCount', districtCount)
    localStorage.setItem('score', init_score)

    game(init_money, init_profit, init_day, districtCount, init_score)
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
  let districtCount = parseInt(localStorage.getItem('districtCount')) || 1;
  let init_score = localStorage.getItem('score')

  game_div.style.display = 'block';
  start_menu.style.display = 'none';
  let shop_div = document.querySelector('#shop_div')
  shop_div.style.display = 'none'

  game(init_money, init_profit, init_day, districtCount , init_score);
});
