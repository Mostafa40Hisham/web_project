document.getElementById("singUpButton")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting until validation is successful
    if (validationSign()) {
      // Get the email from the input field
      const email = document.getElementById("emailinput").value;

      // Fetch the list of existing users to get the highest ID
      fetch("http://127.0.0.1:5000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => {
          // Get the highest ID from the current users
          let highestId = 0;
          if (data.length > 0) {
            highestId = Math.max(...data.map((user) => user.id)); // Get the highest ID
          }

          // Generate a new unique ID for the new user
          const newUserId = highestId + 1;

          // Check if the email already exists
          const emailExists = data.some((user) => user.email === email);

          if (emailExists) {
            alert("Email already exists. Please choose a different email.");
          } else {
            // Email doesn't exist, proceed with adding the user
            const formData = {
              id: newUserId, // Assign the new ID
              first_name: document.getElementById("fnameinput").value,
              last_name: document.getElementById("lnameinput").value,
              email: email,
              phone: document.getElementById("phoneinput").value,
              password: document.getElementById("passwordinput").value,
              gender: document.getElementById("genderinput").value,
              birthdate: document.getElementById("birthdateinput").value,
            };

            // Submit the form data to the backend to add the user
            fetch("http://127.0.0.1:5000/add_user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            })
              .then((response) => response.json()) // Parse the JSON response
              .then((data) => {
                if (data.success) {
                  alert("Sign up successful!");
                  window.location.href = "/login"; // Redirect to a success page
                } else {
                  alert("Sign up failed: " + data.message);
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  });

function validationSign() {
  const fnameinput = document.getElementById("fnameinput");
  const lnameinput = document.getElementById("lnameinput");
  const emailinput = document.getElementById("emailinput");
  const phoneinput = document.getElementById("phoneinput");
  const passwordinput = document.getElementById("passwordinput");
  const password2input = document.getElementById("password2input");
  const genderinput = document.getElementById("genderinput");
  const birthdateinput = document.getElementById("birthdateinput");

  // Regular expressions for validation
  const namePattern = /^[A-Z][a-z]{2,}$/; // First letter capitalized, no spaces, at least 3 chars
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^[0-9]{11}$/; // Assuming phone numbers must be 11 digits long
  const passwordPattern = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/; // At least 6 chars and includes special char

  // Validation checks
  let valid = true;

  // Check first name
  if (!namePattern.test(fnameinput.value)) {
    fnameinput.style.borderColor = "red";
    valid = false;
  } else {
    fnameinput.style.borderColor = "";
  }

  // Check last name
  if (!namePattern.test(lnameinput.value)) {
    lnameinput.style.borderColor = "red";
    valid = false;
  } else {
    lnameinput.style.borderColor = "";
  }

  // Check email
  if (!emailPattern.test(emailinput.value)) {
    emailinput.style.borderColor = "red";
    valid = false;
  } else {
    emailinput.style.borderColor = "";
  }

  // Check phone
  if (!phonePattern.test(phoneinput.value)) {
    phoneinput.style.borderColor = "red";
    valid = false;
  } else {
    phoneinput.style.borderColor = "";
  }

  // Check password
  if (!passwordPattern.test(passwordinput.value)) {
    passwordinput.style.borderColor = "red";
    valid = false;
  } else {
    passwordinput.style.borderColor = "";
  }

  // Check if passwords match
  if (passwordinput.value !== password2input.value) {
    password2input.style.borderColor = "red";
    valid = false;
  } else {
    password2input.style.borderColor = "";
  }

  // Check gender
  if (!genderinput.value) {
    genderinput.style.borderColor = "red";
    valid = false;
  } else {
    genderinput.style.borderColor = "";
  }

  // Check birthdate
  if (!birthdateinput.value) {
    birthdateinput.style.borderColor = "red";
    valid = false;
  } else {
    birthdateinput.style.borderColor = "";
  }

  return valid;
}

function display(label, text) {
  label.innerHTML = "Invalid " + text;
  label.style.color = "red";
}

function redisplay(label, text) {
  label.innerHTML = text;
  label.style.color = "blue";
}

