const sheetLinks = {
  "2025-07-19": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=2059997641",
  "2025-07-20": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=719913119",
  "2025-07-21": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=391482263",
  "2025-07-22": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=771623278",
  "2025-07-23": "https://docs.google.com/spreadsheets/d/1tDO2QV1pWv-soEEnhA3Pugy7u7FvepTKRBqj_WzssSg/edit?gid=610499498"
};

function goToDate() {
  const selectedDate = document.getElementById("manualDate").value;
  const dateDisplay = document.getElementById("dateDisplay");
  const sheetLink = document.getElementById("sheetLink");

  if (!selectedDate) {
    alert("Please select a date.");
    return;
  }

  const displayDate = new Date(selectedDate).toLocaleDateString("en-US", {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  dateDisplay.innerText = displayDate;

  if (sheetLinks[selectedDate]) {
    sheetLink.innerHTML = `<a href="${sheetLinks[selectedDate]}" target="_blank">View Google Sheet</a>`;
  } else {
    sheetLink.innerHTML = `<span style="color:gray;">No sheet assigned for this date.</span>`;
  }
}
