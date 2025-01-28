let map;
let autocompletePickup;
let autocompleteDropoff;

// Initialize the Google Map
function initMap() {
  const pickupMapElement = document.querySelector('gmp-map[data-suffix="pu"]');
  const dropoffMapElement = document.querySelector('gmp-map[data-suffix="do"]');

  if (!pickupMapElement || !dropoffMapElement) {
    console.error("Map elements not found.");
    return;
  }

  // Initialize the map
  map = new google.maps.Map(pickupMapElement, {
    center: { lat: 0, lng: 0 }, // Default center
    zoom: 8,
  });

  // Initialize Autocomplete for Pickup and Dropoff Locations
  autocompletePickup = new google.maps.places.Autocomplete(document.getElementById('location-input-pu'));
  autocompleteDropoff = new google.maps.places.Autocomplete(document.getElementById('location-input-do'));

  // Set fields for the autocomplete
  autocompletePickup.setFields(['address_components', 'geometry']);
  autocompleteDropoff.setFields(['address_components', 'geometry']);

  // Handle place changes for Pickup
  autocompletePickup.addListener("place_changed", function () {
    const place = autocompletePickup.getPlace();
    if (place.geometry) {
      map.setCenter(place.geometry.location);
    }
  });

  // Handle place changes for Dropoff
  autocompleteDropoff.addListener("place_changed", function () {
    const place = autocompleteDropoff.getPlace();
    if (place.geometry) {
      map.setCenter(place.geometry.location);
    }
  });
}

// Event listener for the "Determine Price" button
document.addEventListener('DOMContentLoaded', () => {
  const priceButton = document.querySelector('.price-button');
  if (priceButton) {
    priceButton.addEventListener('click', () => {
      const pickupInput = document.getElementById('location-input-pu').value;
      const dropoffInput = document.getElementById('location-input-do').value;

      if (!pickupInput || !dropoffInput) {
        alert("Please enter both pickup and dropoff locations.");
      } else {
        calculateDistance(pickupInput, dropoffInput);
      }
    });
  } else {
    console.error('Price button not found.');
  }
});

// Function to calculate distance between pickup and dropoff
function calculateDistance(origin, destination) {
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: origin }, (originResults, originStatus) => {
    if (originStatus === 'OK') {
      const originLatLng = originResults[0].geometry.location;

      geocoder.geocode({ address: destination }, (destinationResults, destinationStatus) => {
        if (destinationStatus === 'OK') {
          const destinationLatLng = destinationResults[0].geometry.location;

          const service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: [originLatLng],
              destinations: [destinationLatLng],
              travelMode: 'DRIVING',
              unitSystem: google.maps.UnitSystem.METRIC
            },
            (response, status) => {
              if (status === 'OK') {
                const distance = response.rows[0].elements[0].distance.value; // in meters
                const numericPrice = determineNumericPrice(distance); // Get numeric price
                const formattedPrice = `R${numericPrice}`; // Format price for display
                
                document.getElementById('price').value = formattedPrice; // Display formatted price
                displayRoute(originLatLng, destinationLatLng);
              } else {
                console.error('Distance Matrix Error:', status);
                alert("Could not calculate the distance. Please check the addresses.");
              }
            }
          );
        } else {
          console.error('Dropoff Geocode Error:', destinationStatus);
          alert("Invalid drop-off address.");
        }
      });
    } else {
      console.error('Pickup Geocode Error:', originStatus);
      alert("Invalid pick-up address.");
    }
  });
}

// Function to determine numeric price (no formatting)
function determineNumericPrice(distance) {
  const basePrice = 50; // Base price
  const pricePerKm = 10; // Price per kilometer
  const distanceInKm = distance / 1000; // Convert meters to kilometers
  const totalPrice = basePrice + (distanceInKm * pricePerKm);
  return `${totalPrice}`;
}


// Function to display route on the map
function displayRoute(origin, destination) {
  if (!map) return;

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
  });

  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(result);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

function formatDateTime(datetime) {
  const date = new Date(datetime);

  // Format the date as desired (e.g., "December 30, 2024, 5:45 PM")
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric', 
    hour12: true 
  };

  return date.toLocaleString('en-US', options);
}

function generateReceipt(event) {
  event.preventDefault(); // Prevent form submission

  // Get form data
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const serviceType = document.getElementById('serviceType').value;
  const pickupLocation = document.getElementById('location-input-pu').value;
  const dropoffLocation = document.getElementById('location-input-do').value;
  const pickupDatetime = document.getElementById('pickupDatetime').value;
  const price = document.getElementById('price').value;

  // Format the pickup datetime
  const formattedPickupDatetime = formatDateTime(pickupDatetime);

  // Set the receipt details
  document.getElementById('receiptFullName').textContent = fullName;
  document.getElementById('receiptEmail').textContent = email;
  document.getElementById('receiptPhone').textContent = phone;
  document.getElementById('receiptServiceType').textContent = serviceType;
  document.getElementById('receiptPickupLocation').textContent = pickupLocation;
  document.getElementById('receiptDropoffLocation').textContent = dropoffLocation;
  document.getElementById('receiptPickupDatetime').textContent = formattedPickupDatetime;
  document.getElementById('receiptPrice').textContent = price;

  // Hide the form and show the receipt
  document.querySelector('.form').style.display = 'none';
  document.getElementById('bookingReceipt').style.display = 'block';

  // Store the form data in the sessionStorage to retain information when editing
  sessionStorage.setItem('fullName', fullName);
  sessionStorage.setItem('email', email);
  sessionStorage.setItem('phone', phone);
  sessionStorage.setItem('serviceType', serviceType);
  sessionStorage.setItem('pickupLocation', pickupLocation);
  sessionStorage.setItem('dropoffLocation', dropoffLocation);
  sessionStorage.setItem('pickupDatetime', pickupDatetime);
  sessionStorage.setItem('price', price);
}

// Function to format the pickup datetime (you can adjust this function as needed)
function formatDateTime(datetime) {
  const date = new Date(datetime);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

// Add event listener for the "Edit" button
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.edit-btn').addEventListener('click', function () {
    console.log("Edit button clicked!");
    
    // Show the form again
    document.querySelector('.form').style.display = 'block';
    document.getElementById('bookingReceipt').style.display = 'none';

    // Retrieve the form data from sessionStorage and populate the form fields
    document.getElementById('fullName').value = sessionStorage.getItem('fullName');
    document.getElementById('email').value = sessionStorage.getItem('email');
    document.getElementById('phone').value = sessionStorage.getItem('phone');
    document.getElementById('serviceType').value = sessionStorage.getItem('serviceType');
    document.getElementById('location-input-pu').value = sessionStorage.getItem('pickupLocation');
    document.getElementById('location-input-do').value = sessionStorage.getItem('dropoffLocation');
    document.getElementById('pickupDatetime').value = sessionStorage.getItem('pickupDatetime');
    document.getElementById('price').value = sessionStorage.getItem('price');
  });

  // Add event listener for the "Pay" button
  document.querySelector('.pay-btn').addEventListener('click', function () {
    console.log("Pay button clicked!");
    alert('Coming Soon!');
  });
});

// Function to handle shadow DOM styling and layout
function initializeLocationFields() {
  // Wait for Custom Elements to be defined
  customElements.whenDefined('gmpx-split-layout').then(() => {
    // Get all split layout elements
    const splitLayouts = document.querySelectorAll('gmpx-split-layout');
    
    splitLayouts.forEach(layout => {
      // First, style the host element itself
      Object.assign(layout.style, {
        display: 'block',
        height: 'auto',
        minHeight: 'unset'
      });

      // Wait for shadow root to be available
      if (layout.shadowRoot) {
        applyShadowStyles(layout.shadowRoot);
      } else {
        // If shadow root isn't immediately available, observe for changes
        const observer = new MutationObserver((mutations, obs) => {
          if (layout.shadowRoot) {
            applyShadowStyles(layout.shadowRoot);
            obs.disconnect(); // Stop observing once shadow root is found
          }
        });
        
        observer.observe(layout, {
          childList: true,
          subtree: true
        });
      }
    });
  });
}

// Function to apply styles to shadow root elements
function applyShadowStyles(shadowRoot) {
  // Create and insert custom styles
  const styleSheet = new CSSStyleSheet();
  styleSheet.replaceSync(`
    .main-container {
      display: none !important;
    }
    .panel {
      position: static !important;
      height: auto !important;
      max-height: none !important;
      overflow: visible !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    .input-container {
      margin: 0 !important;
      padding: 0 !important;
    }
    .content-container {
      height: auto !important;
      max-height: none !important;
      overflow: visible !important;
    }
    .split-layout {
      height: auto !important;
      min-height: unset !important;
    }
  `);

  // Adopt the stylesheet
  try {
    shadowRoot.adoptedStyleSheets = [styleSheet];
  } catch (e) {
    // Fallback for browsers that don't support adoptedStyleSheets
    const styleElement = document.createElement('style');
    styleElement.textContent = styleSheet.toString();
    shadowRoot.appendChild(styleElement);
  }

  // Direct style application for immediate effect
  const mainContainer = shadowRoot.querySelector('.main-container');
  if (mainContainer) {
    Object.assign(mainContainer.style, {
      display: 'none',
      height: '0',
      minHeight: '0'
    });
  }

  const panel = shadowRoot.querySelector('.panel');
  if (panel) {
    Object.assign(panel.style, {
      position: 'static',
      height: 'auto',
      maxHeight: 'none',
      overflow: 'visible',
      padding: '0',
      margin: '0'
    });
  }

  const contentContainer = shadowRoot.querySelector('.content-container');
  if (contentContainer) {
    Object.assign(contentContainer.style, {
      height: 'auto',
      maxHeight: 'none',
      overflow: 'visible'
    });
  }

  const splitLayout = shadowRoot.querySelector('.split-layout');
  if (splitLayout) {
    Object.assign(splitLayout.style, {
      height: 'auto',
      minHeight: 'unset'
    });
  }
}

// Initialize as soon as DOM is loaded
document.addEventListener('DOMContentLoaded', initializeLocationFields);

// Additional event listener for dynamic content
window.addEventListener('load', initializeLocationFields);

// Handle dynamic insertion of gmpx-split-layout elements
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeName === 'GMPX-SPLIT-LAYOUT') {
        initializeLocationFields();
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});