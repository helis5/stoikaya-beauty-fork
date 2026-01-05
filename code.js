const BOOKINGS_STORAGE_KEY = "bookings";

const monthView = document.querySelector(".month-view");
const dayView = document.querySelector(".day-view");
const backBtn = document.querySelector(".back-btn");
const dayTitle = document.querySelector(".day-title");
const slotsEl = document.querySelector(".slots");

// Время работы
const start = 9 * 60;
const end = 18 * 60;

// Утилиты - чистые функции
function pad2(n) {
  return n < 10 ? "0" + String(n) : String(n);
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${pad2(month)}-${pad2(day)}`;
}

function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function getMonthCells(year, monthIndex) {
  const cells = [];
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay(); // день недели у 1 числа
  const offset = (firstDayOfWeek + 6) % 7; // кол-во дней до 1 числа
  const daysInMonth = getDaysInMonth(year, monthIndex);

  for (let i = 0; i < offset; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++)
    cells.push({ day, dateKey: toDateKey(new Date(year, monthIndex, day)) });

  return cells;
}

// Подготовка данных
const timeSlots = [];

for (let slot = start; slot < end; slot += 30) {
  const HH = pad2(Math.floor(slot / 60));
  const MM = pad2(slot % 60);
  const time = HH + ":" + MM;
  timeSlots.push(time);
}

// storage layer - локальное хранилище
function saveBookings() {
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
}

function loadBookings() {
  const data = localStorage.getItem(BOOKINGS_STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

// State - состояние приложения
let selectedDate = "";
let bookings = loadBookings(); // объект из localStorage

// Render-функции
function renderSlots() {
  slotsEl.textContent = "";
  timeSlots.forEach((time) => {
    const btn = document.createElement("button");
    btn.className = "slot";
    btn.textContent = time;
    btn.dataset.time = time;

    const isBusy = bookings[selectedDate] && bookings[selectedDate][time];
    isBusy ? btn.classList.add("slot--busy") : btn.classList.add("slot--free");

    slotsEl.appendChild(btn);
  });
}

// Обработчики событий
monthView.addEventListener("click", (event) => {
  const item = event.target.closest(".day"); // ищем ближайший элемент по классу
  if (!item) return;
  selectedDate = item.dataset.date;
  monthView.style.display = "none";
  dayView.style.display = "block";
  dayTitle.textContent = selectedDate;
  renderSlots();
});

backBtn.addEventListener("click", () => {
  monthView.style.display = "grid";
  dayView.style.display = "none";
});

slotsEl.addEventListener("click", (event) => {
  const item = event.target.closest(".slot"); // ищем ближайший элемент по классу
  if (!item) return;
  const time = item.dataset.time;
  if (!bookings[selectedDate]) bookings[selectedDate] = {};
  const dayBookings = bookings[selectedDate];
  dayBookings[time] ? delete dayBookings[time] : (dayBookings[time] = true);
  saveBookings();
  renderSlots();
});
