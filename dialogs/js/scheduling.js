


// Set time value as today
var date = new Date();

var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = year + "-" + month + "-" + day + "T00:00";       
document.getElementById("date").value = today;


/* validator functions */
var validator = {};
// date is before today
validator.isBeforeToday = function(input) {
  input = new Date(input);
  if (input < new Date()) {
    return true;
  } return false;
}


/*------------------------------------*\
  #CONSTRAINT-VALIDATION-API
\*------------------------------------*/

var dateInput = document.getElementById("date");
var schedulerForm = document.getElementById("js-scheduler");

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
