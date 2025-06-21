// menu
const mobileMenu = document.getElementById("mobileMenu");
const hamburgerIcon = document.getElementById("hamburger-icon");
const closeIcon = document.getElementById("close-icon");

mobileMenu.addEventListener("show.bs.collapse", function (event) {
  if (event.target.id === "mobileMenu") {
    hamburgerIcon.classList.add("d-none");
    closeIcon.classList.remove("d-none");
    document.body.classList.add("menu-open");
  }
});

mobileMenu.addEventListener("hide.bs.collapse", function (event) {
  if (event.target.id === "mobileMenu") {
    hamburgerIcon.classList.remove("d-none");
    closeIcon.classList.add("d-none");
    document.body.classList.remove("menu-open");
  }
});

// menu end
// collaps
document.addEventListener("DOMContentLoaded", function () {
  // Main dropdown toggle functionality
  const mainDropdownHeader = document.getElementById("mainDropdownHeader");
  const mainDropdownContent = document.getElementById("mainDropdownContent");
  const mainDropdownIcon = mainDropdownHeader.querySelector(".dropdown-icon");

  mainDropdownHeader.addEventListener("click", () => {
    mainDropdownHeader.classList.toggle("active");
    if (mainDropdownHeader.classList.contains("active")) {
      mainDropdownContent.style.maxHeight =
        mainDropdownContent.scrollHeight + "px";
    } else {
      mainDropdownContent.style.maxHeight = "0";
      // Close all sub-dropdowns when main dropdown closes
      document
        .querySelectorAll(".sub-dropdown-content")
        .forEach((subContent) => {
          subContent.style.maxHeight = "0";
        });
      document.querySelectorAll(".sub-dropdown-toggle").forEach((subToggle) => {
        subToggle.classList.remove("active");
      });
    }
  });
});
// travel partner

const carouselTrack = document.getElementById("partnerCarousel");
const slides = Array.from(carouselTrack.children);
// Original number of unique slides
const originalSlideCount = slides.length / 2; // Assuming we duplicated the set once
let slideWidth = 0; // Initialize
let currentIndex = 0; // This index will go beyond originalSlideCount for the seamless loop

/**
 * Calculates the effective width of a slide including gap.
 * This function should be called after the DOM is rendered and on resize.
 */
function calculateSlideWidth() {
  if (slides[0]) {
    const gap = parseFloat(getComputedStyle(carouselTrack).gap) || 0;
    return slides[0].offsetWidth + gap;
  }
  return 0;
}

/**
 * Moves the carousel track by a single slide.
 */
function moveCarousel() {
  slideWidth = calculateSlideWidth(); // Recalculate just before moving

  currentIndex++;

  // Apply the transform to move the carousel
  carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // If we've passed the original set of logos, instantly jump back to the beginning
  // This creates the seamless loop effect
  if (currentIndex >= originalSlideCount) {
    // Wait for the current transition to complete before resetting
    setTimeout(() => {
      carouselTrack.style.transition = "none"; // Temporarily disable transition
      currentIndex = 0; // Reset index to the start of the original set
      carouselTrack.style.transform = `translateX(-${
        currentIndex * slideWidth
      }px)`;
      // Re-enable transition after reset
      setTimeout(() => {
        carouselTrack.style.transition = "transform 0.5s ease-in-out";
      }, 50); // A small delay to ensure 'none' is applied first
    }, 500); // This delay should match your CSS transition duration (0.5s)
  }
}

// Initialize carousel position on load and recalculate on resize
window.addEventListener("load", () => {
  slideWidth = calculateSlideWidth(); // Initial calculation
  carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // Auto-play carousel
  setInterval(() => {
    moveCarousel(); // Move one logo to the right (next)
  }, 2000); // Change slide every 3 seconds
});

window.addEventListener("resize", () => {
  // When resizing, recalculate slideWidth and adjust position
  slideWidth = calculateSlideWidth();
  // Ensure the current position is valid relative to the new slideWidth
  carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
});

// click and icon change nav

// recent view
// Get the container and the buttons
const container = document.getElementById("hotel-cards-container");
const scrollLeftButton = document.getElementById("scroll-left");
const scrollRightButton = document.getElementById("scroll-right");

// Function to handle scrolling
function scrollContainer(amount) {
  container.scrollBy({
    left: amount,
    behavior: "smooth",
  });
}

// Add event listener for the right scroll button
scrollRightButton.addEventListener("click", () => {
  const card = container.querySelector(".card");
  if (card) {
    const gap = parseFloat(getComputedStyle(container).gap);
    const scrollAmount = card.offsetWidth + gap;
    scrollContainer(scrollAmount);
  }
});

// Add event listener for the left scroll button
scrollLeftButton.addEventListener("click", () => {
  const card = container.querySelector(".card");
  if (card) {
    const gap = parseFloat(getComputedStyle(container).gap);
    const scrollAmount = card.offsetWidth + gap;
    scrollContainer(-scrollAmount);
  }
});
