const monthView = document.querySelector(".month-view");
const dayView = document.querySelector(".day-view");
const backBtn = document.querySelector(".back-btn");
const dayTitle = document.querySelector(".day-title");
const slotsEl = document.querySelector(".slots");
let selectedDate = "";

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

// Формируем слоты
const start = 9 * 60;
const end = 18 * 60;
const timeSlots = [];

function pad2(n) {
  return n < 10 ? "0" + String(n) : String(n);
}

for (let slot = start; slot < end; slot += 30) {
  const HH = pad2(Math.floor(slot / 60));
  const MM = pad2(slot % 60);
  const time = HH + ":" + MM;
  timeSlots.push(time);
}

// Рендерим слоты
function renderSlots() {
  slotsEl.textContent = "";
  timeSlots.forEach((time) => {
    const btn = document.createElement("button");
    btn.className = "slot";
    btn.textContent = time;
    btn.dataset.time = time;
    slotsEl.appendChild(btn);
  });
}
