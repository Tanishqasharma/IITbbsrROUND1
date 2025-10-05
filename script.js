// Set the threshold (in pixels) for when the card should appear.
// This is set to 300px, meaning the user must scroll 300px down from the top.
const SCROLL_THRESHOLD = 300; 

document.addEventListener('DOMContentLoaded', () => {
    const brandKitsCard = document.getElementById('brand-kits-card');
    
    if (!brandKitsCard) {
        // Log an error if the card isn't in the HTML, so you can debug later.
        console.error("Brand Kits card element (id='brand-kits-card') not found!");
        return;
    }

    // Function to handle the scroll event
    window.addEventListener('scroll', function() {
        // Get the current scroll position from the top of the page
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // SCROLL DOWN detection logic:
        if (scrollTop > SCROLL_THRESHOLD) {
            // User has scrolled past the threshold: Show the card
            // We use 'scrolled-up' class for visibility, as defined in styles.css
            brandKitsCard.classList.add('scrolled-up');
        } else {
            // User is near the top: Hide the card
            brandKitsCard.classList.remove('scrolled-up');
        }
    });
});

const carouselSection = document.getElementById('carouselSection');

    function checkScroll() {
      const rect = carouselSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

      if (isVisible) {
        carouselSection.classList.add('visible');
        window.removeEventListener('scroll', checkScroll); // Optional: remove listener after fade-in
      }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on load
