window.addEventListener("load", () => {
  /* Setting Open/Close on Nav Menu Button */
  const menu = document.getElementById("menu");
  if (menu) {
    menu.addEventListener("click", () => {
      const navLinks = document.getElementById("links");
      const text = navLinks.getAttribute("class");
      if (text === "nav-links active") {
        navLinks.classList.remove("active");
      } else {
        navLinks.classList.add("active");
      }
    });
  }

  /* Sign Up Form Submit Function */
  const signUpForm = document.getElementById("signUpForm");
  if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const dataObj = Object.fromEntries(formData.entries());
      window.localStorage.setItem("user_account", JSON.stringify(dataObj));
      alert("Successfully registered. Proceed to login page.");
      e.target.reset();
      window.location.href = "login.html";
    });
  }

  /* Sign In Form Submit Function */
  const signInForm = document.getElementById("signInForm");
  if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const dataObj = Object.fromEntries(formData.entries());
      const savedAccount = JSON.parse(
        window.localStorage.getItem("user_account")
      );

      if (
        savedAccount &&
        dataObj.email == savedAccount.email &&
        dataObj.password == savedAccount.password
      ) {
        alert("Successfully login. Proceed to dashboard page.");
        window.location.href = "dashboard.html";
      } else {
        alert(
          "You input wrong credentials. Login again using correct email or password."
        );
      }
    });
  }

  /* Submitting Withdrawal form to Google Spreadsheet. */
  const withdrawalForm = document.getElementById("withdrawalForm");
  if (withdrawalForm) {
    withdrawalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbyzqXt2CPuzFBE96P0UUqrdVI_AWhYE4swp13lpZlC6fdQFw9_mKQDqepXZuHwLZzaX/exec";
      fetch(scriptURL, { method: "POST", body: new FormData(e.target) })
        .then((response) => {
          if (response.ok) {
            alert("Withdrawal Details successfully saved.");
            e.target.reset();
          } else {
            alert("There's an error occured on submitting form.");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
});
