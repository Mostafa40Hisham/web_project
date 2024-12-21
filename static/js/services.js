const deleteBook = async (bookId) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/deleteBooks/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete book");
    }

    const data = await response.json();
    console.log(data.message); // Log success message
    window.location.href = "/";
    alert(data.message); // Show an alert to the user
    // Optionally, refresh the list of books here or remove the book from the UI
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while deleting the book.");
  }
};

const setBookId = (bookId) => localStorage.setItem('BookId', bookId);
