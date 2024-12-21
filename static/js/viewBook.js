document.addEventListener("DOMContentLoaded", () => {
    const bookId = +localStorage.getItem("BookId");
  
    // Fetch book details
    fetch(`http://127.0.0.1:5000/getBooks/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const bookDetails = document.getElementById("bookDetails");
  
        // Display the book details
        bookDetails.innerHTML = `
          <h1 style="color: #333; text-align: center; font-size: 24px; margin-bottom: 20px;">${data.bookTitle}</h1>
          <p style="color: #666; font-size: 16px; line-height: 1.6;"><strong>Author:</strong> ${data.bookAuthor}</p>
          <p style="color: #666; font-size: 16px; line-height: 1.6;"><strong>Writer:</strong> ${data.bookWriter}</p>
          <p style="color: #666; font-size: 16px; line-height: 1.6;"><strong>Category:</strong> ${data.category}</p>
          <p style="color: #666; font-size: 16px; line-height: 1.6;"><strong>Price:</strong> $${data.price}</p>
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;"><strong>Description:</strong> ${data.bookDescription}</p>
          <div style="text-align: center;">
            <img src="${data.bookImage}" alt="${data.bookTitle}" style="width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
          </div>
          <div style="text-align: center;">
            <a href="${data.bookPdf}" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; background-color: #007bff; color: white; text-decoration: none; border-radius: 25px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); transition: background-color 0.3s;">
              Read PDF
            </a>
          </div>
        `;
        // Add hover effect for the button
        const link = bookDetails.querySelector("a");
        link.addEventListener("mouseover", () => {
          link.style.backgroundColor = "#0056b3";
        });
        link.addEventListener("mouseout", () => {
          link.style.backgroundColor = "#007bff";
        });
      })
      .catch((error) => console.error("Error fetching book data:", error));
  });
  