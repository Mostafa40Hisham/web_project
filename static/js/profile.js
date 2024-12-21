const userId = +localStorage.getItem("userId");

fetch(`http://127.0.0.1:5000/users/${userId}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    // Display the data in the DOM with inline styles
    const userContainer = document.getElementById("user-data");
    userContainer.innerHTML = `
      <div style="border: 1px solid #ddd; border-radius: 10px; padding: 20px; background: #f5f5f5; max-width: 400px; margin: 20px auto; font-family: Arial, sans-serif; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <h2 style="text-align: center; color: #444; margin-bottom: 20px;">User Details</h2>
        <p style="margin: 10px 0; color: #333;"><strong>ID:</strong> ${data.id}</p>
        <p style="margin: 10px 0; color: #333;"><strong> Name:</strong> ${data.first_name} ${data.last_name}</p>
        <p style="margin: 10px 0; color: #333;"><strong>Email:</strong> ${data.email}</p>
        <p style="margin: 10px 0; color: #333;"><strong>Phone Number:</strong> ${data.phone}</p>
        <p style="margin: 10px 0; color: #333;"><strong>Birthdate:</strong> ${data.birthdate}</p>
        <p style="margin: 10px 0; color: #333;"><strong>Gender:</strong> ${data.gender}</p>
      </div>
    `;
  })
  .catch((error) => {
    console.error("Error fetching user data:", error);
  });
