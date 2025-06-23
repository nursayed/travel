// script.js
document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const monthYearDisplay = document
    .getElementById("month-year-display")
    .querySelector("span");
  const calendarDaysContainer = document.getElementById("calendar-days");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const selectedDateText = document.getElementById("selected-date-text");

  // --- State ---
  let currentDate = new Date(2025, 10, 1); // November 2025 (month is 0-indexed)
  let selectedDate = new Date(2025, 10, 30);

  // --- Data (from the image) ---
  // In a real application, this would come from an API
  const prices = {
    "2025-11-01": 2019,
    "2025-11-02": 1999,
    "2025-11-03": 1759,
    "2025-11-04": 1749,
    "2025-11-05": 1749,
    "2025-11-06": 1729,
    "2025-11-07": 1779,
    "2025-11-08": 1769,
    "2025-11-09": 1579,
    "2025-11-10": 1599,
    "2025-11-11": 1559,
    "2025-11-12": 1559,
    "2025-11-13": 1559,
    "2025-11-14": 1599,
    "2025-11-15": 1579,
    "2025-11-16": 1599,
    "2025-11-17": 1579,
    "2025-11-18": 1569,
    "2025-11-19": 1559,
    "2025-11-20": 1559,
    "2025-11-21": 1579,
    "2025-11-22": 1599,
    "2025-11-23": 1599,
    "2025-11-24": 1599,
    "2025-11-25": 1569,
    "2025-11-26": 1559,
    "2025-11-27": 1569,
    "2025-11-28": 1509,
    "2025-11-29": 1509,
    "2025-11-30": 1459,
  };

  // Find the cheapest date dynamically
  const findCheapestDate = () => {
    let cheapestPrice = Infinity;
    let cheapestDateStr = null;
    for (const dateStr in prices) {
      if (prices[dateStr] < cheapestPrice) {
        cheapestPrice = prices[dateStr];
        cheapestDateStr = dateStr;
      }
    }
    return cheapestDateStr ? new Date(cheapestDateStr + "T00:00:00") : null;
  };
  const cheapestDate = findCheapestDate();

  // --- Functions ---
  const renderCalendar = () => {
    calendarDaysContainer.innerHTML = ""; // Clear previous days
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update header
    monthYearDisplay.textContent = `${currentDate.toLocaleString("default", {
      month: "long",
    })} ${year}`;

    // Get calendar grid info
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon,...
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adjust for week starting on Monday
    const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Add blank days for the start of the month
    for (let i = 0; i < startOffset; i++) {
      calendarDaysContainer.appendChild(document.createElement("div"));
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      const dayNumber = document.createElement("div");
      const priceElement = document.createElement("div");

      dayElement.classList.add("calendar-day");
      dayNumber.classList.add("day-number");
      priceElement.classList.add("price");

      dayNumber.textContent = day;

      const fullDate = new Date(year, month, day);
      const dateString = fullDate.toISOString().split("T")[0];

      if (prices[dateString] !== undefined) {
        priceElement.textContent = `£${prices[dateString].toLocaleString()}`;

        // Add click event listener only for available dates
        dayElement.addEventListener("click", () => {
          selectedDate = fullDate;
          updateSelectedDateDisplay();
          renderCalendar(); // Re-render to show new selection
        });

        // Check if it's the cheapest date
        if (cheapestDate && fullDate.getTime() === cheapestDate.getTime()) {
          dayElement.classList.add("cheapest");
        }
      } else {
        // Dates from image that are grayed out but have a price
        if (dateString === "2025-11-15" || dateString === "2025-11-16") {
          // This part is an assumption from the visual style.
          // The image has prices for these days but they look different. I'm marking them unavailable.
          dayElement.classList.add("unavailable");
        } else {
          dayElement.classList.add("unavailable");
          priceElement.innerHTML = " "; // No price available
        }
      }

      // Check if it's the selected date
      if (selectedDate && fullDate.getTime() === selectedDate.getTime()) {
        dayElement.classList.add("selected");
      }

      dayElement.appendChild(dayNumber);
      dayElement.appendChild(priceElement);
      calendarDaysContainer.appendChild(dayElement);
    }
  };

  const updateSelectedDateDisplay = () => {
    if (selectedDate) {
      const options = {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      selectedDateText.textContent = selectedDate
        .toLocaleDateString("en-GB", options)
        .replace(/,/g, "");
    }
  };

  // --- Event Listeners ---
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  // --- Initial Render ---
  updateSelectedDateDisplay();
  renderCalendar();
});
//  driodown

document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.getElementById("payment-trigger");
  const content = document.getElementById("payment-content");
  const icon = document.getElementById("payment-icon");
  const selectedOptionText = document.getElementById("payment-selected-option");
  const optionItems = document.querySelectorAll(".payment-option-item");

  // --- Toggle Dropdown Visibility ---
  trigger.addEventListener("click", function () {
    const isContentVisible = content.style.display === "block";
    content.style.display = isContentVisible ? "none" : "block";
    icon.classList.toggle("open", !isContentVisible);
  });

  // --- Handle Item Selection ---
  optionItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      // Update the main text with the selected item's text
      selectedOptionText.textContent = event.target.textContent;

      // Close the dropdown
      content.style.display = "none";
      icon.classList.remove("open");

      // Stop the click from bubbling up to the trigger, which would reopen the dropdown
      event.stopPropagation();
    });
  });
});

// alter native flight

document.addEventListener("DOMContentLoaded", function () {
  // --- Interactive Tabs and Pagination ---
  function setupInteractiveLists(selector, itemSelector) {
    const list = document.querySelector(selector);
    if (!list) return;

    list.addEventListener("click", function (e) {
      const clickedItem = e.target.closest(itemSelector);
      if (
        clickedItem &&
        !clickedItem.parentElement.classList.contains("disabled")
      ) {
        e.preventDefault();
        // Remove active class from all items
        list.querySelectorAll(itemSelector).forEach((item) => {
          item.classList.remove("active");
        });
        // Add active class to the clicked item
        clickedItem.classList.add("active");
      }
    });
  }

  setupInteractiveLists(".duration-tabs", ".nav-link");
  setupInteractiveLists(".pagination", ".page-link");

  // --- Flight Filtering Logic ---
  const filterCheckboxes = document.querySelectorAll(
    ".filters-sidebar .form-check-input"
  );
  const allFlightCards = document.querySelectorAll(".flight-card");

  function applyFilters() {
    const activeFilters = {};

    // Collect all checked filters, grouped by type (departure, airline, etc.)
    document.querySelectorAll(".filter-body").forEach((group) => {
      const filterType = group.dataset.filterGroup;
      const checkedInputs = group.querySelectorAll(
        `input[data-filter-type="${filterType}"]:checked`
      );

      // If "Any" is checked for this group, or no specific filter is checked, we don't filter by this type
      const isAnyChecked = Array.from(checkedInputs).some(
        (input) => input.dataset.filterValue === "any"
      );

      if (!isAnyChecked && checkedInputs.length > 0) {
        activeFilters[filterType] = Array.from(checkedInputs).map(
          (input) => input.dataset.filterValue
        );
      }
    });

    // Loop through each flight card and decide if it should be visible
    allFlightCards.forEach((card) => {
      let isVisible = true;

      for (const filterType in activeFilters) {
        const cardValue = card.dataset[filterType];
        const allowedValues = activeFilters[filterType];

        // If the card's data value for this filter type is not in the list of allowed values, hide it.
        if (!allowedValues.includes(cardValue)) {
          isVisible = false;
          break; // No need to check other filters for this card
        }
      }

      card.style.display = isVisible ? "flex" : "none";
    });
  }

  // Add event listener to all checkboxes
  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function (e) {
      const isAnyCheckbox = e.target.classList.contains("filter-any");
      const filterGroup = e.target.closest(".filter-body");

      if (isAnyCheckbox && e.target.checked) {
        // If "Any" is checked, uncheck all others in the same group
        filterGroup.querySelectorAll(".form-check-input").forEach((cb) => {
          if (cb !== e.target) {
            cb.checked = false;
          }
        });
      } else if (!isAnyCheckbox && e.target.checked) {
        // If a specific filter is checked, uncheck the "Any" checkbox in the same group
        const anyCheckbox = filterGroup.querySelector(".filter-any");
        if (anyCheckbox) {
          anyCheckbox.checked = false;
        }
      }

      // If all specific filters are unchecked, re-check the "Any" checkbox
      const specificCheckedCount = filterGroup.querySelectorAll(
        ".form-check-input:not(.filter-any):checked"
      ).length;
      if (specificCheckedCount === 0) {
        const anyCheckbox = filterGroup.querySelector(".filter-any");
        if (anyCheckbox) {
          anyCheckbox.checked = true;
        }
      }

      applyFilters();
    });
  });
});

// custom dropdown

function toggleDropdown() {
  const menu = document.getElementById("dropdown-menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function selectOption(option) {
  document.getElementById("selected-option").innerText = option;
  document.getElementById("dropdown-menu").style.display = "none";
}

// Optional: close dropdown if clicked outside
window.onclick = function (event) {
  if (!event.target.closest(".dropdown-container")) {
    document.getElementById("dropdown-menu").style.display = "none";
  }
};

//  alternative flights

document.addEventListener("DOMContentLoaded", function () {
  const filterTitles = document.querySelectorAll(".filter-title");
  filterTitles.forEach((title) => {
    title.addEventListener("click", () => {
      title.closest(".filter-card").classList.toggle("collapsed");
    });
  });

  const flightCards = document.querySelectorAll(".flight-card");
  const durationSlider = document.getElementById("duration-slider");
  // const durationOutput = document.getElementById('duration-output'); // This element is removed from the new design
  const nightsTabs = document.querySelectorAll(".nights-tabs a");

  function applyFilters() {
    const selectedStops = getSelectedCheckboxes("stops");
    const selectedAirports = getSelectedCheckboxes("airport");
    const selectedAirlines = getSelectedCheckboxes("airline");
    const maxDuration = parseInt(durationSlider.value, 10);
    const selectedNightsTab = document.querySelector(".nights-tabs a.active");

    if (!selectedNightsTab) return;
    const selectedNights = selectedNightsTab.dataset.nights;

    flightCards.forEach((card) => {
      const cardData = card.dataset;
      const stopsMatch =
        selectedStops.length === 0 || selectedStops.includes(cardData.stops);
      const airportMatch =
        selectedAirports.length === 0 ||
        selectedAirports.includes(cardData.airport);
      const airlineMatch =
        selectedAirlines.length === 0 ||
        selectedAirlines.includes(cardData.airline);
      const durationMatch = parseInt(cardData.duration, 10) <= maxDuration;
      const nightsMatch = selectedNights === cardData.nights;

      if (
        stopsMatch &&
        airportMatch &&
        airlineMatch &&
        durationMatch &&
        nightsMatch
      ) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  }

  function getSelectedCheckboxes(name) {
    const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
    if (Array.from(checked).some((el) => el.value === "any")) {
      return [];
    }
    return Array.from(checked).map((el) => el.value);
  }

  function handleCheckboxChange(event) {
    const target = event.target;
    if (!target.matches('input[type="checkbox"]')) return;
    const name = target.name;
    const anyCheckbox = document.querySelector(
      `input[name="${name}"][value="any"]`
    );
    const specificCheckboxes = document.querySelectorAll(
      `input[name="${name}"]:not([value="any"])`
    );
    if (target.value === "any" && target.checked) {
      specificCheckboxes.forEach((cb) => (cb.checked = false));
    } else if (target.value !== "any" && target.checked) {
      anyCheckbox.checked = false;
    }
    if (!Array.from(specificCheckboxes).some((cb) => cb.checked)) {
      anyCheckbox.checked = true;
    }
    applyFilters();
  }

  // The slider value change now only triggers the filter, no text update is needed
  function handleDurationChange() {
    applyFilters();
  }

  function handleNightsTabClick(event) {
    event.preventDefault();
    nightsTabs.forEach((tab) => tab.classList.remove("active"));
    event.currentTarget.classList.add("active");
    applyFilters();
  }

  document
    .querySelector(".filters-sidebar")
    .addEventListener("change", handleCheckboxChange);
  durationSlider.addEventListener("input", handleDurationChange);
  nightsTabs.forEach((tab) =>
    tab.addEventListener("click", handleNightsTabClick)
  );

  // Initial call to set up filters based on default values
  applyFilters();
});
