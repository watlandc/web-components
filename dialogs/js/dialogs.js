/*------------------------------------*\
  #EXPANDABLE-TEXT-AREA
\*------------------------------------*/

$(".js-comment-dropdown").on("click", function() {
  $(".js-comment-text").toggleClass("is-visible");
});





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