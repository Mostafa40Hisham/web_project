// Set a cookie function
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Get a cookie function
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

// Login button event listener
document.querySelector("#logInButton").addEventListener("click", function (event) {
  event.preventDefault();

  // Get user input values
  const emailInput = document.querySelector("#emailInput").value.trim();
  const passwordInput = document.querySelector("#passwordInput").value.trim();
  const rememberMe = document.querySelector("#rememberMe").checked;

  // Fetch the list of users from the server
  fetch("http://127.0.0.1:5000/users")
    .then((response) => response.json())
    .then((users) => {
      // Check if user exists
      const user = users.find(
        (u) => u.email === emailInput && u.password == passwordInput
      );

      if (user) {
        // Save login status in localStorage
        localStorage.setItem("logged", true);
        localStorage.setItem("userId", user.id);

        // If "Remember Me" is checked, store login details in cookies
        if (rememberMe) {
          setCookie('userEmail', emailInput, 7);  // Store for 7 days
          setCookie('userPassword', passwordInput, 7);  // Store for 7 days
        }

        // Redirect to the home page
        alert("Login successful!");
        window.location.href = "/";
      } else {
        alert("Invalid email or password. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while logging in. Please try again.");
    });
});

// Auto-login if cookies exist
window.onload = function() {
  const storedEmail = getCookie('userEmail');
  const storedPassword = getCookie('userPassword');

  if (storedEmail && storedPassword) {
    // Optionally check the stored credentials with your backend
    fetch("http://127.0.0.1:5000/users")
      .then((response) => response.json())
      .then((users) => {
        const user = users.find(
          (u) => u.email === storedEmail && u.password == storedPassword
        );
        if (user) {
          localStorage.setItem("logged", true);
          localStorage.setItem("userId", user.id);
          window.location.href = "/";  // Redirect to home
        }
      });
  }
};
