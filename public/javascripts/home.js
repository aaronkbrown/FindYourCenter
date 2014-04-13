$(function() {
  $(window).keydown(function (e) {
    if (e.which === 13) {
      var query = $('.search').val();
      window.location.href = '/search/' + query;
    }
  });

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else{x.innerHTML = "Geolocation is not supported by this browser.";}
  }
  function showPosition(position) {
    var coord = position.coords;
    console.log(coord);
  }
  getLocation();
});