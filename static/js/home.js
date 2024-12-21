const homeDiv = document.getElementById("homeDiv");
const logged = localStorage.getItem("logged");

fetch("http://127.0.0.1:5000/books")
  .then((response) => response.json())
  .then((books) => {
    console.log(books);
    books.map((book) => {
      const card = `
        <div
          style="
            background-color: white;
            border: 0px solid #ddd;
            border-radius: 10px;
            padding: 15px;
            margin: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 250px;
            height: 350px;///////////
            background-color: #fff;
            transition:.3s;
          "
          onmouseover="this.style.transform='translateY(10px)';"
          onmouseout="this.style.transform='translateY(0)';"
        >
          <img
            src="${book.bookImage}"
            alt="${book.bookTitle}"
            style="
              width: 100%;
              height: 150px;
              object-fit: cover;
              border-radius: 10px;
              margin-bottom: 10px;
            "
          />
          <h3
            style="
              font-size: 1.2rem;
              color: #333;
              margin-bottom: 8px;
            "
          >
            ${book.bookTitle}
          </h3>
          <p
            style="
              font-size: 0.9rem;
              color: #555;
              margin-bottom: 8px;
            "
          >
            Author: ${book.bookAuthor}
          </p>
          <p
            style="
              font-size: 0.9rem;
              color: #555;
              margin-bottom: 15px;
            "
          >
            Price: $${book.price}
          </p>
          <button
            style="
              padding: 10px 15px;
              background-color: #007bff;
              color: white;
              border: none;
              border-radius: 5px;
              font-size: 1rem;
              cursor: pointer;
              transition: background-color 0.3s ease;
              box-shadow: inset 0px 0px 5px white;/////////////
            "
            id="readButton"
            onmouseover="this.style.backgroundColor='#0056b3'"
            onmouseout="this.style.backgroundColor='#007bff'"
            onclick="handleReadButtonClick('${book.bookPdf}')"
          >
            Read Me
          </button>
        </div>
      `;
      homeDiv.innerHTML += card;
    });
  })
  .catch((error) => {
    console.error("Error:", error);
    alert("An error occurred while fetching books. Please try again later.");
  });

function handleReadButtonClick(bookPdfLink) {
  if (logged === "true") {
    // User is logged in, open the book PDF link in a new tab
    window.open(bookPdfLink, '_blank');
  } else {
    // User is not logged in, show an alert and redirect to login page
    alert("You must log in to read this book.");
    window.location.href = "/login"; // Redirect to login page
  }
}
