const calendarBody = document.getElementById("calendarBody");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

// Start with July 2025
let currentDate = new Date(2025, 6, 1);
let selectedDate = null;

// Map dates (YYYY-MM-DD) to Google Sheet URLs
const sheetLinks = {
  "2025-07-19": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=2059997641#gid=2059997641",
  "2025-07-20": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=719913119#gid=719913119",
  "2025-07-21": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=391482263#gid=391482263",
  "2025-07-22": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=771623278#gid=771623278",
  "2025-07-23": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=610499498#gid=610499498",
  "2025-07-24": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=1844047310#gid=1844047310",
  "2025-07-25": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=98884320#gid=98884320",
  "2025-07-26": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=621027058#gid=621027058",
  "2025-07-27": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=1216031467#gid=1216031467",
  "2025-07-28": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=1001532306#gid=1001532306",
  "2025-07-29": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=1369161843#gid=1369161843",
  "2025-07-30": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=73124884#gid=73124884",
  "2025-07-31": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=841944757#gid=841944757",
  "2025-08-01": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1488058849#gid=1488058849",
  "2025-08-02": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=915217402#gid=915217402",
  "2025-08-03": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1758522648#gid=1758522648",
  "2025-08-04": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1433095317#gid=1433095317",
  "2025-08-05": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1680982641#gid=1680982641",
  "2025-08-06": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=620935005#gid=620935005",
  "2025-08-07": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1790157521#gid=1790157521",
  "2025-08-08": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=310273373#gid=310273373",
  "2025-08-09": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1438061282#gid=1438061282",
  "2025-08-10": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=209632849#gid=209632849",
  "2025-08-11": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1832234574#gid=1832234574",
  "2025-08-12": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1991430900#gid=1991430900",
  "2025-08-13": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=634705026#gid=634705026",
  "2025-08-14": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1991862215#gid=1991862215",
  "2025-08-15": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=88386740#gid=88386740",
  "2025-08-16": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=580243184#gid=580243184",
  "2025-08-17": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1553731438#gid=1553731438",
  "2025-08-18": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1356186126#gid=1356186126",
  "2025-08-19": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=2059997641#gid=2059997641",
  "2025-08-20": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=719913119#gid=719913119",
  "2025-08-21": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=391482263#gid=391482263",
  "2025-08-22": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=771623278#gid=771623278",
  "2025-08-23": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=610499498#gid=610499498",
  "2025-08-24": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1844047310#gid=1844047310",
  "2025-08-25": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=98884320#gid=98884320",
  "2025-08-26": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=621027058#gid=621027058",
  "2025-08-27": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1216031467#gid=1216031467",
  "2025-08-28": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1001532306#gid=1001532306",
  "2025-08-29": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=1369161843#gid=1369161843",
  "2025-08-30": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=73124884#gid=73124884",
  "2025-08-31": "https://docs.google.com/spreadsheets/d/1Cz-ZnpJDlII2j39DkoanZhswZ1SRE8wo0PyC9GyJjwI/edit?gid=841944757#gid=841944757"
}
function formatDateKey(date) {
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  monthYear.innerText = `${date.toLocaleString("default", { month: "long" })} ${year}`;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarBody.innerHTML = "";

  // Empty cells before month start
  for (let i = 0; i < firstDayIndex; i++) {
    calendarBody.appendChild(document.createElement("div"));
  }

  const todayStr = formatDateKey(new Date());

  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("div");
    cell.innerText = day;

    const thisDate = new Date(year, month, day);
    const thisDateKey = formatDateKey(thisDate);

    if (thisDateKey === todayStr) {
      cell.classList.add("today");
    }

    if (selectedDate && thisDateKey === formatDateKey(selectedDate)) {
      cell.classList.add("selected");
    }

    if (sheetLinks[thisDateKey]) {
      cell.style.fontWeight = "bold";
      cell.style.color = "#007bff";
      cell.title = "Open Google Sheet";

      cell.onclick = () => {
        window.open(sheetLinks[thisDateKey], "_blank");
        selectedDate = thisDate;
        renderCalendar(currentDate);
      };
    } else {
      cell.onclick = () => {
        selectedDate = thisDate;
        renderCalendar(currentDate);
        alert(`Selected Date: ${thisDate.toDateString()}\n(No Google Sheet linked yet)`);
      };
    }

    calendarBody.appendChild(cell);
  }
}

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);

document.addEventListener('DOMContentLoaded', () => {
  const datePicker = document.getElementById('datePicker');

  if (datePicker) {
    // Set initial date as today
    const today = new Date();
    datePicker.value = today.toISOString().split('T')[0];

    datePicker.addEventListener('change', () => {
      const selectedDate = new Date(datePicker.value);
      if (isNaN(selectedDate)) return;

      // You can now call your logic to update the calendar:
      showDate(selectedDate);
    });
  }
});

// Replace your current render method to accept a custom date
function showDate(date) {
  currentDate = date;
  renderCalendar(currentDate);
}
