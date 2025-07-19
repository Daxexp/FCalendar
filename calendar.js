const calendarEl = document.getElementById("calendar");
const monthYearEl = document.getElementById("monthYear");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const manualDateInput = document.getElementById("manualDate");
const goToDateBtn = document.getElementById("goToDate");

let currentDate = new Date();

const sheetLinks = {
  "2025-07-19": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=2059997641",
  "2025-07-20": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=719913119",
  "2025-07-21": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=391482263",
  "2025-07-22": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=771623278",
  "2025-07-23": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=610499498",
};

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay(); // Sunday = 0
  const today = new Date();

  calendarEl.innerHTML = "";
  monthYearEl.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;

  // Fill blanks before first day
  for (let i = 0; i < startDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "empty";
    calendarEl.appendChild(emptyCell);
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const cell = document.createElement("div");
    const cellDate = new Date(year, month, i);

    const key = cellDate.toISOString().split('T')[0];

    if (cellDate.toDateString() === today.toDateString()) {
      cell.classList.add("today");
    }

    cell.textContent = i;

    if (sheetLinks[key]) {
      cell.onclick = () => window.open(sheetLinks[key], '_blank');
      cell.title = "Open Finance Sheet";
    }

    calendarEl.appendChild(cell);
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

goToDateBtn.addEventListener("click", () => {
  const input = manualDateInput.value.trim();
  // Validate YYYY-MM-DD with regex
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(input)) {
    alert("Please enter a valid date in YYYY-MM-DD format.");
    return;
  }
  const newDate = new Date(input);
  if (isNaN(newDate.getTime())) {
    alert("Invalid date. Please enter a correct date.");
    return;
  }
  currentDate = newDate;
  renderCalendar(currentDate);
  manualDateInput.value = "";
});

renderCalendar(currentDate);
