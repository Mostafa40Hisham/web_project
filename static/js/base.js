const loggedIn = localStorage.getItem("logged") === "true";
document.addEventListener("DOMContentLoaded", () => {
  // Select the login and sign-up navigation buttons
  const loginNavButton = document.getElementById("loginNavButton");
  const signUpNavButton = document.getElementById("signUpNavButton");

  if (loginNavButton && signUpNavButton) {
    if (loggedIn) {
      // User is logged in: Update the sign-up button to "Profile"
      signUpNavButton.textContent = "Profile";
      signUpNavButton.parentElement.setAttribute("href", "/profile");

      // Update login button to "Log Out"
      loginNavButton.textContent = "Log Out";
      loginNavButton.onclick = () => {
        // Log the user out
        localStorage.removeItem("logged");
        localStorage.removeItem("userId");
        alert("You have logged out.");
        window.location.href = "/login"; // Redirect to login page
      };
    } else {
      // User is not logged in: Set default behavior
      signUpNavButton.textContent = "Sign Up";
      signUpNavButton.parentElement.setAttribute("href", "/signup");

      loginNavButton.textContent = "Login";
      loginNavButton.onclick = () => {
        window.location.href = "/login"; // Redirect to login page
      };
    }
  }
});

document.getElementById("servicesButton").addEventListener("click",()=>{
  if(!loggedIn){
    alert("you can't access this page without log in")
    window.location.href = "/login"; // Redirect to login page
  }else{
    window.location.href = "/services"
  }
});
