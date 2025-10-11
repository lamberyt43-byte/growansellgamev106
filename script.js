let money = parseInt(localStorage.getItem("money")) || 20;
let slots = parseInt(localStorage.getItem("slots")) || 3;
let watering = parseInt(localStorage.getItem("watering")) || 0;
let garden = JSON.parse(localStorage.getItem("garden")) || [];
let displayedMoney = money;
let bestMoney = parseInt(localStorage.getItem("bestMoney")) || 0;
let rouletteSpinsToday =
  parseInt(localStorage.getItem("rouletteSpinsToday")) || 0;
let lastRouletteDate = localStorage.getItem("lastRouletteDate") || "";
let currentPlotSkin = localStorage.getItem("currentPlotSkin") || "default";
let stats = { planted: 0, harvested: 0, earned: 0 };

function updateStatsUI() {
  document.getElementById("statsPlanted").textContent = stats.planted;
  document.getElementById("statsHarvested").textContent = stats.harvested;
  document.getElementById("statsEarned").textContent = stats.earned;
}

function setSkin(skin) {
  currentPlotSkin = skin;
  localStorage.setItem("currentPlotSkin", currentPlotSkin);
  updateUI();
}


const music = document.getElementById("backgroundMusic");

// Включить музыку
music.play();

// Поставить на паузу
music.pause();

const maxSlots = 500; // максимум слотов

const seeds = [
  { name: "Лук", emoji: "🧅", price: 2, growTime: 3000, rarity: "стартовое",  },
  { name: "Морковь", emoji: "🥕", price: 4, growTime: 6000, rarity: "обычное", favorite: false
 },
  {
    name: "Призрачная клубника",
    emoji: "🍓",
    price: 10,
    growTime: 10000,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Сахарное дерево",
    emoji: "🍬",
    price: 15,
    growTime: 12000,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Дерево Сатурна",
    emoji: "🪐",
    price: 20,
    growTime: 15000,
    rarity: "легендарное",
    favorite: false

  },
  {
    name: "Светофрукт",
    emoji: "💡",
    price: 12,
    growTime: 9000,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Медовая тыква",
    emoji: "🎃",
    price: 8,
    growTime: 7000,
    rarity: "обычное",
    favorite: false

  },
  {
    name: "Космическая малина",
    emoji: "🛸",
    price: 18,
    growTime: 14000,
    rarity: "легендарное",
    favorite: false

  },
  {
    name: "Огненная груша",
    emoji: "🔥",
    price: 9,
    growTime: 7500,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Ледяной банан",
    emoji: "❄️",
    price: 11,
    growTime: 8500,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Блестящая черника",
    emoji: "🔵",
    price: 10,
    growTime: 8000,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Радужное яблоко",
    emoji: "🌈",
    price: 15,
    growTime: 10000,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Туманная вишня",
    emoji: "🌫️",
    price: 13,
    growTime: 9500,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Кристаллический персик",
    emoji: "💎",
    price: 17,
    growTime: 13000,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Гравитационный арбуз",
    emoji: "🌌",
    price: 22,
    growTime: 16000,
    rarity: "легендарное",
    favorite: false

  },
  {
    name: "Звёздная дыня",
    emoji: "⭐",
    price: 16,
    growTime: 11000,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Кока-фрукт",
    emoji: "🥤",
    price: 12,
    growTime: 8700,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Фрукт ночи",
    emoji: "🌚",
    price: 14,
    growTime: 9000,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Токсичный лимон",
    emoji: "☣️",
    price: 8,
    growTime: 6000,
    rarity: "необычное",
    favorite: false

  },
  {
    name: "Банан-ракета",
    emoji: "🚀",
    price: 19,
    growTime: 14000,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Жвачное дерево",
    emoji: "🫧",
    price: 20,
    growTime: 15000,
    rarity: "легендарное",
    favorite: false

  },
  {
    name: "Молниевый апельсин",
    emoji: "⚡",
    price: 15,
    growTime: 10000,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Лазерная слива",
    emoji: "🔴",
    price: 13,
    growTime: 9700,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Танцующий ананас",
    emoji: "💃🍍",
    price: 11,
    growTime: 9200,
    rarity: "необычное",
    favorite: false

  },
  {
    name: "Магическая мята",
    emoji: "🧙🌿",
    price: 14,
    growTime: 10000,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Карамельная морковка",
    emoji: "🥕🍬",
    price: 12,
    growTime: 9000,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Сахарная свекла",
    emoji: "🍭🍠",
    price: 10,
    growTime: 8000,
    rarity: "обычное",
    favorite: false

  },
  {
    name: "Желейный арбуз",
    emoji: "🍉🧡",
    price: 15,
    growTime: 10000,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Пузыристая вишня",
    emoji: "🍒🫧",
    price: 17,
    growTime: 10500,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Паприка-пушка",
    emoji: "🌶️💥",
    price: 19,
    growTime: 11000,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Молниеносный лимон",
    emoji: "🍋⚡",
    price: 21,
    growTime: 11500,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Клубника с неба",
    emoji: "🍓☁️",
    price: 23,
    growTime: 12000,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Пылающая тыква",
    emoji: "🎃🔥",
    price: 26,
    growTime: 12500,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Ягода-сфера",
    emoji: "🫐⚙️",
    price: 28,
    growTime: 13000,
    rarity: "редкое",
    favorite: false

  },
  {
    name: "Звёздный помидор",
    emoji: "🍅🌠",
    price: 30,
    growTime: 13500,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Лунная клубника",
    emoji: "🍓🌙",
    price: 33,
    growTime: 14000,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Золотой банан",
    emoji: "🍌✨",
    price: 35,
    growTime: 14500,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Радужная редька",
    emoji: "🌀🥗",
    price: 38,
    growTime: 15000,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Вулканическая груша",
    emoji: "🍐🌋",
    price: 40,
    growTime: 15500,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Хрустальная дыня",
    emoji: "🍈💎",
    price: 43,
    growTime: 16000,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Астральный инжир",
    emoji: "🌌🍇",
    price: 46,
    growTime: 16500,
    rarity: "легендарное",
    favorite: false

  },
  {
    name: "Неоновый апельсин",
    emoji: "🍊💡",
    price: 50,
    growTime: 17000,
    rarity: "легендарное",
    favorite: false

  },
  {
    name: "Светофрукт",
    emoji: "💡🍏",
    price: 52,
    growTime: 17500,
    rarity: "легендарное",
  },
  {
    name: "Солнечный кокос",
    emoji: "🥥☀️",
    price: 55,
    growTime: 18000,
    rarity: "легендарное",
    favorite: false

  },
  {
    name: "Кометное манго",
    emoji: "🥭☄️",
    price: 58,
    growTime: 18500,
    rarity: "легендарное",
    favorite: false

  },
  {
    name: "Пиксельное яблоко",
    emoji: "🍎🟩",
    price: 60,
    growTime: 19000,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Гравитационная капуста",
    emoji: "🥬🌌",
    price: 65,
    growTime: 19500,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Ядро персика",
    emoji: "🍑🔘",
    price: 68,
    growTime: 20000,
    rarity: "эпическое",
    favorite: false

  },
  {
    name: "Грозовой мандарин",
    emoji: "🍊🌩️",
    price: 70,
    growTime: 20500,
    rarity: "легендарное",
    favorite: false

  },
  {
    name: "Тайная клубника",
    emoji: "🍓🕵️",
    price: 75,
    growTime: 21000,
    rarity: "легендарное",
    favorite: false

  },
  {
    name: "Космическая дыня",
    emoji: "🍈🪐",
    price: 97,
    growTime: 22000,
    rarity: "мифическое",
    favorite: false

  },
  {
    name: "Магнитная морковка",
    emoji: "🥕🧲",
    price: 550,
    growTime: 23000,
    rarity: "мифическое",
    favorite: false

  },
  {
    name: "Плод портала",
    emoji: "🌀🍒",
    price: 850,
    growTime: 24000,
    rarity: "мифическое",
    favorite: false

  },
  {
    name: "Растение вечности",
    emoji: "♾️🌿",
    price: 999,
    growTime: 25000,
    rarity: "призматическое",
    favorite: false

  },
  {
    name: "Призрачное дерево",
    emoji: "🌳👻",
    price: 78,
    growTime: 30000,
    rarity: "легендарное",
    favorite: false

  },
  {
    name: "Горящая голубика",
    emoji: "🔥🫐",
    price: 1500,
    growTime: 50000,
    rarity: "призматическое",
    favorite: false

  },
  {
    name: "Слепая маракуйя",
    emoji: "🥭👓",
    price: 2222,
    growTime: 70000,
    rarity: "призматическое",
    favorite: false

  },
  {
    name: "Костяной абрикос ",
    emoji: "🫐🦴",
    price: 5000,
    growTime: 1000000,
    rarity: "призматическое",
    favorite: false

  },
  {
    name: "Неоновый банан",
    emoji: "🌌🍌",
    price: 1000000,
    growTime: 10000000,
    rarity: "призматичекое",
    favorite: false

  },
    {
    name: "Астральный лотос",
    emoji: "🌠🪷",
    price:  100000000,
    growTime: 10000000,
    rarity: "призматическое",
    favorite: false

  },
  { 
  name: "Космическое семя", 
  emoji: "🌌", 
  price: 230000000, 
  growTime: 60000000,  // 60 секунд
  rarity: "призматическое" 
},
{ 
  name: "Медовый кактус", 
  emoji: "🍯🌵", 
  price: 900000000, 
  growTime: 80000000,  // 60 секунд
  rarity: "призматическое" 
},
  {
    name: "Сверхнова",
    emoji: "🎇🌌",
    price: 1000000000,
    growTime: 1000000000,
    rarity: "призматичекое",
    favorite: false

  },
];

const rarityOrder = {
  обычное: 1,
  редкое: 2,
  эпическое: 3,
  легендарное: 4,
  мифическое: 5,
};

// Список кодов
const redeemCodes = {
    // код -> награда
};

let usedCodes = []; // Сохраняем активированные коды

function redeemCode() {
  const input = document.getElementById("redeemInput").value.trim().toUpperCase();
  const message = document.getElementById("redeemMessage");

  if (!input) {
    message.textContent = "❌ Введите код!";
    return;
  }

  if (usedCodes.includes(input)) {
    message.textContent = "⚠️ Этот код уже активирован!";
    return;
  }

  if (redeemCodes[input]) {
    money += redeemCodes[input];
    usedCodes.push(input);
    message.textContent = `✅ Код активирован! Вы получили ${redeemCodes[input]} 💰`;
    updateMoney();
  } else {
    message.textContent = "❌ Неверный код!";
  }
}



seeds.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);

function save() {
  localStorage.setItem("money", money);
  localStorage.setItem("slots", slots);
  localStorage.setItem("watering", watering);
  localStorage.setItem("garden", JSON.stringify(garden));
  if (money > bestMoney) {
    bestMoney = money;
    localStorage.setItem("bestMoney", bestMoney);
  }
}

function updateUI() {
  document.getElementById("money").textContent = money;
  renderGarden();
}

function renderGarden() {
  const gardenDiv = document.getElementById("garden");
  gardenDiv.innerHTML = "";

  for (let i = 0; i < slots; i++) {
    const plot = document.createElement("div");
plot.className = "plot";
if (currentPlotSkin === "night") {
  plot.classList.add("night-skin");
}



    const plant = garden[i];
    if (plant) {
      plot.textContent = plant.emoji;
      if (!plant.ready) {
        plot.classList.add("growing");
      }
    // Если включен режим лопатки — любое растение просто удаляется
if (shovelMode) {
  plot.onclick = () => removePlant(i);
  plot.innerHTML += `<div class="tooltip">Удалить (${plant.name})</div>`;
} else {
  // Если растение готово — можно собрать и получить деньги
  if (plant.ready) {
    plot.innerHTML += `<div class="tooltip">Готово! (${plant.name})</div>`;
    plot.onclick = () => {
      money += Math.floor(plant.price * 1.5);
      garden[i] = null;
      updateUI();
      save();
    };
  } else {
    // Если не готово — просто показать процент роста
    const percent = Math.floor(((Date.now() - plant.start) / plant.time) * 100);
    plot.innerHTML += `<div class="tooltip">${plant.rarity} • ${percent}%</div>`;
  }
}

    } else {
      plot.onclick = () => plantSeed(i);
    }

    gardenDiv.appendChild(plot);
  }
}

function renderSeeds() {
  const rarityOrder = {
    обычное: 1,
    редкое: 2,
    эпическое: 3,
    легендарное: 4,
    мифическое: 5,
  };

  seeds.sort((a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]);

  const seedButtons = document.getElementById("seedButtons");
  seedButtons.innerHTML = "";
  seeds.forEach((seed, index) => {
    const btn = document.createElement("button");
    btn.textContent = `${seed.emoji} ${seed.name} (${seed.price}💰)`;
    btn.onclick = () => {
      selectedSeed = index;
      toggleShop();
    };
    seedButtons.appendChild(btn);
  });
}

let selectedSeed = null;

function plantSeed(i) {
  if (selectedSeed === null) return;
  const seed = seeds[selectedSeed];
  if (money < seed.price) return;

  money -= seed.price;
  const time = seed.growTime - watering * 1000;
  garden[i] = {
    ...seed,
    start: Date.now(),
    time: time,
    ready: false,
  };

  growPlant(i);
  updateUI();
  save();
  updateQuestProgress(0, 1); // Посадка растения
}

function growPlant(i) {
  const interval = setInterval(() => {
    const plant = garden[i];
    if (!plant) return clearInterval(interval);
    if (Date.now() - plant.start >= plant.time) {
    const timePassed = Date.now() - plant.start;
const growTime = boosts.speed ? plant.time * 0.5 : plant.time; // ⚡ Ускоритель роста
if (timePassed >= growTime) {
// 🎨 Улучшенные мутации
let roll = Math.random();
if (roll < 0.05) { // 5% шанс на мутацию
  let type;
  if (roll < 0.03) { // 3% обычные редкие
    type = ["silver", "gold"][Math.floor(Math.random() * 2)];
  } else if (roll < 0.049) { // 1.9% шанс на радужное
    type = "rainbow";
  } else { // 0.1% супер-редкое
    type = "cosmic";
  }

  if (type === "silver") {
    plant.price *= 2;
    plant.emoji = "🥈" + plant.emoji;
    plant.mutation = "Серебряное 🌟 (×2 деньги)";
  }
  if (type === "gold") {
    plant.price *= 5;
    plant.emoji = "🥇" + plant.emoji;
    plant.mutation = "Золотое 💰 (×5 деньги)";
  }
  if (type === "rainbow") {
    plant.price *= 10;
    plant.emoji = "🌈" + plant.emoji;
    plant.mutation = "Радужное 🌈 (×10 деньги + +50% скорость роста)";
    plant.growTime = Math.floor(plant.growTime * 0.5); // быстрее растёт
  }
  if (type === "cosmic") {
    plant.price *= 50;
    plant.emoji = "✨" + plant.emoji;
    plant.mutation = "Космическое 🚀 (×50 деньги + моментальный рост)";
    plant.ready = true; // сразу готово
  }
}

  plant.ready = true;
  updateUI();
  save();
  clearInterval(interval);
}

    }
  }, 1000);
}

function buySlot() {
  if (slots >= maxSlots) {
    alert("Максимум грядок достигнут! 🌾");
    return;
  }

  if (money >= 15) {
    money -= 15;
    slots += 1;
    garden.push(null);
    updateUI();
    save();
  } else {
    alert("Недостаточно шакилей!");
  }
}

function buyWatering() {
  if (money >= 10) {
    money -= 10;
    watering += 1;
    updateUI();
    save();
  }
}

function loadGrowth() {
  garden.forEach((plant, i) => {
    if (plant && !plant.ready) {
      growPlant(i);
    }
  });
}

let hallowCoins = parseInt(localStorage.getItem("hallowCoins")) || 0;
let guests = ["🕷️ Паук", "💀 Скелет", "🧙‍♂️ Маг", "🧛‍♂️ Вампир", "👻 Призрак", "🤡 Клоун"];

function saveHalloween() {
  localStorage.setItem("hallowCoins", hallowCoins);
  document.getElementById("hallowCoins").textContent = hallowCoins;
}

function toggleHalloweenShop() {
  document.getElementById("halloweenShop").classList.toggle("hidden");
}

function randomGuest() {
  let guest = guests[Math.floor(Math.random() * guests.length)];
  let amount = 0;
  if (guest === "🤡 Клоун") amount = 1000;
  else if (guest === "🕷️ Паук") amount = 100;
  else amount = Math.floor(Math.random() * 150) + 50;

  hallowCoins += amount;
  saveHalloween();

  const msg = document.createElement("div");
  msg.style.position = "fixed";
  msg.style.bottom = "20px";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.background = "rgba(0,0,0,0.8)";
  msg.style.color = "#ffcc00";
  msg.style.padding = "12px 20px";
  msg.style.borderRadius = "10px";
  msg.style.zIndex = 9999;
  msg.textContent = `🕯️ Сладость или гадость! ${guest} принёс ${amount} 👻`;
  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 4000);
}

setInterval(randomGuest, 50000);

saveHalloween();

let shovelMode = false;

function toggleShovelMode() {
  shovelMode = !shovelMode;
  const shovelButton = document.getElementById("shovelButton");
  const vignette = document.getElementById("vignette");

  shovelButton.classList.toggle("active", shovelMode);
  vignette.classList.toggle("active", shovelMode);

  // Меняем содержимое кнопки
  shovelButton.textContent = shovelMode ? "❌" : "🪓";

  // Эффект включения
  if (shovelMode) {
   
  }
}

function removePlant(index) {
  if (!garden[index]) return;
  if (confirm("Удалить растение без получения денег?")) {
    garden[index] = null;
    updateUI();
    save();
  }
}


function animateMoney() {
  const display = document.getElementById("money");
  if (!display) return;

  if (displayedMoney !== money) {
    displayedMoney += (money - displayedMoney) * 0.1;
    if (Math.abs(money - displayedMoney) < 0.5) {
      displayedMoney = money;
    }
    display.textContent = Math.floor(displayedMoney);
  }

  requestAnimationFrame(animateMoney);
}

function harvestAll() {
  let harvested = false;
  for (let i = 0; i < garden.length; i++) {
    const plant = garden[i];
    if (plant && plant.ready) {
     money += Math.floor(plant.price * 1.5 * getRebirthBonus());

      garden[i] = null;
      harvested = true;
    }
  }
  if (harvested) {
    updateUI();
    save();
  } else {
    alert("Нет готовых растений! 🌱");
  }
  updateQuestProgress(1, 1); // Сбор урожая
  let earned = Math.floor(plant.price * 1.5); // сколько заработал за растение
  money += earned; // добавляем к деньгам
  updateQuestProgress(4, earned); // прогресс квеста по заработанным деньгам
}

function toggleShop() {
  const shop = document.getElementById("plantShop");
  shop.classList.toggle("hidden");
}

function showRecords() {
  document.getElementById("game").style.display = "none";
  document.getElementById("recordsScreen").style.display = "block";
  document.getElementById("bestMoneyDisplay").textContent = bestMoney;
}

function hideRecords() {
  document.getElementById("recordsScreen").style.display = "none";
  document.getElementById("game").style.display = "block";
}

function startRecordUpdateTimer(seconds) {
  const timerDisplay = document.getElementById("updateTime");

  function update() {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    timerDisplay.textContent = `${min}:${sec}`;

    if (seconds <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "Обновление...";
      // можешь тут вызвать обновление или скрыть
    }

    seconds--;
  }

  update();

  const timerInterval = setInterval(update, 1000);
}

function spinRoulette() {
  const today = new Date().toDateString();

  // Сброс если новый день
  if (lastRouletteDate !== today) {
    rouletteSpinsToday = 0;
    lastRouletteDate = today;
    localStorage.setItem("lastRouletteDate", today);
    localStorage.setItem("rouletteSpinsToday", rouletteSpinsToday);
  }

  // Проверка лимита
  if (rouletteSpinsToday >= 3) {
    alert("❌ Сегодня лимит прокруток исчерпан (3/3). Попробуй завтра!");
    return;
  }

  if (money < 5_000) {
    alert("Недостаточно Шакилей!");
    return;
  }

  money -= 5_000;
  save();
  updateUI();

  const text = document.getElementById("rouletteText");
  text.textContent = "🎲 Рулетка крутится...";
  text.classList.add("shake");

  const rewards = [
    { amount: 10_000, chance: 55 },
    { amount: 50_000, chance: 50 },
    { amount: 1_000_000, chance: 35 },
    { amount: 10_000_000, chance: 20 },
    { amount: 50_000_000, chance: 10 },
    { amount: 100_000_000, chance: 7 },
    { amount: 500_000_000, chance: 5 },
    { amount: 1_000_000_000, chance: 1 },
  ];

  setTimeout(() => {
    text.classList.remove("shake");

    let roll = Math.random() * 100;
    let sum = 0;
    let reward = 0;
    for (let r of rewards) {
      sum += r.chance;
      if (roll <= sum) {
        reward = r.amount;
        break;
      }
    }

    text.textContent = `🎉 Ты выиграл ${reward.toLocaleString()} Шакилей!`;
    money += reward;
    save();
    updateUI();

    // Увеличиваем счетчик
    rouletteSpinsToday++;
    localStorage.setItem("rouletteSpinsToday", rouletteSpinsToday);
  }, 2000);
}

let boosts = {
  speed: false,
  money: false,
  extraSpin: 0,
};

function buyBoost(type, duration, cost) {
  if (money >= cost) {
    money -= cost;
    activateBoost(type, duration);
    save();
    updateUI();
  } else {
    alert("Недостаточно Шакилей!");
  }
}

function activateBoost(type, duration) {
  if (type === "speed") {
    boosts.speed = true;
    setTimeout(() => (boosts.speed = false), duration);
    alert("⚡ Ускоритель роста активирован на 10 минут!");
  }
  if (type === "extraSpin") {
    boosts.extraSpin += 1;
    alert("🎲 Вы получили +1 прокрутку рулетки!");
  }
}


let rebirths = parseInt(localStorage.getItem("rebirths")) || 0;

function tryRebirth() {
  if (money >= 999_000_000_000) {
    if (confirm("⚡ Перерождение! Всё сбросится, но заработки увеличатся.")) {
      rebirths++;
      localStorage.setItem("rebirths", rebirths);
      money = 20;
      slots = 3;
      garden = [];
      watering = 0;
      save();
      updateUI();
      alert("✨ Ты сделал перерождение! Всего: " + rebirths);
    }
  } else {
    alert("❌ Нужно 999 миллиардов для перерождения!");
  }
}

// бонус дохода при сборе
function getRebirthBonus(multiplier = 1) {
  return 1 + rebirths * 0.1;
}









const bgMusic = document.getElementById("bg-music");

document.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
  }
});

const startScreen = document.getElementById("start-screen");
const gameContainer = document.getElementById("game-container");

startScreen.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameContainer.style.filter = "blur(0)";
});


function openTab(tabName) {
  let tabs = document.getElementsByClassName("tab");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  document.getElementById(tabName + "Tab").style.display = "block";
}


function closeSkinsTab() {
  // скрываем вкладку скинов
  document.getElementById("skinsTab").style.display = "none";
  // возвращаем, например, магазин
  openTab("shop");
}


function openLuckyPack() {
  if (hallowCoins < 1000) return alert("Недостаточно 👻!");
  hallowCoins -= 1000;
  saveHalloween();

  const screen = document.createElement("div");
  screen.style.position = "fixed";
  screen.style.inset = "0";
  screen.style.background = "rgba(0,0,0,0.9)";
  screen.style.display = "flex";
  screen.style.justifyContent = "center";
  screen.style.alignItems = "center";
  screen.style.flexDirection = "column";
  screen.style.color = "white";
  screen.style.fontSize = "24px";
  screen.style.zIndex = "10000";
  screen.textContent = "🎁 Открывается Lucky Pack...";
  document.body.appendChild(screen);

  let reward = Math.floor(Math.random() * 20_000_000) + 5_000;
  if (Math.random() < 0.001) reward = 999_000_000_000;

  setTimeout(() => {
    money += reward;
    save();
    updateUI();
    screen.textContent = `🎉 Ты получил ${reward.toLocaleString()} 💰`;
    setTimeout(() => screen.remove(), 3000);
  }, 2000);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "M") { // если нажать M
    money += 1000000000;
    saveGame();
    alert("💸 +1 миллиард шакелей добавлено!");
  }
});


animateMoney();
renderSeeds();
updateUI();
loadGrowth();
function loadAdminMessage() {
  fetch("adminMessage.json")
    .then(response => response.json())
    .then(data => {
      if (data.message && data.message.trim() !== "") {
        const msgBox = document.createElement("div");
        msgBox.style.position = "fixed";
        msgBox.style.top = "10px";
        msgBox.style.left = "50%";
        msgBox.style.transform = "translateX(-50%)";
        msgBox.style.background = "rgba(255, 215, 0, 0.9)";
        msgBox.style.color = "#000";
        msgBox.style.padding = "10px 20px";
        msgBox.style.borderRadius = "10px";
        msgBox.style.fontWeight = "bold";
        msgBox.style.zIndex = "9999";
        msgBox.style.boxShadow = "0px 2px 10px rgba(0,0,0,0.3)";
        msgBox.style.animation = "slideDown 0.5s ease-out";
        msgBox.innerText = data.message;
        document.body.appendChild(msgBox);

        // Автоматическое удаление через 5 секунд
        setTimeout(() => {
          msgBox.remove();
        }, 5000);
      }
    })
    .catch(err => console.error("Ошибка загрузки админ-сообщения", err));
}

// Анимация
const style = document.createElement("style");
style.innerHTML = `
@keyframes slideDown {
  from { transform: translate(-50%, -50px); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
}`;
document.head.appendChild(style);

loadAdminMessage();