var numpad = document.getElementsByClassName("keys");
var display = document.getElementById("display").firstChild;

var a = "";
var b = "";
var operator = null;
var dot = null;

var calc = function(input) {
  if ((input >= 0 && input <= 9 || input === "+/-" || input === "%" || input === ".") && operator === null) {
    if (input === "+/-") {
      a *= -1;
      display.innerHTML = Number(a);
    }
    if (input === "%") {
      a /= 100;
      display.innerHTML = Number(a);
      a = "";
    }
    if (input === "." && dot === null) {
      a += input;
      display.innerHTML = a;
      dot = 1;
    }
    if (input >= 0 && input <= 9) {
      a += input;
      display.innerHTML = Number(a);
    }
  }
  if (input === "*" || input === "/" || input === "+" || input === "-") {
    operator = input;
    display.innerHTML = operator;
    dot = null;
  }
  if ((input >= 0 && input <= 9 || input === "+/-" || input === "%" || input === ".") && operator !== null) {
    if (input === "+/-") {
      b *= -1;
      display.innerHTML = Number(b);
    }
    if (input === "%") {
      b /= 100;
      display.innerHTML = Number(b);
    }
    if (input === "." && dot === null) {
      b += input;
      display.innerHTML = b;
      dot = 1;
    }
    if (input >= 0 && input <= 9) {
      b += input;
      display.innerHTML = Number(b);
    }
  }
  if (input === "=") {
    display.innerHTML = result(operator);
    clear();
  }
  if (input === "C") {
    clear();
    display.innerHTML = 0;
  }
}

var clear = function() {
  a = "";
  b = "";
  operator = null;
  dot = null;
}

var result = function(input) {
  switch(input) {
    case "+":
      return +(Number(a) + Number(b)).toFixed(2);
      break;
    case "-":
      return +(Number(a) - Number(b)).toFixed(2);
      break;
    case "*":
      return +(Number(a) * Number(b)).toFixed(2);
      break;
    case "/":
      return +(Number(a) / Number(b)).toFixed(2);
      break;
  }
}


for (var i = 0; i < numpad.length; i++) {
  numpad[i].addEventListener('click', function() {
    calc(this.childNodes[0].innerHTML);
  });
}





