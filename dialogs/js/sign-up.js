/*------------------------------------*\
  #CONSTRAINT-VALIDATION-API
\*------------------------------------*/

var signupForm = document.getElementById("signup");
var fullName = document.getElementById("full-name")
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

// live check full name
function warn(element, message) {
  element.addEventListener("blur", function(event) {
    if (this.value.length < 1 || element.value.length >= 2) {
      this.classList.remove("text-field__floating-label--warn");
      this.classList.remove("text-field__input--warn");
      this.parentNode.querySelector(":scope > .js-input__helper").classList.remove("text-field__helper--warn");
      this.parentNode.querySelector(":scope > .js-input__helper").textContent = "";
    }
    if (element.value.length > 0 && element.value.length < 2) {
      this.classList.add("text-field__floating-label--warn");
      this.classList.add("text-field__input--warn");
      this.parentNode.querySelector(":scope > .js-input__helper").classList.add("text-field__helper--warn");
      this.parentNode.querySelector(":scope > .js-input__helper").textContent = message;
    }
  })
};
warn(fullName, "Full name is required");

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
function validateSignup(input) {

  input.addEventListener("submit", function(event) {

    event.preventDefault();

     if (fullName.value.length >= 2) {
      fullName.classList.remove("text-field__floating-label--warn");
      fullName.classList.remove("text-field__input--warn");
      fullName.parentNode.querySelector(":scope > .js-input__helper").classList.remove("text-field__helper--warn");
      fullName.parentNode.querySelector(":scope > .js-input__helper").textContent = "";
    } else {
      fullName.classList.add("text-field__floating-label--warn");
      fullName.classList.add("text-field__input--warn");
      fullName.parentNode.querySelector(":scope > .js-input__helper").classList.add("text-field__helper--warn");
      fullName.parentNode.querySelector(":scope > .js-input__helper").textContent = "Full name is required";
    }

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
validateSignup(signupForm);
