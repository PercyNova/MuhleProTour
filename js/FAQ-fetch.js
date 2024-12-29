document.addEventListener('DOMContentLoaded', () => {
  const faqLink = document.getElementById('faqLink');
  const faqSection = document.getElementById('faq-section');
  const closeFaq = document.getElementById('close-faq');
  const overlay = document.getElementById('overlay');
  let faqDataLoaded = false; // Track if the FAQ data has been loaded

  if (faqLink && faqSection && closeFaq && overlay) {
    // Show FAQ section
    faqLink.addEventListener('click', async (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(() => {
        overlay.style.display = 'block';
        faqSection.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Lock scrolling
      }, 500);

      // Load FAQ data only once
      if (!faqDataLoaded) {
        await fetchFAQData();
        faqDataLoaded = true;
      }
    });

    // Close FAQ section
    const closeFAQ = () => {
      faqSection.style.display = 'none';
      overlay.style.display = 'none';
      document.body.style.overflow = 'auto'; // Enable scrolling
    };

    closeFaq.addEventListener('click', closeFAQ);
    overlay.addEventListener('click', closeFAQ);
  }
});

async function fetchFAQData() {
  try {
    // Replace with the actual URL of the JSON file
    const response = await fetch('/json/FAQ.json');
    const faqData = await response.json();

    // Get the accordion container where the FAQ cards will be inserted
    const faqAccordion = document.getElementById('faqAccordion');
    if (!faqAccordion) return; // Ensure the accordion container exists

    // Loop through the FAQ data and create the cards dynamically
    faqData.forEach((faq, index) => {
      const card = document.createElement('div');
      card.classList.add('card');

      // Create the card header with the question
      const cardHeader = document.createElement('div');
      cardHeader.classList.add('card-header');
      cardHeader.id = `faq${index + 1}`;

      const headerButton = document.createElement('button');
      headerButton.classList.add('btn', 'btn-link');
      headerButton.setAttribute('type', 'button');
      headerButton.setAttribute('data-toggle', 'collapse');
      headerButton.setAttribute('data-target', `#collapse${index + 1}`);
      headerButton.setAttribute('aria-expanded', 'false');
      headerButton.setAttribute('aria-controls', `collapse${index + 1}`);
      headerButton.innerText = faq.question;

      cardHeader.appendChild(headerButton);
      card.appendChild(cardHeader);

      // Create the card body with the answer
      const cardBody = document.createElement('div');
      cardBody.id = `collapse${index + 1}`;
      cardBody.classList.add('collapse');
      cardBody.setAttribute('aria-labelledby', `faq${index + 1}`);
      cardBody.setAttribute('data-parent', '#faqAccordion');

      const bodyContent = document.createElement('div');
      bodyContent.classList.add('card-body');
      bodyContent.innerText = faq.answer;

      cardBody.appendChild(bodyContent);
      card.appendChild(cardBody);

      // Append the card to the FAQ accordion
      faqAccordion.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching FAQ data:', error);
  }
}
