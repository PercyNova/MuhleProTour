// Function to load employee data from the JSON file
function loadEmployeeData() {
    // Replace 'employeeData.json' with the actual path to your JSON file
    fetch('/json/employee.json')
        .then(response => response.json())  // Parse the JSON data
        .then(data => {
            const employeeList = document.getElementById('employee-list');
            data.forEach(employee => {
                const employeeCard = document.createElement('div');
                employeeCard.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4');
                
                employeeCard.innerHTML = `
                    <div class="employee-card">
                        <div class="profile-pic">
                            <img src="/img/pichold.jpg" alt="${employee.name}">
                        </div>
                        <h3>${employee.name}</h3>
                        <p class="goal">${employee.goal}</p>
                        <p class="occupation">${employee.occupation}</p>
                    </div>
                `;
                
                employeeList.appendChild(employeeCard);
            });
        })
        .catch(error => console.error('Error loading the JSON data:', error));
}

// Load employee data when the page is ready
window.onload = loadEmployeeData;
