document.getElementById("submitButton").addEventListener("click", (event) => {
    // Get the form and inputs
    const form = document.querySelector("form");
    const bookTitle = document.getElementById("bookTitle");
    const bookAuthor = document.getElementById("bookAuthor");
    const bookDescription = document.getElementById("bookDescription");
    const category = document.getElementById("category");
    const price = document.getElementById("price");
    const bookImage = document.getElementById("bookImage");
    const bookPdf = document.getElementById("bookPdf");
  
    // Handle form submission
    event.preventDefault(); // Prevent default form submission
  
    // Validate the inputs
    if (
      !bookTitle.value ||
      !bookAuthor.value ||
      !bookDescription.value ||
      !category.value ||
      !price.value ||
      !bookImage.value ||
      !bookPdf.value
    ) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Collect the data from the form
    const formData = {
      bookTitle: bookTitle.value,
      bookAuthor: bookAuthor.value,
      bookDescription: bookDescription.value,
      category: category.value,
      price: parseFloat(price.value),
      bookImage: bookImage.value,
      bookPdf: bookPdf.value,
      bookWriter: bookAuthor.value, // Assuming 'bookWriter' is intended to be 'bookAuthor' based on your original data
    };
  
    // Send data to the server (using fetch as an example)
    fetch("http://127.0.0.1:5000/addBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Book added successfully!");
          // Optionally, reset the form
          window.location.href = "/";
        } else {
          alert("Error adding book.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while adding the book.");
      });
  });
  