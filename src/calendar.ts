let nav = 0;
let clicked: string | null = null;
let jsonEvents: string | null = localStorage.getItem
  ? localStorage.getItem("events")
  : null;

let events: any[] = jsonEvents ? JSON.parse(jsonEvents) : [];

const calendar = document.getElementById("calendar");
const newEventModal = document.getElementById("newEventModal");
const deleteEventModal = document.getElementById(
  "deleteEventModal"
) as HTMLDivElement;
const backDrop = document.getElementById("modalBackDrop");
const eventTitleInput = document.getElementById(
  "eventTitleInput"
) as HTMLInputElement;
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function openModal(date: string) {
  clicked = date;

  const eventForDay = events.find((e: any) => e.date === clicked);

  if (eventForDay) {
    const eventText = document.getElementById(
      "eventText"
    ) as HTMLParagraphElement;
    eventText.innerText = eventForDay.title;
    deleteEventModal.style.display = "block";
  } else {
    newEventModal ? (newEventModal.style.display = "block") : null;
  }

  backDrop ? (backDrop.style.display = "block") : null;
}

function load() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const fisrtDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateToString = fisrtDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const paddingDays = weekdays.indexOf(dateToString.split(", ")[0]);
  const dateDisplay = document.getElementById("monthDisplay");

  if (dateDisplay)
    dateDisplay.innerText = `${dt.toLocaleDateString("en-us", {
      month: "long",
    })} ${year}`;

  calendar ? (calendar.innerHTML = "") : null;

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    if (i > paddingDays) {
      const dayString = `${i - paddingDays}/${month + 1}/${year}`;
      const eventForDay = events.find((e: any) => e.date === dayString);
      daySquare.innerText = (i - paddingDays).toString();

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = "currentDay";
      }

      daySquare.addEventListener("click", () => openModal(dayString));

      if (eventForDay !== undefined) {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }
    } else {
      daySquare.classList.add("padding");
    }

    calendar ? calendar.appendChild(daySquare) : null;
  }
}

function closeModal(): void {
  eventTitleInput.classList.remove("error");
  newEventModal ? (newEventModal.style.display = "none") : null;
  deleteEventModal.style.display = "none";
  backDrop ? (backDrop.style.display = "none") : null;
  eventTitleInput.value = "";
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove("error");

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem("events", JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add("error");
  }
}

function deleteEvent() {
  events = events.filter((e) => e.date !== clicked);
  localStorage.setItem("events", JSON.stringify(events));
  closeModal();
}

function initButtons() {
  const nextButton = document.getElementById("nextBtn") as HTMLButtonElement;
  const backButton = document.getElementById("backBtn") as HTMLButtonElement;

  const saveButton = document.getElementById("saveBtn") as HTMLButtonElement;
  const cancelButton = document.getElementById(
    "cancelBtn"
  ) as HTMLButtonElement;

  const deleteButton = document.getElementById(
    "deleteBtn"
  ) as HTMLButtonElement;
  const closeButton = document.getElementById("closeBtn") as HTMLButtonElement;

  nextButton.addEventListener("click", () => {
    nav++;
    load();
  });
  backButton.addEventListener("click", () => {
    nav--;
    load();
  });

  saveButton.addEventListener("click", saveEvent);
  cancelButton.addEventListener("click", closeModal);

  deleteButton.addEventListener("click", deleteEvent);
  closeButton.addEventListener("click", closeModal);
}

initButtons();
load();
