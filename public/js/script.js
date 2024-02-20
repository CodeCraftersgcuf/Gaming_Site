// Get the navbar element
const navbar = document.querySelector(".navbar");

// Variable to store the previous scroll position
let prevScrollPos = window.pageYOffset;

// Function to handle scroll event
function handleScroll() {
  // Get the current scroll position
  const currentScrollPos = window.pageYOffset;

  // Check if the scroll direction is down and the user has scrolled more than 100px
  if (prevScrollPos < currentScrollPos && currentScrollPos > 100) {
    // Hide the navbar by adding a CSS class
    navbar.classList.add("hidden");
  } else {
    // Show the navbar by removing the CSS class
    navbar.classList.remove("hidden");
  }

  // Update the previous scroll position
  prevScrollPos = currentScrollPos;
}

// Add scroll event listener to the window
window.addEventListener("scroll", handleScroll);

