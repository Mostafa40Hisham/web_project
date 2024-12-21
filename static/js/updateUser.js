const user_Id = +localStorage.getItem("user_id");

document.addEventListener("DOMContentLoaded", () => {
  // Fetch user details to populate the form
  fetch(`http://127.0.0.1:5000/users/${user_Id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Populate the form fields with the fetched user data
      document.getElementById("firstName").value = data.first_name;
      document.getElementById("lastName").value = data.last_name;
      document.getElementById("email").value = data.email;
      document.getElementById("phone").value = data.phone;
      document.getElementById("password").value = data.password;
      document.getElementById("gender").value = data.gender;
      document.getElementById("birthdate").value = data.birthdate;
    })
    .catch((error) => console.error("Error fetching user data:", error));
});

// Handle the update button click
const updateForm = document.getElementById("updateUserForm");
updateForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Collect updated data from the form fields
  const updatedUserData = {
    first_name: document.getElementById("firstName").value,
    last_name: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
    gender: document.getElementById("gender").value,
    birthdate: document.getElementById("birthdate").value,
  };

  // Send the PATCH request to update the user
  fetch(`http://127.0.0.1:5000/updateUser/${user_Id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUserData), // Send updated data as JSON
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(data.message); // Show success message
        window.location.href = "/userServices"; // Redirect after success
      } else {
        alert("Error updating user: " + (data.error || "Unknown error"));
      }
    })
    .catch((error) => console.error("Error updating user:", error));
});
