document.addEventListener("DOMContentLoaded", () => {
  const bookId = +localStorage.getItem("BookId");

  // Fetch book details to populate the form
  fetch(`http://127.0.0.1:5000/getBooks/${bookId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Populate the form fields with the fetched data
      document.getElementById("bookTitle").value = data.bookTitle;
      document.getElementById("bookAuthor").value = data.bookAuthor;
      document.getElementById("bookWriter").value = data.bookWriter;
      document.getElementById("category").value = data.category;
      document.getElementById("price").value = data.price;
      document.getElementById("bookDescription").value = data.bookDescription;
      document.getElementById("bookImage").value = data.bookImage;
      document.getElementById("bookPdf").value = data.bookPdf;
    })
    .catch((error) => console.error("Error fetching book data:", error));
});

// Handle the update button click
document.getElementById("updateBookForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const bookId = +localStorage.getItem("BookId");

  // Collect updated data from the form fields
  const updatedData = {
    bookTitle: document.getElementById("bookTitle").value,
    bookAuthor: document.getElementById("bookAuthor").value,
    bookWriter: document.getElementById("bookWriter").value,
    category: document.getElementById("category").value,
    price: document.getElementById("price").value,
    bookDescription: document.getElementById("bookDescription").value,
    bookImage: document.getElementById("bookImage").value,
    bookPdf: document.getElementById("bookPdf").value,
  };

  // Send the PATCH request to update the book
  fetch(`http://127.0.0.1:5000/updateBooks/${bookId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData), // Send updated data as JSON
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert(data.message); // Show success message
        window.location.href = "/";
      } else {
        alert("Error updating book: " + (data.error || "Unknown error"));
      }
    })
    .catch((error) => console.error("Error updating book:", error));
});
