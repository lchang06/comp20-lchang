var map;
var infoWindow;

// initialize map with center on South Station
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat:42.351947, lng:-71.055086}, // center on South Station
        zoom: 12 // reasonable zoom to see red line
    });


	// Geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		// Get user's geolocation
		var pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude 
		};

		infoWindow = new google.maps.InfoWindow; // to set parameters
        infoWindow.open(map); // open map
        map.setCenter(pos); // center map on user's location

        var marker = new google.maps.Marker({ // put marker on user's location
        	position: pos,
        	map: map,
        	title: 'You are here'
        });

    	}, function() { // Location found
    		handleLocationError(true, infoWindow, map.getCenter());
    	});

	} else { // Location not found
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
		}
	}

	// Catch for errors, notify user if location not found
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    	infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }





	  
	