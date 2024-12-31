const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3300; // Updated to 3300
const TESTIMONIALS_FILE = path.join(__dirname, 'json', 'testimonials.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'MUHLEPROTOUR')));

// GET testimonials
app.get('/api/testimonials', (req, res) => {
    fs.readFile(TESTIMONIALS_FILE, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading testimonials file:', err);
            return res.status(500).json({ error: 'Failed to read testimonials' });
        }
        res.json(JSON.parse(data || '[]'));
    });
});

// POST testimonial
app.post('/api/testimonials', (req, res) => {
    const newTestimonial = req.body;
    fs.readFile(TESTIMONIALS_FILE, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading testimonials file:', err);
            return res.status(500).json({ error: 'Failed to read testimonials' });
        }

        const testimonials = JSON.parse(data || '[]');
        testimonials.push(newTestimonial);

        fs.writeFile(TESTIMONIALS_FILE, JSON.stringify(testimonials, null, 2), (err) => {
            if (err) {
                console.error('Error writing testimonials file:', err);
                return res.status(500).json({ error: 'Failed to save testimonial' });
            }
            res.status(201).json(newTestimonial);
        });
    });
});

// Add error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});