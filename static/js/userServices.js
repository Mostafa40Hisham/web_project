const userId = localStorage.getItem("userId");

function deleteUser(user_Id) {
  if (user_Id !== userId) {
    fetch(`http://127.0.0.1:5000/deleteUser/${user_Id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error || "Failed to delete user");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        alert(data.message);
        // Optionally, update the UI or refresh the user list
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert(error.message || "An error occurred while deleting the user.");
      });
  } else {
    alert("You can't delete this user.");
  }
}
