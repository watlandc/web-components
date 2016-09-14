/*------------------------------------*\
  #CONSTRAINT-VALIDATION-API
\*------------------------------------*/

var loginForm = document.getElementById("login");
var emailAddress = document.getElementById("email");
var passwordInput = document.getElementById("password");

// validator functions
var validator = {};

// email address
validator.isEmailAddress = function(input) {
  if (input.search("@") < 0 || input.search("@") == input.length - 1) {
    return false;
  } return true;
}


// live check email
function errorCheck(input, message, callback) {
  input.addEventListener("blur", function(event) {
    if (callback(input.value) || this.value.length < 1) {
      this.classList.remove("text-field__floating-label--warn");
      this.classList.remove("text-field__input--warn");
      this.parentNode.querySelector(":scope > .js-input__helper").classList.remove("text-field__helper--warn");
      this.parentNode.querySelector(":scope > .js-input__helper").textContent = "";
    } else {
      this.classList.add("text-field__floating-label--warn");
      this.classList.add("text-field__input--warn");
      this.parentNode.querySelector(":scope > .js-input__helper").classList.add("text-field__helper--warn");
      this.parentNode.querySelector(":scope > .js-input__helper").textContent = message;
    }
  })
};
errorCheck(emailAddress, "Please provide a valid email address", validator.isEmailAddress);


// live check password
function validatePassword(input, message) {

  input.addEventListener("blur", function(event) {
    if (this.value.length < 1 || input.value.length >= 8) {
      this.classList.remove("text-field__floating-label--warn");
      this.classList.remove("text-field__input--warn");
      this.parentNode.querySelector(":scope > .js-input__helper").classList.remove("text-field__helper--warn");
      this.parentNode.querySelector(":scope > .js-input__helper").textContent = "";
    }
    if (input.value.length > 0 && input.value.length < 8) {
      this.classList.add("text-field__floating-label--warn");
      this.classList.add("text-field__input--warn");
      this.parentNode.querySelector(":scope > .js-input__helper").classList.add("text-field__helper--warn");
      this.parentNode.querySelector(":scope > .js-input__helper").textContent = message;
    }
  })
};
validatePassword(passwordInput, "Password must have at least 8 characters");



// bulk check form on submit
function validateLogin(input) {

  input.addEventListener("submit", function(event) {

    event.preventDefault();

    // check password
    if (passwordInput.value.length >= 8) {
      passwordInput.classList.remove("text-field__floating-label--warn");
      passwordInput.classList.remove("text-field__input--warn");
      passwordInput.parentNode.querySelector(":scope > .js-input__helper").classList.remove("text-field__helper--warn");
      passwordInput.parentNode.querySelector(":scope > .js-input__helper").textContent = "";
    } else {
      passwordInput.classList.add("text-field__floating-label--warn");
      passwordInput.classList.add("text-field__input--warn");
      passwordInput.parentNode.querySelector(":scope > .js-input__helper").classList.add("text-field__helper--warn");
      passwordInput.parentNode.querySelector(":scope > .js-input__helper").textContent = "Password must have at least 8 characters";
    }

    // check email
    if (validator.isEmailAddress(emailAddress.value)) {
      emailAddress.classList.remove("text-field__floating-label--warn");
      emailAddress.classList.remove("text-field__input--warn");
      emailAddress.parentNode.querySelector(":scope > .js-input__helper").classList.remove("text-field__helper--warn");
      emailAddress.parentNode.querySelector(":scope > .js-input__helper").textContent = "";
    } else {
      emailAddress.classList.add("text-field__floating-label--warn");
      emailAddress.classList.add("text-field__input--warn");
      emailAddress.parentNode.querySelector(":scope > .js-input__helper").classList.add("text-field__helper--warn");
      emailAddress.parentNode.querySelector(":scope > .js-input__helper").textContent = "Please provide a valid email address";
    }
  })

  
  
}
validateLogin(loginForm);
