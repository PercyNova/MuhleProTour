// Constants and DOM Elements
const STORAGE_KEY = 'testimonials';
const REQUIRED_FIELDS = ['fullname', 'email'];

const elements = {
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

const validateForm = () => {
    const errors = [];
    
    REQUIRED_FIELDS.forEach(field => {
        const value = elements.form[field].value.trim();
        if (!value || !validators[field]?.(value)) {
            errors.push(`Please provide a valid ${field}`);
        }
    });
    
    if (!validators.rating(selectedRating)) {
        errors.push('Please select a rating');
    }
    
    return errors;
};

// Storage Functions
const storage = {
    save: (testimonial) => {
        const testimonials = storage.getAll();
        testimonials.push(testimonial);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials));
    },
    
    getAll: () => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (error) {
            console.error('Error reading testimonials:', error);
            return [];
        }
    }
};

// UI Functions
const ui = {
    clearForm: () => {
        REQUIRED_FIELDS.forEach(field => {
            elements.form[field].value = '';
        });
        selectedRating = 0;
        elements.form.stars.forEach(star => star.classList.remove('active'));
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
                    <div class="rating-box rand" id="writtenTestimoniesRating">
                        <div class="stars">
                            ${ui.generateStars(testimonial.rating)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    displayTestimonials: () => {
        const testimonials = storage.getAll();
        elements.display.container.innerHTML = testimonials
            .map(ui.createTestimonialCard)
            .join('');
    },
    
    showError: (errors) => {
        alert(errors.join('\n'));
    }
};

// Event Handlers
const handleSubmit = (event) => {
    event.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
        ui.showError(errors);
        return;
    }
    
    const testimonial = {
        fullName: elements.form.fullname.value.trim(),
        email: elements.form.email.value.trim(),
        comment: elements.form.comment.value.trim(),
        rating: selectedRating,
        date: new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date())
    };
    
    storage.save(testimonial);
    ui.clearForm();
    ui.displayTestimonials();
    alert('Thank you for your testimonial!');
};

const handleStarClick = (event) => {
    const clickedIndex = Array.from(elements.form.stars).indexOf(event.target);
    selectedRating = clickedIndex + 1;
    
    elements.form.stars.forEach((star, index) => {
        star.classList.toggle('active', index <= clickedIndex);
    });
};

// Event Listeners
const initializeEventListeners = () => {
    elements.form.submit.addEventListener('click', handleSubmit);
    elements.form.stars.forEach(star => star.addEventListener('click', handleStarClick));
    window.addEventListener('load', ui.displayTestimonials);
};

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

// Initialize
initializeEventListeners();