// get-testimonials.js
const fetchTestimonials = async () => {
    try {
        console.log('Attempting to fetch testimonials from:', `${API_BASE_URL}/api/testimonials`);
        const response = await fetch(`${API_BASE_URL}/api/testimonials`);
        if (!response.ok) throw new Error(`Failed to fetch testimonials: ${response.status} ${response.statusText}`);
        const testimonials = await response.json();
        console.log('Fetched testimonials:', testimonials);
        ui.displayTestimonials(testimonials);
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