# Muhle Pro Tours - Website README

Welcome to **Muhle Pro Tours**, your premier choice for reliable, luxurious, and tailored shuttle services. This README provides an overview of the website's structure, its features, and how to navigate through the various sections.

## Table of Contents:
1. [Website Overview](#website-overview)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [Folder Structure](#folder-structure)
5. [Setup Instructions](#setup-instructions)

---

## Website Overview

The **Muhle Pro Tours** website serves as an informative platform for the shuttle service business, offering details about the company, its services, and contact information. The website aims to provide a seamless and user-friendly experience for customers and visitors. 

It consists of several key sections:
- **Home**: An introduction to the company and services.
- **About Us**: A detailed description of the company's mission, values, and background.
- **Meet Our Team**: Information about the founder and the team behind Muhle Pro Tours.
- **Our Services**: A list of shuttle services provided, including airport transfers, door-to-door transfers, and more.
- **Gallery**: A collection of images showcasing the company's services and vehicles.
- **Footer**: Contact details, social media links, and additional navigation.

---

## Technologies Used

- **HTML5**: The structure and content of the website.
- **CSS3**: Styling of the website, with custom styles in `about.css` and `overall.css`.
- **Bootstrap 4**: A front-end framework for responsive design and UI components.
- **Font Awesome**: Used for icons throughout the website.
- **jQuery**: For handling dynamic interactions such as the navbar toggler and dropdowns.
- **Google Fonts**: For custom fonts to improve readability and style.
- **Bootstrap Icons**: For additional icons in the footer and navigation.
- **JavaScript**: For dynamic interactions, especially the hamburger menu and collapsing navbar.

---

## Features

- **Responsive Navigation**: The website features a fully responsive navbar that adapts to different screen sizes, with a collapsible option for mobile devices. The hamburger menu changes its state based on whether the navigation is visible.
- **About Us Section**: Describes the company’s mission, values, and history. It also features a section about the founder, Mr. Brian Mkhabela.
- **Services Section**: Displays the different shuttle services offered by the company, including airport transfers, chauffeur drives, and more.
- **Gallery Section**: Displays images of the shuttle services and vehicles, helping customers visualize the offerings.
- **Footer Section**: Provides easy access to the company’s contact details, social media links, and additional navigation.
  
---

## Folder Structure

Here’s an overview of the folder structure for the website:

```
/MuhleProTours
│
├── /css
│   ├── about.css           # Styles specific to the About Us page
│   ├── overall.css         # General styles for the entire website
│
├── /img
│   ├── logo-final.png      # The website's logo
│   ├── CEO.png             # Image of the CEO
│   ├── placeholder.png     # Placeholder images for gallery
│
├── /html
│   ├── about.html          # About Us page
│   ├── meet.html           # Meet Our Team page
│   ├── booking.html        # Booking page (paywall API not yet implemented)
│   ├── testimonies.html    # Testimonials page (not yet implemented)
│
├── /js
│   ├── script.js           # JavaScript for dynamic interactions
│
└── index.html              # Home page of the website
```

---

## Setup Instructions

1. **Clone the Repository**:
   - Clone the repository to your local machine using:
     ```bash
     git clone <repository_url>
     ```

2. **Install Dependencies**:
   - The website uses **Bootstrap 4** and **jQuery**. Ensure your system is connected to the internet to use the CDN links provided in the HTML.

3. **Open the Website**:
   - To view the website, simply open the `index.html` file in a browser.

4. **Customize Content**:
   - You can modify the text in any of the pages (`about.html`, `meet.html`, etc.) by editing the HTML files.
   - To update the images, simply replace the images in the `/img` folder with your own assets.

5. **Run the Website**:
   - No server is required for basic viewing. Just open `index.html` or any other HTML file in a browser.

---

## Known Limitations

- **Testimonials/Reviews**: The testimonials/reviews section is not yet implemented in this version of the website.
- **Booking System**: The booking system is not yet functional as the paywall API has not been integrated.

---

## Future Enhancements

- **Booking System Integration**: Implement the paywall API for customer booking and payment processing.
- **Testimonials Section**: Add a testimonial submission and display system.
- **User Authentication**: Implement a login system for customers to track their bookings and preferences.

---

**Thank you for visiting Muhle Pro Tours!** We are excited to provide you with an exceptional travel experience. If you have any questions or feedback, feel free to reach out via the contact section.
