const loginScreen = document.getElementById("loginScreen");
const appShell = document.getElementById("appShell");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginStatus = document.getElementById("loginStatus");
const togglePassword = document.getElementById("togglePassword");
const profilePhotoInput = document.getElementById("profilePhotoInput");
const topAvatarImage = document.getElementById("topAvatarImage");
const profileAvatarImage = document.getElementById("profileAvatarImage");
const changePhotoButton = document.getElementById("changePhotoButton");
const profileNameText = document.getElementById("profileNameText");
const profileNameInput = document.getElementById("profileNameInput");
const saveNameButton = document.getElementById("saveNameButton");
const profileStatus = document.getElementById("profileStatus");
const topAvatarFallback = document.getElementById("topAvatarFallback");
const profileAvatarFallback = document.getElementById("profileAvatarFallback");
const avatarWrappers = [
  document.querySelector(".avatar-upload"),
  document.querySelector(".profile-upload")
];
const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll("[data-nav]");
const bottomNavButtons = document.querySelectorAll(".nav-item");
const calendarWeekdays = document.getElementById("calendarWeekdays");
const calendarGrid = document.getElementById("calendarGrid");
const calendarTitle = document.getElementById("calendarTitle");
const selectedDateLabel = document.getElementById("selectedDateLabel");
const savingsForm = document.getElementById("savingsForm");
const amountInput = document.getElementById("amountInput");
const timeInput = document.getElementById("timeInput");
const noteInput = document.getElementById("noteInput");
const saveStatus = document.getElementById("saveStatus");
const totalSavings = document.getElementById("totalSavings");
const monthSavings = document.getElementById("monthSavings");
const historyTotal = document.getElementById("historyTotal");
const profileTotal = document.getElementById("profileTotal");
const profileMonth = document.getElementById("profileMonth");
const historyMonth = document.getElementById("historyMonth");
const historyListTitle = document.getElementById("historyListTitle");
const historyList = document.getElementById("historyList");
const monthLabel = document.getElementById("monthLabel");
const progressFill = document.getElementById("progressFill");
const goalFill = document.getElementById("goalFill");
const progressValue = document.getElementById("progressValue");
const progressText = document.getElementById("progressText");
const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");
const fabButton = document.getElementById("fabButton");
const filterButton = document.getElementById("filterButton");
const clearTotalSavingsButton = document.getElementById("clearTotalSavings");

const state = {
  activeScreen: "home",
  currentMonth: 3,
  currentYear: 2026,
  selectedDate: new Date(2026, 3, 24),
  sortNewestFirst: true,
  baseTotal: 0,
  previousMonthSavings: 0,
  goalTarget: 100000000,
  profileName: "Aarav",
  entries: [
    { date: "2025-04-24", note: "Saved from pocket money", amount: 500, time: "09:30 AM" },
    { date: "2025-04-22", note: "Gift money saved", amount: 300, time: "07:15 PM" },
    { date: "2025-04-20", note: "Saved from allowance", amount: 200, time: "11:45 AM" },
    { date: "2025-04-18", note: "Extra money saved", amount: 800, time: "04:20 PM" },
    { date: "2025-04-15", note: "Part-time work", amount: 1000, time: "06:30 PM" },
    { date: "2025-04-10", note: "Saved from pocket money", amount: 400, time: "08:10 AM" },
    { date: "2025-04-05", note: "Gift money saved", amount: 750, time: "07:45 PM" },
    { date: "2025-04-01", note: "Month started", amount: 2300, time: "09:00 AM" }
  ]
};

weekdays.forEach((day) => {
  const item = document.createElement("span");
  item.textContent = day;
  calendarWeekdays.appendChild(item);
});

function formatCurrency(value) {
  return `\u20B9 ${value.toLocaleString("en-IN")}`;
}

function formatMonthYear(date) {
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

function formatFullDate(date) {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

function formatInputTime(value) {
  const [hoursText, minutes] = value.split(":");
  const hours = Number(hoursText);
  const suffix = hours >= 12 ? "PM" : "AM";
  const normalizedHours = hours % 12 || 12;
  return `${String(normalizedHours).padStart(2, "0")}:${minutes} ${suffix}`;
}

function getMonthEntries(year, month) {
  return state.entries.filter((entry) => {
    const date = new Date(`${entry.date}T00:00:00`);
    return date.getFullYear() === year && date.getMonth() === month;
  });
}

function setActiveScreen(screenName) {
  state.activeScreen = screenName;

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === screenName);
  });

  bottomNavButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.nav === screenName);
  });
}

function showApp() {
  loginScreen.classList.remove("active");
  appShell.classList.add("active");
}

function setProfilePhoto(src) {
  topAvatarImage.src = src;
  profileAvatarImage.src = src;
  avatarWrappers.forEach((wrapper) => wrapper.classList.add("has-photo"));
}

function updateProfileName() {
  const name = state.profileName.trim() || "Aarav";
  const initial = name.charAt(0).toUpperCase();

  profileNameText.textContent = name;
  profileNameInput.value = name;
  topAvatarFallback.textContent = initial;
  profileAvatarFallback.textContent = initial;
}

function updateSummary() {
  const currentMonthDate = new Date(state.currentYear, state.currentMonth, 1);
  const monthEntries = getMonthEntries(state.currentYear, state.currentMonth);
  const monthTotal = monthEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const total = state.baseTotal + state.entries.reduce((sum, entry) => sum + entry.amount, 0);
  const progress = state.previousMonthSavings === 0
    ? 100
    : Math.round((monthTotal / state.previousMonthSavings) * 100);
  const goalProgress = Math.min(Math.round((monthTotal / state.goalTarget) * 100), 100);

  totalSavings.textContent = formatCurrency(total);
  monthSavings.textContent = formatCurrency(monthTotal);
  historyTotal.textContent = formatCurrency(monthTotal);
  profileTotal.textContent = formatCurrency(total);
  profileMonth.textContent = formatCurrency(monthTotal);
  monthLabel.textContent = formatMonthYear(currentMonthDate);
  historyMonth.textContent = formatMonthYear(currentMonthDate);
  historyListTitle.textContent = formatMonthYear(currentMonthDate);
  progressFill.style.width = `${Math.min(progress, 100)}%`;
  progressValue.textContent = `${progress}%`;
  progressText.textContent = `Good job! You've saved ${progress}% more than last month.`;
  goalFill.style.width = `${goalProgress}%`;
}

function renderCalendar() {
  calendarGrid.innerHTML = "";

  const firstDay = new Date(state.currentYear, state.currentMonth, 1);
  const startDay = firstDay.getDay();
  const daysInMonth = new Date(state.currentYear, state.currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(state.currentYear, state.currentMonth, 0).getDate();
  const monthEntryDates = new Set(
    getMonthEntries(state.currentYear, state.currentMonth).map((entry) => Number(entry.date.slice(-2)))
  );

  calendarTitle.textContent = formatMonthYear(firstDay);

  for (let i = startDay - 1; i >= 0; i -= 1) {
    const day = document.createElement("button");
    day.type = "button";
    day.className = "calendar-day muted";
    day.textContent = String(daysInPrevMonth - i);
    calendarGrid.appendChild(day);
  }

  for (let date = 1; date <= daysInMonth; date += 1) {
    const day = document.createElement("button");
    day.type = "button";
    day.className = "calendar-day";
    day.textContent = String(date);

    const isSelected =
      state.selectedDate.getFullYear() === state.currentYear &&
      state.selectedDate.getMonth() === state.currentMonth &&
      state.selectedDate.getDate() === date;

    if (monthEntryDates.has(date)) {
      day.classList.add("has-entry");
    }

    if (isSelected) {
      day.classList.add("selected");
    }

    day.addEventListener("click", () => {
      state.selectedDate = new Date(state.currentYear, state.currentMonth, date);
      selectedDateLabel.textContent = formatFullDate(state.selectedDate);
      renderCalendar();
    });

    calendarGrid.appendChild(day);
  }

  const totalCells = startDay + daysInMonth;
  const nextPad = (7 - (totalCells % 7)) % 7;

  for (let date = 1; date <= nextPad; date += 1) {
    const day = document.createElement("button");
    day.type = "button";
    day.className = "calendar-day muted";
    day.textContent = String(date);
    calendarGrid.appendChild(day);
  }
}

function renderHistory() {
  const monthEntries = getMonthEntries(state.currentYear, state.currentMonth);
  const sorted = [...monthEntries].sort((a, b) => {
    const comparison = new Date(`${a.date}T00:00:00`) - new Date(`${b.date}T00:00:00`);
    return state.sortNewestFirst ? -comparison : comparison;
  });

  historyList.innerHTML = "";

  if (sorted.length === 0) {
    historyList.innerHTML = '<p class="history-empty">No savings history for this month yet.</p>';
    return;
  }

  sorted.forEach((entry) => {
    const date = new Date(`${entry.date}T00:00:00`);
    const card = document.createElement("article");
    card.className = "history-item";
    card.innerHTML = `
      <div class="date-badge">
        <strong>${String(date.getDate()).padStart(2, "0")}</strong>
        <span>${date.toLocaleDateString("en-GB", { month: "short" })}</span>
      </div>
      <div class="history-copy">
        <div class="history-topline">
          <p>${entry.note}</p>
          <button class="delete-entry" type="button" data-entry-id="${entry.date}|${entry.time}|${entry.amount}" aria-label="Delete history item">X</button>
        </div>
        <div class="history-meta">
          <span class="amount">${formatCurrency(entry.amount)}</span>
          <time>${entry.time}</time>
        </div>
      </div>
    `;
    historyList.appendChild(card);
  });
}

historyList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-entry");

  if (!deleteButton) {
    return;
  }

  const entryId = deleteButton.dataset.entryId;

  state.entries = state.entries.filter((entry) => `${entry.date}|${entry.time}|${entry.amount}` !== entryId);

  updateSummary();
  renderCalendar();
  renderHistory();
});

prevMonthButton.addEventListener("click", () => {
  state.currentMonth -= 1;

  if (state.currentMonth < 0) {
    state.currentMonth = 11;
    state.currentYear -= 1;
  }

  renderCalendar();
  updateSummary();
  renderHistory();
});

nextMonthButton.addEventListener("click", () => {
  state.currentMonth += 1;

  if (state.currentMonth > 11) {
    state.currentMonth = 0;
    state.currentYear += 1;
  }

  renderCalendar();
  updateSummary();
  renderHistory();
});

savingsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const amount = Number(amountInput.value);
  const savingTime = timeInput.value;
  const note = noteInput.value.trim() || "New savings added";

  if (!amount || amount < 1 || !savingTime) {
    saveStatus.textContent = "Please enter a valid amount.";
    saveStatus.style.color = "#c74444";
    return;
  }

  const selectedDate = new Date(state.selectedDate);
  const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

  state.entries.unshift({
    date: dateKey,
    note,
    amount,
    time: formatInputTime(savingTime)
  });

  state.currentMonth = selectedDate.getMonth();
  state.currentYear = selectedDate.getFullYear();

  updateSummary();
  renderCalendar();
  renderHistory();

  saveStatus.textContent = `${formatCurrency(amount)} added for ${formatFullDate(selectedDate)} at ${formatInputTime(savingTime)}.`;
  saveStatus.style.color = "#11824d";
  amountInput.value = "500";
  timeInput.value = "09:30";
  noteInput.value = "Saved from pocket money";
  setActiveScreen("history");
});

fabButton.addEventListener("click", () => {
  setActiveScreen("add");
  amountInput.focus();
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.nav;

    if (target === "history" || target === "home" || target === "profile" || target === "add") {
      setActiveScreen(target);
    }
  });
});

filterButton.addEventListener("click", () => {
  state.sortNewestFirst = !state.sortNewestFirst;
  renderHistory();
});

clearTotalSavingsButton.addEventListener("click", () => {
  state.baseTotal = 0;
  state.entries = [];
  saveStatus.textContent = "All savings data deleted.";
  saveStatus.style.color = "#11824d";
  updateSummary();
  renderCalendar();
  renderHistory();
  setActiveScreen("home");
});

changePhotoButton.addEventListener("click", () => {
  profilePhotoInput.click();
});

saveNameButton.addEventListener("click", () => {
  const nextName = profileNameInput.value.trim();

  if (!nextName) {
    profileStatus.textContent = "Please enter a valid name.";
    profileStatus.style.color = "#c74444";
    return;
  }

  state.profileName = nextName;
  updateProfileName();
  profileStatus.textContent = "Profile name updated.";
  profileStatus.style.color = "#11824d";
});

profilePhotoInput.addEventListener("change", () => {
  const [file] = profilePhotoInput.files;

  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    setProfilePhoto(reader.result);
  });
  reader.readAsDataURL(file);
});

togglePassword.addEventListener("click", () => {
  const reveal = loginPassword.type === "password";
  loginPassword.type = reveal ? "text" : "password";
  togglePassword.textContent = reveal ? "-" : "o";
  togglePassword.setAttribute("aria-label", reveal ? "Hide password" : "Show password");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  if (!email || !password) {
    loginStatus.textContent = "Please enter email and password.";
    loginStatus.style.color = "#c74444";
    return;
  }

  loginStatus.textContent = "Sign in successful.";
  loginStatus.style.color = "#11824d";
  showApp();
});

selectedDateLabel.textContent = formatFullDate(state.selectedDate);
renderCalendar();
updateSummary();
renderHistory();
updateProfileName();
setActiveScreen("home");
