/*------------------------------------*\
  #SCROLL-TO-NEXT-PANEL
\*------------------------------------*/

$(document).ready(function() {

  var windowHeight = $(window).height() - 56;

  $(".js-btn--keyboard-arrow-down").on("click", function() {
    $(".js-scroll").animate({scrollTop: windowHeight}, 300);
  });

  $(".js-btn--keyboard-arrow-up").on("click", function() {
    $(".js-scroll").animate({scrollTop: 0}, 300);
  });

});






/*------------------------------------*\
  #GOOGLE-MAPS-CONFIGURATION
\*------------------------------------*/

function initMap() {
  
  // Create a map object and specify the DOM element for display.
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    scrollwheel: false,
    zoom: 16,
    center: {lat: 41.910, lng: -87.690},
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    fullscreenControl: true
  });
  var marker = new google.maps.Marker({
    map: map,
    position: {lat: 41.910, lng: -87.690},
    title: 'Hello World!'
  });
  // Enable scrollwheel on click
  google.maps.event.addListener(map, 'click', function(event){
    this.setOptions({scrollwheel:true});
  });
  // Disable scrollwheel on mouseout
  google.maps.event.addListener(map, 'mouseout', function(event) {
    this.setOptions({scrollwheel: false});
  });
};





/*------------------------------------*\
  #SHOPPING-CART
\*------------------------------------*/


var cartClose = document.getElementById("js-btn--close");
var cartOpen = document.getElementById("js-btn--cart");
var shoppingCart = document.getElementById("js-cart-background");

// close cart dialog
function closeCartDialog(button, element) {
  button.addEventListener("click", function(event) {
    element.classList.add("is-hidden");
  })
}
closeCartDialog(cartClose, shoppingCart);

// close dialog on background click
shoppingCart.addEventListener("click", function(event) {
  var card = document.querySelector(".cart-dialog");
  if (event.target !== card && !card.contains(event.target)) {
    shoppingCart.classList.add("is-hidden");
  }
});

// open cart dialog
function openCartDialog(button, element) {
  button.addEventListener("click", function(event) {
    element.classList.remove("is-hidden");
  })
}
openCartDialog(cartOpen, shoppingCart);

// product object
var Product = function(id, name, description, image, price, quantity, discount) {
  this.id = id;
  this.name = name;
  this.description = description;
  this.image = image;
  this.price = price;
  this.quantity = quantity;
  this.discount = discount;
  this.total = function() { return this.price * this.discount * this.quantity };
};

// menu items
var item1 = new Product("item1", "Potato Leek Soup", "Leak soup is based on potatos, leek, broth, and cream.", "img--soup", 10, 0, 1);
var item2 = new Product("item2", "Mushroom Casserole", "A combination of spinach and mushrooms.", "img--eggs", 10, 0, 1);
var item3 = new Product("item3", "Salmon Salad", "Salad topped with a vinaigrette sauce.", "img--salad", 10, 0, 1);
var item4 = new Product("item4", "Potato Leek Soup", "Leak soup is based on potatos, leek, broth, and cream.", "img--soup", 10, 0, 1);
var item5 = new Product("item5", "Mushroom Casserole", "A combination of spinach and mushrooms.", "img--eggs", 10, 0, 1);
var item6 = new Product("item6", "Salmon Salad", "Salad topped with a vinaigrette sauce.", "img--salad", 10, 0, 1);
var item7 = new Product("item7", "Drip Coffee", "Fresh cup o'joe", "img--drip", 10, 0, 1);
var item8 = new Product("item8", "Pour Over", "Individually brewed cups", "img--pourover", 10, 0, 1);
var item9 = new Product("item9", "Cold Brew", "Ice coffee", "img--cold", 10, 0, 1);
var item10 = new Product("item10", "Latte", "Espresso + steamed milk", "img--latte", 10, 0, 1);
var item11 = new Product("item11", "Espresso", "Espresso", "img--espresso", 10, 0, 1);
var item12 = new Product("item12", "Tea", "A selection of loose teas - hot, iced or latte.", "img--tea", 10, 0, 1);

var productArr = [item1, item2, item3, item4, item5, item6, item7, item8, item9, item10, item11, item12];

// notifications count
var count = 0;
var notificationsAlert = document.querySelector(".notifications__alert");
var notificationsCount = document.querySelector(".notifications__count").firstChild;

// add items to cart
function orderItem(obj) {
   
  if (obj.quantity < 1) {
    obj.quantity++;
    displayOrder(obj);
  }
  var count = orderCount();
  notificationsCount.nodeValue = count;
  if (count > 0) {
    notificationsAlert.classList.remove("is-hidden");
  }
  if (count > 0) {
    shoppingCart.classList.remove("is-hidden");
  }
  
}

// remove items from cart
function removeItem(obj) {
  obj.quantity--;
  var count = orderCount();
  notificationsCount.nodeValue = count;
  if (count < 1) {
    notificationsAlert.classList.add("is-hidden");
  } 
}





/*------------------------------------*\
  #DISPLAY-MENU-ITEMS
\*------------------------------------*/

// food menu
var foodMenu = document.getElementById("js-food-grid");

function displayFood(obj) {

  var item =
    '<img class="' + obj.image + '"/> \
    <div class="product-info"> \
      <h3 class="menu-item__title subheading">' + obj.name + '</h3> \
      <p class="menu-item__subheading body-1">' + obj.description + '</p> \
      <div class="order-btn-row"> \
        <button class="btn--order btn--flat accent-text js-btn--order" onclick="orderItem.call(this,' + obj.id + ')">ORDER NOW</button> \
        <span class="subheading">$' + obj.price + '</span> \
      </div> \
    </div>';

  var li = document.createElement('li');
  li.setAttribute('class', 'grid__menu-item card');
  li.innerHTML = item;
  foodMenu.appendChild(li);
}
for (var i = 0; i < 6; i++) {
  displayFood(productArr[i]);
}

// drink menu
var drinkMenu = document.getElementById("js-drink-grid");

function displayDrinks(obj) {

  var item =
    '<img class="' + obj.image + '"/> \
    <div class="product-info"> \
      <h3 class="menu-item__title subheading">' + obj.name + '</h3> \
      <p class="menu-item__subheading body-1">' + obj.description + '</p> \
      <div class="order-btn-row"> \
        <button class="btn--order btn--flat accent-text js-btn--order" onclick="orderItem.call(this, ' + obj.id + ')">ORDER NOW</button> \
        <span class="subheading">$' + obj.price + '</span> \
      </div> \
    </div>';

  var li = document.createElement('li');
  li.setAttribute('class', 'grid__menu-item card');
  li.innerHTML = item;
  drinkMenu.appendChild(li);
}
for (var i = 6; i < 12; i++) {
  displayDrinks(productArr[i]);
}





/*------------------------------------*\
  #DISPLAY-SHOPPING-CART-ITEMS
\*------------------------------------*/

var cartOrder = document.getElementById("js-cart-grid");

function displayOrder(obj) {
  var item = 
          '<img class="' + obj.image + '"/> \
          <div class="product-info"> \
            <h3 class="menu-item__title subheading">' + obj.name + '</h3> \
            <p class="menu-item__subheading body-1">' + obj.description + '</p> \
            <div class="order-btn-row"> \
              <button class="btn--remove btn--flat accent-text js-btn--remove" onclick="removeProduct.call(this,' + obj.id + ')">REMOVE</button> \
              <div class="text-field text-field--qty"> \
                <select class="text-field__input text-field--single" name="order-qty" onChange="updateQty.call(this, ' + obj.id +')"required> \
                  <option value="1">1</option> \
                  <option value="2">2</option> \
                  <option value="3">3</option> \
                  <option value="4">4</option> \
                  <option value="5">5</option> \
                </select> \
                <label class="text-field__label" for="order-qty"></label> \
                <i class="material-icons select_arrow">arrow_drop_down</i> \
              </div> \
              <span class="order-btn-row__spacer"></span> \
              <span class="subheading js-item-total">$' + obj.total() +'</span> \
            </div> \
          </div>';
  var li= document.createElement('li');
  li.setAttribute('class', 'cart__menu-item');
  li.innerHTML = item;
  cartOrder.appendChild(li);
}

// remove items from shopping cart
var removeButton = document.querySelectorAll(".js-btn-remove");

function removeProduct(obj) {
  this.parentNode.parentNode.parentNode.remove();
  count -= obj.quantity;
  obj.quantity = 0;
  var count = orderCount();
  notificationsCount.nodeValue = count;
  if (count < 1) {
    notificationsAlert.classList.add("is-hidden");
    shoppingCart.classList.add("is-hidden");
  } 
}

// select quantity from dropdown
function updateQty(obj) {
  obj.quantity = this.value;
  notificationsCount.nodeValue = orderCount();
  this.parentNode.parentNode.querySelector(":scope > .js-item-total").textContent = "$" + obj.total();
}

// notifications count
function orderCount() {
  var newCount = 0;
  for (var i = 0; i < productArr.length; i++) {
    newCount += Number(productArr[i].quantity);
  }
  return newCount;
}






/*------------------------------------*\
  #SHIPPING-FORM
\*------------------------------------*/

// display order confirmation
var checkoutButtons = document.querySelectorAll(".js-btn--checkout");
var mainContent = document.querySelector(".js-demo-content");
var shippingForm = document.querySelector(".js-checkout-background");
var appBar = document.querySelector(".js-app-bar");

// order confirmation elements
var itemTotal = document.querySelector(".js-item-total");
var estimatedTax = document.querySelector(".js-estimated-tax");
var orderTotal = document.querySelector(".js-order-total");

//display shipping form
function viewShipping() {
  window.scrollTo(0, 0);
  shoppingCart.classList.add("is-hidden");
  mainContent.classList.add("is-hidden");
  shippingForm.classList.remove("is-hidden");
  itemTotal.innerHTML = "$" + calcItemTotal();
  estimatedTax.innerHTML = "$" + calcTaxEstimate();
  orderTotal.innerHTML = "$" + calcOrderTotal();
}

// close shipping form
function closeShippingForm() {
  shippingForm.classList.add("is-hidden");
  mainContent.classList.remove("is-hidden");
}

// calculate order total
function calcItemTotal() {
  var sum = 0;
  for (var i = 0; i < productArr.length; i++) {
    sum += Number(productArr[i].total());
  }
  return sum;
}

// estimate tax
function calcTaxEstimate() {
  return calcItemTotal() * .10;
}

// order total
function calcOrderTotal() {
  return calcItemTotal() + calcTaxEstimate() + 5;
}

// coupon codes
var couponCode = document.querySelector(".js-coupon-codes");
var validCoupons = [["doorbuster", .2], ["bigsale", .3]];

// live check coupon codes
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
errorCheck(couponCode, "Coupon code is invalid", validateCoupons);

// validate coupons
function validateCoupons(input) {
  input = input.toLowerCase();
  for (var i = 0; i < validCoupons.length; i++) {
    if (input === validCoupons[i][0]) {
      itemTotal.innerHTML = "$" + Number(calcItemTotal() * (1-validCoupons[i][1]));
      estimatedTax.innerHTML = "$" + Number(calcItemTotal() * (1-validCoupons[i][1]) * .10);
      orderTotal.innerHTML = "$" + Number((calcOrderTotal() * (1-validCoupons[i][1]) * .90) + 5).toFixed(2);
      return true;
    } 
    return false;
  }
}
