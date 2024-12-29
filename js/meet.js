  // Get all elements with the class 'employee-card-container'
  var employeeCardContainers = document.querySelectorAll('.employee-card-container');

  // Add click event listener to each employee card container
  employeeCardContainers.forEach(function (employeeCard) {
      employeeCard.addEventListener('click', function (event) {
          // Close any open emp-info
          document.querySelectorAll('.emp-info').forEach(function (empInfo) {
              empInfo.style.display = 'none';
          });

          // Toggle the display of emp-info when the card is clicked
          var empInfo = this.querySelector('.emp-info');
          empInfo.style.display = (empInfo.style.display === 'none' || empInfo.style.display === '') ? 'block' : 'none';

          // Toggle the 'active' class to change the layout
          this.classList.toggle('active');

          // Adjust the layout of other employee card containers
          employeeCardContainers.forEach(function (otherCard) {
              if (otherCard !== employeeCard) {
                  otherCard.classList.remove('active');
              }
          });

          // Prevent the click event from propagating to the document
          event.stopPropagation();
      });
  });

  // Add a click event listener to the document to handle clicks outside of the active card
  document.addEventListener('click', function () {
      // Close any open emp-info
      document.querySelectorAll('.emp-info').forEach(function (empInfo) {
          empInfo.style.display = 'none';
      });

      // Deactivate the active card
      employeeCardContainers.forEach(function (card) {
          card.classList.remove('active');
      });
  });


         // First, select all the employee cards
        // First, select all the employee cards
        const employeeCards = document.querySelectorAll(".employee-card");

        // Apply saved ratings on page load
        employeeCards.forEach((card, cardIndex) => {
            const savedRating = localStorage.getItem(`rating-${cardIndex}`);
            if (savedRating) {
                const stars = card.querySelectorAll(".stars i");
                stars.forEach((star, starIndex) => {
                    starIndex < savedRating ? star.classList.add("active") : star.classList.remove("active");
                });
            }
        });

        // Then, loop through each card
        employeeCards.forEach((card, cardIndex) => {
            // For each card, select its stars
            const stars = card.querySelectorAll(".stars i");

            // Add event listeners to these stars
            stars.forEach((star, index1) => {
                star.addEventListener("click", () => {
                    stars.forEach((star, index2) => {
                        index1 >= index2 ? star.classList.add("active") : star.classList.remove("active");
                    });

                    // Save the rating to localStorage
                    localStorage.setItem(`rating-${cardIndex}`, index1 + 1);
                });
            });
        });

        // MENU BAR
        var icon = document.getElementById("icon");
        var icon1 = document.getElementById("a");
        var icon2 = document.getElementById("b");
        var icon3 = document.getElementById("c");
    
        $('#navbarNav').on('show.bs.collapse', function() {
            icon1.classList.add('a');
            icon2.classList.add('c');
            icon3.classList.add('b');
        });
    
        $('#navbarNav').on('hide.bs.collapse', function() {
            icon1.classList.remove('a');
            icon2.classList.remove('c');
            icon3.classList.remove('b');
        });

        