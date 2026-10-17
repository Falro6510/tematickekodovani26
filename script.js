// DOM elements
const btn_play_new = document.querySelector('#btn_play_new');
const btn_play_cont = document.querySelector('#btn_play_cont');
const start_menu = document.querySelector('#start_menu');
const game_div = document.querySelector('#game_div');
const district_original = document.querySelector('#district_original');

// Initial visibility
start_menu.style.display = 'block';
game_div.style.display = 'none';
district_original.style.display = 'none';
let shop_div = document.querySelector('#shop_div');
if (shop_div) shop_div.style.display = 'none';

let gameInterval = null;
let currentDay = 1;
let purchasedItems = [];

function getScoreThresholdForLevel(level) {
  let totalScoreNeeded = 0;
  for (let i = 1; i < level; i++) {
    totalScoreNeeded += i * 10000;
  }
  return totalScoreNeeded;
}

function calculateLevelFromScore(score) {
  let level = 1;
  while (score >= getScoreThresholdForLevel(level + 1)) {
    level++;
  }
  return level;
}

function game(money, profit, day, districtCount, score) {
  console.log('game initialized');
  let btn_stop = document.querySelector('#time');
  let btn_shop = document.querySelector('#shop');
  let btn_save = document.querySelector('#btn_save');
  shop_div = document.querySelector('#shop_div');

  currentDay = parseInt(day);
  let currentScore = parseInt(score) || 0;
  let currentMoney = parseFloat(money);
  let currentProfit = parseFloat(profit) || 0;
  let activeDistrictCount = parseInt(districtCount) || 1;
  let currentLevel = calculateLevelFromScore(currentScore);

  const money_log = game_div.querySelector('#money_log');
  const profit_log = game_div.querySelector('#profit_log');
  const day_log = game_div.querySelector('#day_log');
  const score_log = game_div.querySelector('#score_log');
  const level_log = game_div.querySelector('#level_log');

  money_log.innerText = currentMoney.toLocaleString();
  profit_log.innerText = currentProfit.toLocaleString();
  score_log.innerText = currentScore.toLocaleString();
  if (level_log) level_log.innerText = currentLevel;

  const renderDistricts = (count) => {
    const existingDistricts = game_div.querySelectorAll('.dynamic-district');
    existingDistricts.forEach(d => d.remove());

    for (let i = 1; i <= count; i++) {
      let clone = district_original.cloneNode(true);
      clone.id = 'district' + i;
      clone.style.display = 'block';
      clone.classList.add('dynamic-district');

      let stablePopulation = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;
      clone.dataset.population = stablePopulation;

      let title = clone.querySelector('p');
      if (title) {
        title.innerText = 'Čtvrť ' + i;
      }
      game_div.appendChild(clone);
    }
  };

  renderDistricts(activeDistrictCount);

  if (gameInterval) {
    clearInterval(gameInterval);
  }

  const saveGame = () => {
    localStorage.setItem('money', currentMoney);
    localStorage.setItem('profit', currentProfit);
    localStorage.setItem('day', currentDay);
    localStorage.setItem('districtCount', activeDistrictCount);
    localStorage.setItem('score', currentScore);

    let serializableItems = purchasedItems.map(item => ({
      id: item.id,
      price: item.price,
      cost: item.cost,
      capacity: item.capacity,
      material: item.material,
      type: item.type,
      name: item.name
    }));
    localStorage.setItem('purchasedItems', JSON.stringify(serializableItems));
  };

  // --- ULOŽENÍ A NÁVRAT DO START MENU ---
  if (btn_save) {
    btn_save.onclick = () => {
      saveGame();

      // Zastavení herní smyčky
      if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
      }

      // Přepnutí zobrazení oken zpět do menu
      game_div.style.display = 'none';
      if (shop_div) shop_div.style.display = 'none';
      start_menu.style.display = 'block';

      alert('Hra byla úspěšně uložena a byl jsi vrácen do menu.');
    };
  }
  // -------------------------------------

  const updateDay = () => {
    currentDay++;
    day_log.innerText = currentDay;

    const newlyCreatedDistricts = game_div.querySelectorAll('.dynamic-district');
    let total_paper = 0;
    let total_plastic = 0;
    let total_bio = 0;
    let total_mix = 0;

    newlyCreatedDistricts.forEach((districtElement) => {
      let population = parseInt(districtElement.dataset.population);
      population += Math.floor(Math.random() * 31) + 10;
      districtElement.dataset.population = population;

      let paper = districtElement.querySelector('#paper');
      let plastic = districtElement.querySelector('#plastic');
      let bio = districtElement.querySelector('#bio');
      let mix = districtElement.querySelector('#mix');
      let people = districtElement.querySelector('#people');

      if (people) {
        people.innerText = population;
        let dailyNoise = () => (Math.random() * 0.1) + 0.95;

        if (paper) {
          let val = 0.15 * dailyNoise();
          paper.innerText = val.toFixed(2);
          total_paper += val * population;
        }
        if (plastic) {
          let val = 0.20 * dailyNoise();
          plastic.innerText = val.toFixed(2);
          total_plastic += val * population;
        }
        if (bio) {
          let val = 0.25 * dailyNoise();
          bio.innerText = val.toFixed(2);
          total_bio += val * population;
        }
        if (mix) {
          let val = 0.30 * dailyNoise();
          mix.innerText = val.toFixed(2);
          total_mix += val * population;
        }
      }
    });

    let sorterCapacity = 0;
    let paperCapacity = 0;
    let plasticCapacity = 0;
    let bioCapacity = 0;
    let totalDailyCost = 0;

    purchasedItems.forEach(item => {
      totalDailyCost += item.cost;
      if (item.type === 'sorter') sorterCapacity += item.capacity;
      if (item.material === 'paper') paperCapacity += item.capacity;
      if (item.material === 'plastic') plasticCapacity += item.capacity;
      if (item.material === 'bio') bioCapacity += item.capacity;
    });

    let totalSortableWaste = total_paper + total_plastic + total_bio;
    let sortedRatio = sorterCapacity > 0 ? Math.min(1, sorterCapacity / totalSortableWaste) : 0;

    let availablePaper = total_paper * sortedRatio;
    let availablePlastic = total_plastic * sortedRatio;
    let availableBio = total_bio * sortedRatio;

    total_mix += (total_paper - availablePaper) + (total_plastic - availablePlastic) + (total_bio - availableBio);

    let processedPaper = Math.min(availablePaper, paperCapacity);
    let processedPlastic = Math.min(availablePlastic, plasticCapacity);
    let processedBio = Math.min(availableBio, bioCapacity);

    total_mix += (availablePaper - processedPaper) + (availablePlastic - processedPlastic) + (availableBio - processedBio);

    purchasedItems.forEach(item => {
      if (item.elementRef) {
        let usagePercentage = 0;
        if (item.type === 'sorter') {
          usagePercentage = sorterCapacity > 0 ? Math.min(100, (totalSortableWaste / sorterCapacity) * 100) : 0;
        } else {
          let matAmount = item.material === 'paper' ? total_paper : (item.material === 'plastic' ? total_plastic : total_bio);
          let matCap = item.material === 'paper' ? paperCapacity : (item.material === 'plastic' ? plasticCapacity : bioCapacity);
          usagePercentage = matCap > 0 ? Math.min(100, (matAmount / matCap) * 100) : 0;
        }
        const usageSpan = item.elementRef.querySelector('.item-usage');
        if (usageSpan) usageSpan.innerText = usagePercentage.toFixed(1);
      }
    });

    let profitFromPaper = processedPaper * 5;
    let profitFromPlastic = processedPlastic * 8;
    let profitFromBio = processedBio * 3;

    currentProfit = Math.floor(profitFromPaper + profitFromPlastic + profitFromBio - totalDailyCost);
    profit_log.innerText = currentProfit.toLocaleString();

    let totalRecycledKg = processedPaper + processedPlastic + processedBio;
    let scoreGain = Math.floor(totalRecycledKg * 1.5);
    let scorePenalty = Math.floor(total_mix * 0.5);

    currentScore += (scoreGain - scorePenalty);
    score_log.innerText = currentScore.toLocaleString();

    let newLevel = calculateLevelFromScore(currentScore);
    if (newLevel > currentLevel) {
      let levelDiff = newLevel - currentLevel;
      currentLevel = newLevel;
      activeDistrictCount += levelDiff * 2;
      renderDistricts(activeDistrictCount);

      if (level_log) level_log.innerText = currentLevel;

      let nextLevelGoal = getScoreThresholdForLevel(currentLevel + 1);
      alert(`Gratulujeme! Dosáhl jsi Levelu ${currentLevel}! Byly založeny 2 nové čtvrti. Další level vyžaduje ${nextLevelGoal.toLocaleString()} bodů.`);
    }

    currentMoney += currentProfit;
    money_log.innerText = currentMoney.toLocaleString();

    saveGame();
  };

  if (btn_stop) {
    btn_stop.onclick = () => {
      if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
        btn_stop.innerText = "Spustit Čas";
      } else {
        gameInterval = setInterval(updateDay, 4000);
        btn_stop.innerText = "Pozastavit čas";
      }
    };
  }

  if (btn_shop) {
    btn_shop.onclick = () => {
      if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
        btn_stop.innerText = "Spustit Čas";
      }
      game_div.style.display = 'none';
      shop_div.style.display = 'block';
    };
  }

  const shop_back = document.querySelector('#shop_back');
  if (shop_back) {
    shop_back.onclick = () => {
      shop_div.style.display = 'none';
      game_div.style.display = 'block';
      if (!gameInterval) {
        gameInterval = setInterval(updateDay, 4000);
        btn_stop.innerText = "Pozastavit čas";
      }
    };
  }

  day_log.innerText = currentDay;
  gameInterval = setInterval(updateDay, 4000);

  window.updateCurrentMoneyDisplay = (newMoney) => {
    currentMoney = newMoney;
    money_log.innerText = currentMoney.toLocaleString();
  };
}

const shopItems = {
  buy_man_sor: { id: 'buy_man_sor', price: 100000, cost: 500, capacity: 600, type: 'sorter', name: 'Manuální třídička' },
  buy_aut_sor: { id: 'buy_aut_sor', price: 250000, cost: 1200, capacity: 1800, type: 'sorter', name: 'Automatická třídička' },
  buy_sma_pap: { id: 'buy_sma_pap', price: 80000, cost: 400, capacity: 400, material: 'paper', type: 'factory', name: 'Malý závod na papír' },
  buy_big_pap: { id: 'buy_big_pap', price: 200000, cost: 900, capacity: 1200, material: 'paper', type: 'factory', name: 'Velký závod na papír' },
  buy_sma_pla: { id: 'buy_sma_pla', price: 100000, cost: 500, capacity: 400, material: 'plastic', type: 'factory', name: 'Malý závod na plast' },
  buy_big_pla: { id: 'buy_big_pla', price: 250000, cost: 1100, capacity: 1200, material: 'plastic', type: 'factory', name: 'Velký závod na plast' },
  buy_sma_bio: { id: 'buy_sma_bio', price: 60000, cost: 300, capacity: 500, material: 'bio', type: 'factory', name: 'Malý závod na bioodpad' },
  buy_big_bio: { id: 'buy_big_bio', price: 150000, cost: 700, capacity: 1500, material: 'bio', type: 'factory', name: 'Velký závod na bioodpad' }
};

const buyList = [
  'buy_man_sor', 'buy_aut_sor', 'buy_sma_pap', 'buy_big_pap',
  'buy_sma_pla', 'buy_big_pla', 'buy_sma_bio', 'buy_big_bio'
];

buyList.forEach((id) => {
  const element = document.querySelector('#' + id);
  if (element) {
    element.addEventListener('click', () => {
      const itemTemplate = shopItems[id];
      let currentMoney = parseFloat(localStorage.getItem('money')) || 0;

      if (currentMoney >= itemTemplate.price) {
        currentMoney -= itemTemplate.price;
        localStorage.setItem('money', currentMoney);

        if (window.updateCurrentMoneyDisplay) {
          window.updateCurrentMoneyDisplay(currentMoney);
        }

        let newItem = { ...itemTemplate };
        let targetDiv = newItem.type === 'sorter' ? document.querySelector('#trid_div') : document.querySelector('#zavody_div');

        if (targetDiv) {
          let newElement = document.createElement('p');
          newElement.innerHTML = `${newItem.name} (Vytížení: <span class="item-usage">0</span>%)`;
          targetDiv.appendChild(newElement);
          newItem.elementRef = newElement;
        }

        purchasedItems.push(newItem);

        let serializableItems = purchasedItems.map(item => ({
          id: item.id,
          price: item.price,
          cost: item.cost,
          capacity: item.capacity,
          material: item.material,
          type: item.type,
          name: item.name
        }));
        localStorage.setItem('purchasedItems', JSON.stringify(serializableItems));

        alert('Nákup byl úspěšný!');
      } else {
        alert('Nemáš dost peněz!');
      }
    });
  }
});

function restorePurchasedItems() {
  const trid_div = document.querySelector('#trid_div');
  const zavody_div = document.querySelector('#zavody_div');
  if (trid_div) trid_div.innerHTML = '';
  if (zavody_div) zavody_div.innerHTML = '';

  purchasedItems = [];
  let savedItems = localStorage.getItem('purchasedItems');
  if (savedItems) {
    let parsed = JSON.parse(savedItems);
    parsed.forEach(item => {
      let targetDiv = item.type === 'sorter' ? trid_div : zavody_div;
      if (targetDiv) {
        let newElement = document.createElement('p');
        newElement.innerHTML = `${item.name} (Vytížení: <span class="item-usage">0</span>%)`;
        targetDiv.appendChild(newElement);
        item.elementRef = newElement;
      }
      purchasedItems.push(item);
    });
  }
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

    game_div.style.display = 'block';
    start_menu.style.display = 'none';
    let shop_div = document.querySelector('#shop_div');
    if (shop_div) shop_div.style.display = 'none';

    let init_money = 500000 * districtCount;
    let init_profit = 0;
    let init_day = 1;
    let init_score = 0;

    purchasedItems = [];
    localStorage.removeItem('purchasedItems');
    const trid_div = document.querySelector('#trid_div');
    const zavody_div = document.querySelector('#zavody_div');
    if (trid_div) trid_div.innerHTML = '';
    if (zavody_div) zavody_div.innerHTML = '';

    localStorage.setItem('money', init_money);
    localStorage.setItem('profit', init_profit);
    localStorage.setItem('day', init_day);
    localStorage.setItem('districtCount', districtCount);
    localStorage.setItem('score', init_score);

    game(init_money, init_profit, init_day, districtCount, init_score);
  }
});

btn_play_cont.addEventListener('click', () => {
  if (localStorage.getItem('money') === null) {
    alert('Neexistuje rozehraná hra!');
    return;
  }
  let init_money = localStorage.getItem('money');
  let init_profit = localStorage.getItem('profit');
  let init_day = localStorage.getItem('day');
  let districtCount = parseInt(localStorage.getItem('districtCount')) || 1;
  let init_score = localStorage.getItem('score');

  game_div.style.display = 'block';
  start_menu.style.display = 'none';
  let shop_div = document.querySelector('#shop_div');
  if (shop_div) shop_div.style.display = 'none';

  restorePurchasedItems();
  game(init_money, init_profit, init_day, districtCount, init_score);
});
