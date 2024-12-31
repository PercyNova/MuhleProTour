const postTestimonial = async (testimonial) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/testimonials`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testimonial),
        });
        
        if (!response.ok) {
            throw new Error('Failed to post testimonial');
        }
        
        const result = await response.json();
        alert('Thank you for your testimonial!');
        return result;
    } catch (error) {
        console.error('Error posting testimonial:', error);
        alert('An error occurred while submitting your testimonial.');
        throw error;
    }
};


elements.form.submit.addEventListener('click', async (event) => {
    event.preventDefault();
    
    const errors = testimonialHelpers.validateForm();
    if (errors.length > 0) {
        ui.showError(errors);
        return;
    }

    const testimonial = {
        fullName: elements.form.fullname.value.trim(),
        email: elements.form.email.value.trim(),
        comment: elements.form.comment.value.trim(),
        rating: testimonialHelpers.selectedRating(),
        date: new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date())
    };

    try {
        await postTestimonial(testimonial);
        ui.clearForm();
        await fetchTestimonials();
    } catch (error) {
        console.error('Failed to process testimonial submission:', error);
    }
});