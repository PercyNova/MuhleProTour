// shared-testimonials.js
window.API_BASE_URL = 'http://localhost:3300';

window.elements = {
    form: {
        fullname: document.getElementById('fullname'),
        email: document.getElementById('email'),
        comment: document.getElementById('comment'),
        submit: document.querySelector('.submit'),
        stars: document.querySelectorAll('.star-post')
    },
    display: {
        container: document.querySelector('.testimonial-container')
    }
};

// State Management
let selectedRating = 0;

// Validation Functions
const validators = {
    fullname: (value) => value.trim().length >= 2,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    comment: (value) => value.trim(),
    rating: (value) => value > 0 && value <= 5
};

window.testimonialHelpers = {
    validateForm: () => {
        const errors = [];
        
        ['fullname', 'email'].forEach(field => {
            const value = elements.form[field].value.trim();
            if (!value || !validators[field]?.(value)) {
                errors.push(`Please provide a valid ${field}`);
            }
        });
        
        if (!validators.rating(selectedRating)) {
            errors.push('Please select a rating');
        }
        
        return errors;
    },
    selectedRating: () => selectedRating,
    setRating: (rating) => {
        selectedRating = rating;
    }
};

window.ui = {
    clearForm: () => {
        ['fullname', 'email', 'comment'].forEach(field => {
            elements.form[field].value = '';
        });
        selectedRating = 0;
        elements.form.stars.forEach(star => star.classList.remove('active'));
    },
    
    showError: (errors) => {
        alert(errors.join('\n'));
    },

    generateStars: (rating) => {
        return Array(5).fill(0)
            .map((_, index) => `
                <i class="fa-solid fa-star prstar preloaded-stars${index < rating ? ' active' : ''}"></i>
            `)
            .join('');
    },
    
    createTestimonialCard: (testimonial) => `
        <div class="col">
            <div class="t-blocks">
                <div class="p-details">
                    <img src="/img/pichold.jpg" alt="Profile photo" style="height: 65px;">
                    <div class="info">
                        <h3>${testimonial.fullName}</h3>
                        <p class="datetime">${testimonial.date}</p>
                    </div>
                </div>
                <div class="t-message">
                    <p class="message">${testimonial.comment}</p>
                    <div class="rating-box rand">
                        <div class="stars">${ui.generateStars(testimonial.rating)}</div>
                    </div>
                </div>
            </div>
        </div>
    `,

    displayTestimonials: (testimonials) => {
        elements.display.container.innerHTML = testimonials
            .map(ui.createTestimonialCard)
            .join('');
    }
};

// Star Rating Handler
const handleStarClick = (event) => {
    const clickedIndex = Array.from(elements.form.stars).indexOf(event.target);
    testimonialHelpers.setRating(clickedIndex + 1);
    
    elements.form.stars.forEach((star, index) => {
        star.classList.toggle('active', index <= clickedIndex);
    });
};

// Initialize star rating functionality
elements.form.stars.forEach(star => star.addEventListener('click', handleStarClick));

// Add CSS for the stars
const style = document.createElement('style');
style.textContent = `
    .stars i.active {
        color: #ff9c1a !important;
    }
    .preloaded-stars {
        color: #e6e6e6;
    }
`;
document.head.appendChild(style);