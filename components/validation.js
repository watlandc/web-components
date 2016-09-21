/*------------------------------------*\
  #CONSTRAINT-VALIDATION-API
\*------------------------------------*/

/**
 * Full Name
 * Name
 * Email
 * DOB
 * Password
 * Phone
 * Date
 * Input color
 * Postal code
 * Credit card
 * CC (month, year, cvc)
 */


var form = document.querySelectorAll(".js-form");
var firstName = document.getElementById("first");
var lastName = document.getElementById("last");
var fullName = document.getElementById("fullName");
var emailAddress = document.getElementById("email");
var loginEmail = document.getElementById("js-login-email");
var phoneNumber = document.getElementById("phone");
var address = document.getElementById("address");
var address2 = document.getElementById("address2");
var city = document.getElementById("city");
var state = document.getElementById("state");
var postalCode = document.getElementById("zip");
var textArea = document.getElementById("text-area");
var dateInput = document.getElementById("date");
var colorInput = document.getElementById("color")
var creditCard = document.getElementById("credit-card");
var creditCardMonth = document.getElementById("credit-card-month");
var creditCardYear = document.getElementById("credit-card-year");
var creditCardCVC = document.getElementById("credit-card-cvc");

/* validator functions */
var validator = {};
// email address
validator.isEmailAddress = function(input) {
  if (input.search("@") < 0 || input.search("@") == input.length - 1) {
    return false;
  } return true;
}
// sample input "555-555-5555"
validator.isPhoneNumber = function(input) {
  var arr = input.split("-");
  var str = arr.join("");
  if (str[0] === "1" || str.length !== 10) {
    return false;
  }
  return true;
}
// date is before today
validator.isBeforeToday = function(input) {
  input = new Date(input);
  if (input < new Date()) {
    return true;
  } return false;
}

// live check text field
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
warn(firstName, "First name is required");
warn(lastName, "Last name is required");
warn(address, "Address is required");
warn(city, "City is required");

// live check validator function
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
errorCheck(phoneNumber, "Please provide a valid phone number", validator.isPhoneNumber);

// live check date 
function dateCheck(input, message, callback) {
  input.addEventListener("input", function(event) {
    if (callback(input.value) || input.value === "") {
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
dateCheck(dateInput, "Birthdate must be before today", validator.isBeforeToday);
