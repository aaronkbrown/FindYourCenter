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

    // The displayed types
    var types = ["Studio Name", "Neighborhood", "Address", "Phone", "Email", "Owner", "Size", "Price", "Discount", "Child Care", "Yoga Therapy", "Gentle/Relaxation/Restorative", "Intro", "Strength Based", "Heated", "Acro", "Prenatal", "Youth or Family", "Meditation", "Notes"];

    // Add header
    $thead = $('<thead>');
    $theadtr = $('<tr>');
    $thead.append($theadtr);
    for (var i in types) {
      $theadtr.append('<td>' + types[i] + '</td>');
    }
    $thead.append($theadtr);
    $newGrid.append($thead);

    $tbody = $('<tbody>');
    $newGrid.append($tbody);
    for (var i in data) {
      var studio = data[i];
      $tr = $('<tr>');

      // Add tds
      for (var j in types) {
        var type = types[j];
        var inside = studio[type];
        if (type === 'Studio Name') {
          inside = '<a href="'+studio['Website']+'">' + studio[type] + '</a>';
        }
        var $td = $('<td>').html(inside);
        if (studio[type].substr(0, 3) === 'yes') {
          $td.addClass('green');
        } else if (studio[type].substr(0, 2) === 'no') {
          $td.addClass('red');
        }
        $tr.append($td);
      }
      $newGrid.append($tr);
    }

    // Add to the grid div
    $grid.html($newGrid);
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
    // console.log(coord);
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