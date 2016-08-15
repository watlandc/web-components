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
  var myLatLng = {lat: 41.910, lng: -87.690}
  
  // Create a map object and specify the DOM element for display.
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    scrollwheel: false,
    zoom: 16,
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    fullscreenControl: true
  });
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
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
  // Click listener to center map
  goCenterUI.addEventListener('click', function() {
    var newCenter = map.getCenter();
    control.setCenter(newCenter);
  });
  function CenterControl(controlDiv, map, center) {
    var control = this;
  }
};

