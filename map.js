  var lastPosNE, lastPosSW, lastCenter, markers;

 

  function initMap() {
    var infoWindow = new google.maps.InfoWindow({
      map: map
    });
       //inizializzo la info windows dei marker
    var infowindowMarker = new google.maps.InfoWindow({
      content: '<h1>Loading</h1>' + '<p>Caricamentos</p>'
    });



    //var myLatLng = {lat: 41.060816, lng: 14.334157};


    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: {
        lat: 42.516122,
        lng: 12.513889
      },
    });

    


  

    google.maps.event.addListenerOnce(map, 'tilesloaded', function() {

      lastPosNE = map.getBounds().getNorthEast();

      lastPosSW = map.getBounds().getSouthWest();

      lastCenter = map.getCenter();


     
    
//loadPins();

      //loadPins();

      //loadPins(map,markers);
    });

    var infoWindow = new google.maps.InfoWindow({
      map: map
    });

    // Try HTML5 geolocation.

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {

        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };



        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else { // Browser doesn't support Geolocation

      handleLocationError(false, infoWindow, map.getCenter());
    }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    }


   



    var image = 'http://marcoaprea.altervista.org/Goopher/golang-logo2.png';


    //array JSON con i marker da visualizzare
    


 var markers = {
      mark1: {
        position: {
          lat: 41.060816,
          lng: 14.334157

        },
        map: map,
        title: 'Hello World!',
        icon: image,
        description: "<h1>Potato1</h1>",
        radius: 100
      },
      mark2: {
        position: {
          lat: 41.062675,
          lng: 14.335943
        },
        map: map,
        title: 'Hello World!',
        icon: image,
        description: "<h1>Potato2</h1>",
        radius: 30
      },
      mark3: {
        position: {
          lat: 41.063015,
          lng: 14.333100
        },
        map: map,
        title: 'Hello World!',
        icon: image,
        description: "<h1>Potato3</h1>",
        radius: 70
      },
      mark4: {
        position: {
          lat: 41.060078,
          lng: 14.336319
        },
        map: map,
        title: 'Hello World!',
        icon: image,
        description: "<h1>Potato4</h1>",
        radius: 20
      }
    };

for (var pin in markers) {
      var marker = new google.maps.Marker({
        position: markers[pin].position,
        map: map,
        title: markers[pin].title,
        icon: markers[pin].icon
      });

      bindInfoWindow(marker, map, infowindowMarker, markers[pin].description);

      var pinRadius = new google.maps.Circle({
        strokeColor: '#1b85b8',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#1b85b8',
        fillOpacity: 0.35,
        map: map,
        center: markers[pin].position,
        radius: markers[pin].radius
      });
    }






    // evento che triggera ogni volta che vengono modificati gli estremi dell' area da visualizzare
    google.maps.event.addListener(map, 'bounds_changed', function() {
      //console.debug(map.getCenter().lat()+" "+map.getCenter().lng());
      var newPosNE = map.getBounds().getNorthEast();
      var newPosSW = map.getBounds().getSouthWest();

      var center = map.getCenter();

      //console.debug(lastPosNE +" " + lastPosSW);

      //console.debug(calcDistance(center.lat(), center.lng(), lastCenter.lat(), lastCenter.lng()))

      //l' if è vero solo se la distanza dall' ultimo centro di mappa dista più di 1 km da quello visualizzato
      //se vero aggiorna il nuovo centro
      if (calcDistance(center.lat(), center.lng(), lastCenter.lat(), lastCenter.lng()) > 1000) {
        //console.debug(map.getBounds().getNorthEast() +" " + map.getBounds().getSouthWest());
        console.debug(lastCenter.lat() + " " + lastCenter.lng());
        lastPosNE = newPosNE;
        lastPosSW = newPosSW;
        lastCenter = center;


/*
      deleteMarkers();


        var markers = {
      mark1: {
        position: {
          lat: 40.773418,
          lng: 14.791434
        },
        map: map,
        title: 'Hello World!',
        icon: image,
        description: "<h1>Potato5</h1>",
        radius: 100
      }
    };
      for (var pin in markers) {
      var marker = new google.maps.Marker({
        position: markers[pin].position,
        map: map,
        title: markers[pin].title,
        icon: markers[pin].icon
      });

      bindInfoWindow(marker, map, infowindowMarker, markers[pin].description);

      var pinRadius = new google.maps.Circle({
        strokeColor: '#1b85b8',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#1b85b8',
        fillOpacity: 0.35,
        map: map,
        center: markers[pin].position,
        radius: markers[pin].radius
      });
    }
*/
      
      }

      //console.debug(map.getBounds().getNorthEast() +" " + map.getBounds().getSouthWest());

    });



 function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

function clearMarkers() {
        setMapOnAll(null);
      }

 function deleteMarkers() {
        clearMarkers();
        markers = [];
      }
      

    function calcDistance(fromLat, fromLng, toLat, toLng) {

      return google.maps.geometry.spherical.computeDistanceBetween(

        new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));

    }

  }



  function bindInfoWindow(marker, map, infowindow, description) {
    marker.addListener('click', function() {
      infowindow.setContent(description);
      infowindow.open(map, this);
    });
  }


  function loadPins(){
       //carica i pin disponibili
    for (var pin in markers) {
      var marker = new google.maps.Marker({
        position: markers[pin].position,
        map: map,
        title: markers[pin].title,
        icon: markers[pin].icon
      });

      bindInfoWindow(marker, map, infowindowMarker, markers[pin].description);

      var pinRadius = new google.maps.Circle({
        strokeColor: '#1b85b8',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#1b85b8',
        fillOpacity: 0.35,
        map: map,
        center: markers[pin].position,
        radius: markers[pin].radius
      });
    }
  }

