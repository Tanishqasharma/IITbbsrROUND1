// Set the total number of slides
const TOTAL_SLIDES = 4; 

// Get elements from the HTML structure
const casesWrapper = document.getElementById('cases-wrapper');
const caseNumberEl = document.getElementById('case-number');
const fixedBgEl = document.getElementById('fixed-color-bg');
const appEl = document.getElementById('showcase-app');

let currentSlideIndex = 1;
let isAnimating = false;
const transitionSpeed = 600; // Must match CSS transition speed (0.6s)

// --- CSS Class/Attribute Manipulation ---

/** Updates the DOM to display the correct case content and backgrounds. */
function updateShowcase(newIndex) {
    // 1. Update Slide Visibility (Opacity)
    const oldSlide = document.querySelector('.case-slide.active');
    const newSlide = document.querySelector(`.case-slide[data-index="${newIndex}"]`);

    if (oldSlide) oldSlide.classList.remove('active');
    if (newSlide) newSlide.classList.add('active');

    // 2. Update Content Position (Vertical Translation)
    // Moves the wrapper up by 100vh for each slide past the first one
    const offset = -(newIndex - 1) * 100;
    casesWrapper.style.transform = `translateY(${offset}vh)`;

    // 3. Update Visual Elements (Background and Number)
    // Ensure the number display handles the slide number (e.g., 01, 02, 03, 04)
    caseNumberEl.dataset.number = newIndex < 10 ? `0${newIndex}` : `${newIndex}`; 
    
    // The background color shift moves horizontally based on the current slide
    fixedBgEl.style.transform = `translateX(${offset}vw)`;
    
    // Additional effect: Change primary app background color based on the case (Simulated)
    // Note: This helps create contrast needed in the original video.
    if (newIndex === 1) {
         // Default (Red Background)
        appEl.style.backgroundColor = '#fff';
    } else if (newIndex === 2) {
        // Grand Hotel (Background visible under the pink)
        appEl.style.backgroundColor = '#fff'; 
    } else if (newIndex === 3) {
        // Informal Meeting 
        appEl.style.backgroundColor = '#333'; 
    } else if (newIndex === 4) {
        // New Slide
        appEl.style.backgroundColor = '#1a1a1a'; 
    }
}

// --- Scroll/Interaction Handling ---

/** Handles the transition between slides based on scroll direction. */
function changeSlide(direction) {
    if (isAnimating) return; // Prevent rapid scrolling/spamming

    let newIndex = currentSlideIndex + direction;

    // Looping logic (Wraps around from 4 to 1, or 1 to 4)
    if (newIndex > TOTAL_SLIDES) {
        newIndex = 1;
    } else if (newIndex < 1) {
        newIndex = TOTAL_SLIDES;
    }

    if (newIndex !== currentSlideIndex) {
        isAnimating = true;
        currentSlideIndex = newIndex;
        updateShowcase(currentSlideIndex);

        // Re-enable animation flag after transition time
        setTimeout(() => {
            isAnimating = false;
        }, transitionSpeed);
    }
}

// Event listener for mouse wheel/trackpad scrolling
document.addEventListener('wheel', (event) => {
    // Determine scroll direction (Positive deltaY is down, negative is up)
    const direction = event.deltaY > 0 ? 1 : -1; 
    changeSlide(direction);
}, { passive: true }); // passive: true improves scrolling performance

// Initialize the first slide when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateShowcase(currentSlideIndex);
});
