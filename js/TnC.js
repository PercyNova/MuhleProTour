document.addEventListener('DOMContentLoaded', () => {
  const tncLink = document.getElementById('tncLink');
  const tncModal = document.getElementById('tncModal');
  const closeTnc = document.getElementById('closeTnc');
  const overlay = document.getElementById('overlay');
  let tncDataLoaded = false;

  if (tncLink && tncModal && closeTnc && overlay) {
      // Show TNC modal
      tncLink.addEventListener('click', async (event) => {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });

          setTimeout(() => {
              overlay.style.display = 'block';
              tncModal.style.display = 'block';
              document.body.style.overflow = 'hidden'; // Lock scrolling
          }, 500);

          // Load TNC data only once
          if (!tncDataLoaded) {
              await loadTNCContent();
              tncDataLoaded = true;
          }
      });

      // Close TNC modal
      const closeTNCModal = () => {
          tncModal.style.display = 'none';
          overlay.style.display = 'none';
          document.body.style.overflow = 'auto'; // Enable scrolling
      };

      closeTnc.addEventListener('click', closeTNCModal);
      overlay.addEventListener('click', (event) => {
          if (event.target === overlay) {
              closeTNCModal();
          }
      });
  }
});

async function loadTNCContent() {
    try {
        const response = await fetch('/json/TnC.json'); // Replace with your actual JSON file path
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tncData = await response.json();

        // Create the main container for accordion
        const tncAccordion = document.createElement('div');
        tncAccordion.classList.add('accordion');
        tncAccordion.id = 'tncAccordion';

        // Create sticky header container for h2 and close button only
        const stickyHeaderContainer = document.createElement('div');
        stickyHeaderContainer.classList.add('tnc-header-sticky');

        // Add the header content (only h2 and close button)
        const headerContent = document.createElement('div');
        headerContent.classList.add('tnc-header');
        headerContent.innerHTML = `
            <h2>${tncData.title}</h2>
        `;

        // Create close button
        const closeButton = document.createElement('button');
        closeButton.id = 'closeTnc';
        closeButton.innerHTML = 'X';

        // Attach the close event to the dynamically created button
        closeButton.addEventListener('click', () => {
            const tncModal = document.getElementById('tncModal');
            const overlay = document.getElementById('overlay');
            tncModal.style.display = 'none';
            overlay.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling
        });

        stickyHeaderContainer.appendChild(headerContent);
        stickyHeaderContainer.appendChild(closeButton);

        // Create the rest of the content (title, lastUpdated, welcome) in the scrollable div
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('tnc-content');
        contentDiv.innerHTML = `
            <p><strong>Last Updated:</strong> ${tncData.lastUpdated}</p>
            <p>${tncData.welcome}</p>
        `;

        // Create accordion items for each section
        tncData.sections.forEach((section, index) => {
            const card = document.createElement('div');
            card.classList.add('card');

            // Create card header
            const cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            cardHeader.id = `tnc${index + 1}`;

            const headerButton = document.createElement('button');
            headerButton.classList.add('btn', 'btn-link');
            headerButton.setAttribute('type', 'button');
            headerButton.setAttribute('data-toggle', 'collapse');
            headerButton.setAttribute('data-target', `#tncCollapse${index + 1}`);
            headerButton.setAttribute('aria-expanded', 'false');
            headerButton.setAttribute('aria-controls', `tncCollapse${index + 1}`);
            headerButton.innerText = `${index + 1}. ${section.title}`;

            cardHeader.appendChild(headerButton);
            card.appendChild(cardHeader);

            // Create card body
            const cardBody = document.createElement('div');
            cardBody.id = `tncCollapse${index + 1}`;
            cardBody.classList.add('collapse');
            cardBody.setAttribute('aria-labelledby', `tnc${index + 1}`);
            cardBody.setAttribute('data-parent', '#tncAccordion');

            const bodyContent = document.createElement('div');
            bodyContent.classList.add('card-body');

            // Add main content if it exists
            if (section.content) {
                bodyContent.innerHTML += `<p>${section.content}</p>`;
            }

            // Add subsections if they exist
            if (section.subsections && section.subsections.length > 0) {
                section.subsections.forEach(subsection => {
                    bodyContent.innerHTML += `
                        <div class="subsection">
                            <strong>${subsection.title}</strong>
                            <div>${subsection.content}</div>
                        </div>
                    `;
                });
            }

            cardBody.appendChild(bodyContent);
            card.appendChild(cardBody);
            tncAccordion.appendChild(card);
        });

        // Clear existing content and append new content
        const tncContent = document.getElementById('tncContent');
        tncContent.innerHTML = '';
        tncContent.appendChild(stickyHeaderContainer);
        tncContent.appendChild(contentDiv);  // Add the content div below the sticky header
        tncContent.appendChild(tncAccordion);

    } catch (error) {
        console.error('Error loading TNC data:', error);
        document.getElementById('tncContent').innerHTML = `
            <h2>Terms and Conditions</h2>
            <p>Sorry, we're having trouble displaying the Terms and Conditions. Please try again later.</p>
        `;
    }
}