// initialize map with center on South Station
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
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

		var infoWindow = new google.maps.InfoWindow; // to set parameters
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

	// All Station coordinates
	var alewife = {lat: 42.395428, lng: -71.142483};
	var davis = {lat: 42.39674, lng: -71.121815};
	var porter = {lat: 42.3884, lng: -71.11914899999999};
	var harvard = {lat: 42.373362, lng: -71.118956};
	var central = {lat: 42.365486, lng: -71.103802};
	var kendall = {lat: 42.36249079, lng:-71.08617653};
	var charlesMGH = {lat: 42.361166, lng: -71.070628};
	var park = {lat: 42.35639457, lng: -71.0624242};
	var downtownCrossing = {lat: 42.355518, lng: -71.060225};
	var south = {lat: 42.352271, lng: -71.05524200000001};
	var broadway = {lat: 42.342622, lng: -71.056967};
	var andrew = {lat: 42.330154, lng: -71.057655};
	var jfkUmass = {lat: 42.320685, lng: -71.052391};
	var savinHill = {lat: 42.31129, lng: -71.053331};
	var fieldsCorner = {lat: 42.300093, lng: -71.061667};
	var shawmut = {lat: 42.29312583, lng: -71.06573796000001};
	var ashmont = {lat: 42.284652, lng: -71.06448899999999};
	var northQuincy = {lat: 42.275275, lng: -71.029583};
	var wollaston = {lat: 42.2665139, lng: -71.0203369};
	var quincyCenter = {lat: 42.251809, lng: -71.005409};
	var quincyAdams = {lat: 42.233391, lng: -71.007153};
	var braintree = {lat: 42.2078543, lng: -71.0011385};

// Draw Polyline
	// Ashmont Redline Stations
	var redLineAshmont = [ 
		alewife, 
		davis, 
		porter, 
		harvard, 
		central, 
		kendall, 
		charlesMGH, 
		park, 
		downtownCrossing, 
		south, 
		broadway,
		andrew,
		jfkUmass,
		savinHill,
		fieldsCorner,
		shawmut,
		ashmont
    ];

    // Braintree stations after fork
    var redLineBraintree = [
    	jfkUmass,
    	northQuincy,
    	wollaston,
    	quincyCenter,
    	quincyAdams,
    	braintree
    ];

    redLineAshmont.forEach(function(station) {
   		var station = new google.maps.Marker({
    		position: station,
    		map: map,
    		icon: { url: "trainIcon.png"}
    	})
   	});

   	redLineBraintree.forEach(function(station) {
   		var station = new google.maps.Marker({
    		position: station,
    		map: map,
    		icon: { url: "trainIcon.png"}
    	})
   	});

	// Set linetype for both paths
  	var redLinePath1 = new google.maps.Polyline({
        path: redLineAshmont,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    var redLinePath2 = new google.maps.Polyline({
    path: redLineBraintree,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
    });

    // Set paths on map
    redLinePath1.setMap(map);
    redLinePath2.setMap(map);


	}

	// Catch for errors, notify user if location not found
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    	infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }





	  
	