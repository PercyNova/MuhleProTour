// Variables to track scroll position and navbar element
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const body = document.body;
const html = document.documentElement;

// Function to calculate the navbar height and adjust the margin-top of the body
const adjustBodyMargin = () => {
    const navbarHeight = navbar.offsetHeight;
    body.style.marginTop = `${navbarHeight}px`; // Add margin-top to body to prevent content from hiding behind the navbar
};

// Detect scroll events
window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // If scrolling down, hide the navbar
    if (currentScroll > lastScrollTop) {
        navbar.classList.add('hidden');
    } else {
        // If scrolling up, show the navbar
        navbar.classList.remove('hidden');
    }

    // Update the last scroll position
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values

    // Adjust the margin-top after scroll
    adjustBodyMargin();
});

// Adjust the margin-top initially on page load
window.addEventListener('load', adjustBodyMargin);
