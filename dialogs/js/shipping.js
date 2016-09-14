/*------------------------------------*\
  #STATE-DROPDOWN
\*------------------------------------*/

var states = "AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY";
states = states.split(" ");

var select = document.getElementById("state");

for (var i = 0; i < states.length; i++) {
  var option = document.createElement("option");
  option.text = states[i];
  select.add(option);
}





/*------------------------------------*\
  #CONSTRAINT-VALIDATION-API
\*------------------------------------*/

/* validator functions */
var validator = {};

validator.isEmailAddress = function(input) {
  if (input.search("@") < 0 || input.search("@") == input.length - 1) {
    return false;
  } return true;
}
validator.isPhoneNumber = function(input) {
  var arr = input.split("-");
  var str = arr.join("");
  if (str[0] === "1" || str.length !== 10) {
    return false;
  }
  return true;
}
validator.isZip = function(input) {
  var num = Number(input);
  if (!(isNaN(num)) && input.length === 5) {
    return true;
  }
  return false;
}
validator.withoutSymbols = function(input) {
  var alphaUpper = [65, 90];
  var alphaLower = [97, 122];
  var num = [48, 57];
  var result = [];
  for(var i = 0; i < input.length; i++) {
    var charCode = input.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90 || charCode >= 97 && charCode <= 122 || charCode >= 48 && charCode <= 57 || charCode === 32 || charCode === 44) {
      result.push(input[i]);
    }
  }
  return result.join("");
}
validator.isCreditCard = function(input) {
  var num = validator.withoutSymbols(input);
  if (num.length === 16) {
    return true;
  } return false;
}
validator.isCardMonth = function(input) {
  var num = Number(input);
  if (num > 0 && num <= 12) {
    return true;
  }
  return false;
}
validator.isCardYear = function(input) {
  var num = Number(input);
  if (num > 12) {
    return false;
  } return true;
}
validator.isCardCVC = function(input) {
  var num = Number(input);
  if (!(isNaN(num)) && input.length === 3) {
    return true;
  }
  return false;
}
validator.isYearAfter = function(input) {
  var num = Number(input);
  if ((isNaN(num)) || input.length !== 2) {
    return false
  }
  var inputYear = input;
  var currentYear = new Date().getFullYear().toString();
  currentYear = Number(currentYear.slice(2));
  if (inputYear < currentYear) {
    return false;
  } 
  return true;
}
validator.isEmpty = function(input) {
  if ( !(typeof input === "string") ) {
    return false;
  } else if (input.trim().length === 0) {
    return true;
  } return false;
}

// target elements
var form = document.getElementById("js-checkout-form");
var firstName = document.getElementById("first");
var lastName = document.getElementById("last");
var nameOnCard = document.getElementById("name-on-card");
var emailAddress = document.getElementById("email");
var phoneNumber = document.getElementById("phone");
var address = document.getElementById("address");
var city = document.getElementById("city");
var state = document.getElementById("state");
var postalCode = document.getElementById("zip");
var creditCard = document.getElementById("card-number");
var cardMonth = document.getElementById("card-month");
var cardYear = document.getElementById("card-year");
var cardCVC = document.getElementById("card-cvc");


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
warn(nameOnCard, "Name is required")

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
errorCheck(postalCode, "Please provide a 5 digit zip code", validator.isZip);
errorCheck(creditCard, "Enter a 16-digit number", validator.isCreditCard);
errorCheck(cardMonth, "MM", validator.isCardMonth);
errorCheck(cardYear, "YY", validator.isYearAfter);
errorCheck(cardCVC, "Enter a 3-digit number", validator.isCardCVC);

// live check select input 
function inputCheck(input) {
  state.addEventListener("input", function(event) {
    clearError(state);
  })
}
inputCheck(state);

// clear errors
function clearError(value) {
    value.classList.remove("text-field__floating-label--warn");
    value.classList.remove("text-field__input--warn");
    value.parentNode.querySelector(":scope > .js-input__helper").classList.remove("text-field__helper--warn");
    value.parentNode.querySelector(":scope > .js-input__helper").textContent = "";
}
// add errors
function addError(value, message) {
    value.classList.add("text-field__floating-label--warn");
    value.classList.add("text-field__input--warn");
    value.parentNode.querySelector(":scope > .js-input__helper").classList.add("text-field__helper--warn");
    value.parentNode.querySelector(":scope > .js-input__helper").textContent = message;
}

// bulk check shipping form on submit
function validateForm(input) {

  input.addEventListener("submit", function(event) {

    event.preventDefault();

    // check first name
    if (validator.isEmailAddress(emailAddress.value)) {
      clearError(emailAddress);
    } else {
      addError(emailAddress, "Email address is required");
    }
    // check first name
    if (validator.isPhoneNumber(phoneNumber.value)) {
      clearError(phoneNumber);
    } else {
      addError(phoneNumber, "Phone number is required");
    }
    // check first name
    if (firstName.value.length >= 2) {
      clearError(firstName);
    } else {
      addError(firstName, "First name is required");
    }
    // check last name
    if (lastName.value.length >= 2) {
      clearError(lastName);
    } else {
      addError(lastName, "Last name is required");
    }
    // check address
    if (address.value.length >= 2) {
      clearError(address);
    } else {
      addError(address, "Address is required");
    }
    // check city
    if (city.value.length >= 2) {
      clearError(city);
    } else {
      addError(city, "City is required");
    }
    // check zip
    if (validator.isZip(postalCode.value)) {
      clearError(postalCode);
    } else {
      addError(postalCode, "Please provide a 5 digit zip code");
    }
    // check state
    if (!(validator.isEmpty(state.value))) {
      clearError(state);
    } else {
      addError(state, "State is required");
    }
    // check name on card
    if (nameOnCard.value.length >= 2) {
      clearError(nameOnCard);
    } else {
      addError(nameOnCard, "Name is required");
    }
    // check card number
    if (validator.isCreditCard(creditCard.value)) {
      clearError(creditCard);
    } else {
      addError(creditCard, "Please provide a 16-digit number");
    }
    // check card month
    if (validator.isCardMonth(cardMonth.value)) {
      clearError(cardMonth);
    } else {
      addError(cardMonth, "MM");
    }
    // check card year
    if (validator.isYearAfter(cardYear.value)) {
      clearError(cardYear);
    } else {
      addError(cardYear, "YY");
    }
     // check card cvc
    if (validator.isCreditCard(cardCVC.value)) {
      clearError(cardCVC);
    } else {
      addError(cardCVC, "Please provide a 3-digit number");
    }

  })
}
validateForm(form);

