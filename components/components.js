/*------------------------------------*\
  #APP-BAR-SEARCH-STATE
\*------------------------------------*/


// add .app-bar--search styling in search state
var search = document.querySelector(".js-search");

search.addEventListener('click', function() {
  document.querySelector(".js-app-bar").classList.add("app-bar--search");
  // increase elevation on search focus
  document.querySelector(".js-search").classList.add("search--focus");
  // hide body content when searching
  document.querySelector(".js-content").classList.add("is-hidden");
});

// enter search state using the search button
var searchMobile = document.querySelector(".js-btn--search");

searchMobile.addEventListener('click', function() {
  document.querySelector(".js-app-bar").classList.add("app-bar--search");
  document.querySelector(".js-search").classList.add("search--focus");
  document.querySelector(".js-content").classList.add("is-hidden");
});

// exist search state
var back = document.querySelector(".js-buttons-inline--left");

back.addEventListener('click', function() {
  document.querySelector(".js-app-bar").classList.remove("app-bar--search");
  document.querySelector(".js-search-input").value = "";
  document.querySelector(".js-content").classList.remove("is-hidden");
});

// lower search elevation on blur
var removeSearchFocus = document.querySelector(".js-buttons-inline--left");

removeSearchFocus.addEventListener('click', function(event) {
  document.querySelector(".js-search").classList.remove("search--focus");
});





/*------------------------------------*\
  #NAVIGATION-DRAWER
\*------------------------------------*/

$(".js-menu-button").on("click", function() {

  // toggle mobile drawer when < 750px
  var windowWidth = $(window).width();
  if (windowWidth <= 750) {
    // remove close that was added by mobile close
    $(".js-drawer").removeClass("is-closed--mobile is-closed--desktop").addClass("is-open--mobile");
    // hide margin so media query doesn't open it
    $(".js-content").addClass("is-no-margin");
    $(".js-drawer__transparency").addClass("drawer__transparency");
  }
  
  // toggle side nav > 750
  if (windowWidth > 750) {
    // was mobile close used?
    if ($(".js-drawer").hasClass("is-closed--mobile")) {
      // if so remove it
      $(".js-drawer").removeClass("is-closed--mobile");
      // remove margin hide class created by mobile open
      $(".js-content").removeClass("is-no-margin");
    // if mobile close wasn't added toggle drawer
    } else {
      $(".js-drawer").toggleClass("is-closed--desktop");
      $(".js-content").toggleClass("is-no-margin");
    }
  } 
});  
     
// close mobile drawer

$(".drawer__title-bar").on("click", function() {
  // Click back arrow to close mobile drawer
  $(".js-drawer").addClass("is-closed--mobile").removeClass("is-open--mobile");
  $(".js-drawer__transparency").removeClass("drawer__transparency");
});
$(".js-drawer__transparency").on("click", function() {
  // Click transparent background to close mobile drawer
  $(".js-drawer").addClass("is-closed--mobile").removeClass("is-open--mobile");
  $(this).removeClass("drawer__transparency");
});





/*------------------------------------*\
  #SELECTION-CONTROLS
\*------------------------------------*/

// State dropdown
var states = "AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY";
states = states.split(" ");

var select = document.getElementById("state");

for (var i = 0; i < states.length; i++) {
  var option = document.createElement("option");
  option.text = states[i];
  select.add(option);
}

// Set today as the minimum date
// var date = new Date();

// var day = date.getDate();
// var month = date.getMonth() + 1;
// var year = date.getFullYear();

// if (month < 10) month = "0" + month;
// if (day < 10) day = "0" + day;

// var today = year + "-" + month + "-" + day;       
// document.getElementById("date").min = today;



// Set time value as today
var date = new Date();

var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = year + "-" + month + "-" + day + "T00:00";       
document.getElementById("date").value = today;





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


