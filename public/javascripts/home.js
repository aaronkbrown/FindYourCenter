$(function() {
  $(window).keydown(function (e) {
    if (e.which === 13) {
      var query = $('.search').val();
      window.location.href = '/search/' + query;
    }
  });

  var data;
  // Import the data
  $.getJSON('/data/yogadata.json', function (yogaData) {
    data = yogaData;
    presentData();
  });

  function presentData () {
    $grid = $('.grid');
    $newGrid = $('<table>');
    // Add header
    $thead = $('<thead>');
    $theadtr = $('<tr>');
    $thead.append($theadtr);
    var types = Object.keys(data[0]);
    console.log(types);
    $newGrid.append($thead);

    $tbody = $('<tbody>');
    $newGrid.append($tbody);
    for (var i in data) {
      var studio = data[i];
      $tr = $('<tr>');

      // $newGrid.
    }
  }

  // Gets geolocation
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('geolocation not supported');
    }
  }
  function showPosition(position) {
    var coord = position.coords;
    console.log(coord);
  }
  getLocation();


  // Calculates distance between two coordinates in km
  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
      return Value * Math.PI / 180;
  }
});