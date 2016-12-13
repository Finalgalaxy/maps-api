function initMap() {
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });

  //var myLatLng = {lat: 41.060816, lng: 14.334157};


  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {
      lat: 42.516122,
      lng: 12.513889
    },
  });

  var lastPosNE, lastPosSW;




  var infoWindow = new google.maps.InfoWindow({
    map: map
  });

  // Try HTML5 geolocation.

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
     
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };


      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {// Browser doesn't support Geolocation
    
    handleLocationError(false, infoWindow, map.getCenter());
  }


  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
  }


  //contenuto dei marker

  var contentString = '<h1 id="firstHeading" class="firstHeading">Potato</h1>' + '<p>Cromosomi</p>';

  var infowindowMarker = new google.maps.InfoWindow({
    content: contentString
  });


  //marker

  var image = 'http://marcoaprea.altervista.org/Goopher/golang-logo2.png';

  /*
    var marker = new google.maps.Marker({
      position: {
        lat: 41.060816,
        lng: 14.334157
       
      },
      map: map,
      title: 'Hello World!',
      icon: image
    });
    
    var marker = new google.maps.Marker({
      position: {
        lat: 41.062675,
        lng: 14.335943
      },
      map: map,
      title: 'Hello World!',
      icon: image
    });
    
     var marker = new google.maps.Marker({
      position: {
        lat: 41.063015,
        lng: 14.333100
      },
      map: map,
      title: 'Hello World!',
      icon: image
    });
    
    var marker = new google.maps.Marker({
      position: {
        lat: 41.060078,
        lng: 14.336319
      },
      map: map,
      title: 'Hello World!',
      icon: image
    });
  */
  /*
  marker.addListener('click', function() {     
    infowindow.open(map, marker);    
  });
*/
  //test radius
  var citymap = {
    chicago: {
      center: {
        lat: 41.060816,
        lng: 14.334157
      },
      population: 100
    },
    newyork: {
      center: {
        lat: 41.062675,
        lng: 14.335943
      },
      population: 30
    },
    losangeles: {
      center: {
        lat: 41.063015,
        lng: 14.333100
      },
      population: 70
    },
    vancouver: {
      center: {
        lat: 41.060078,
        lng: 14.336319
      },
      population: 20
    }
  };


  var markers = {
    mark1: {
      position: {
        lat: 41.060816,
        lng: 14.334157

      },
      map: map,
      title: 'Hello World!',
      icon: image
    },
    mark2: {
      position: {
        lat: 41.062675,
        lng: 14.335943
      },
      map: map,
      title: 'Hello World!',
      icon: image
    },
    mark3: {
      position: {
        lat: 41.063015,
        lng: 14.333100
      },
      map: map,
      title: 'Hello World!',
      icon: image
    },
    mark4: {
      position: {
        lat: 41.060078,
        lng: 14.336319
      },
      map: map,
      title: 'Hello World!',
      icon: image
    }
  };


  for (var pin in markers) {
    var marker = new google.maps.Marker({
      position: markers[pin].position,
      map: map,
      title: markers[pin].title,
      icon: markers[pin].icon
    });
     marker.addListener('click', function() {
    infowindowMarker.open(map, marker);
  });
  }

  

  for (var city in citymap) {// Add the circle for this city to the map.

    var cityCircle = new google.maps.Circle({
      strokeColor: '#1b85b8',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#1b85b8',
      fillOpacity: 0.35,
      map: map,
      center: citymap[city].center,
      radius: citymap[city].population
    });
  }




google.maps.event.addListener(map, 'bounds_changed', function() {
  //console.debug(map.getCenter().lat()+" "+map.getCenter().lng());
  var newPosNE = map.getBounds().getNorthEast();
  var newPosSW = map.getBounds().getSouthWest();

  if(calcDistance(newPosNE.lat(), newPosNE.lng(), lastPosNE.lat(), lastPosNE.lng())>100){
    console.debug(map.getBounds().getNorthEast() +" " + map.getBounds().getSouthWest());
  }

});



function calcDistance (fromLat, fromLng, toLat, toLng) {

      return google.maps.geometry.spherical.computeDistanceBetween(

        new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));

   }

}
