// get-testimonials.js
const fetchTestimonials = async () => {
    try {
        console.log('Attempting to fetch testimonials from:', `${API_BASE_URL}/api/testimonials`);
        const response = await fetch(`${API_BASE_URL}/api/testimonials`);
        if (!response.ok) throw new Error(`Failed to fetch testimonials: ${response.status} ${response.statusText}`);
        const testimonials = await response.json();
        console.log('Fetched testimonials:', testimonials);

        // Sort testimonials by date (newest first)
        const sortedTestimonials = testimonials.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );

        // If we're on the index page, only show top 6
        const isIndexPage = window.location.pathname === '/' || window.location.pathname === '/index.html';
        const testimonialsToDisplay = isIndexPage ? sortedTestimonials.slice(0, 6) : sortedTestimonials;

        // Use the existing UI display function
        ui.displayTestimonials(testimonialsToDisplay);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        console.error('Full error details:', {
            message: error.message,
            stack: error.stack
        });
    }
};

window.fetchTestimonials = fetchTestimonials;
window.addEventListener('load', fetchTestimonials);