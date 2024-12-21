document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const data = {
      first_name: document.getElementById('firstName').value,
      last_name: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      password: document.getElementById('password').value,
      gender: document.getElementById('gender').value,
      birthdate: document.getElementById('birthdate').value,
    };
  
    // Fetch the highest ID from the existing users
    fetch("http://127.0.0.1:5000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((users) => {
        // Get the highest ID from the current users
        let highestId = 0;
        if (users.length > 0) {
          highestId = Math.max(...users.map((user) => user.id)); // Get the highest ID
        }
  
        // Now, create a new user with an incremented ID based on the highest ID
        const newUserId = highestId + 1;
  
        // Add the new ID to the user data
        data.id = newUserId;
  
        // Proceed with the POST request to add the user with the new ID
        fetch('http://127.0.0.1:5000/add_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert("User added successfully!");
              // Optionally reset the form and redirect
              window.location.href = "/userServices";
            } else {
              alert("Error adding User.");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while adding the user.");
          });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        alert("An error occurred while fetching users.");
      });
  });
  