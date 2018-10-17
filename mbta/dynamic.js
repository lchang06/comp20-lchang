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

	// Ashmont Redline Stations
	var redLineAshmont = [
		{lat: 42.395428, lng: -71.142483}, // Alewife
		{lat: 42.39674, lng: -71.121815}, // Davis
		{lat: 42.3884, lng: -71.11914899999999}, // Porter
		{lat: 42.373362, lng: -71.118956}, // Harvard
		{lat: 42.365486, lng: -71.103802}, // Central Square
		{lat: 42.36249079, lng:-71.08617653}, // Kendall/MIT
		{lat: 42.361166, lng: -71.070628}, // Charles/MGH
		{lat: 42.35639457, lng: -71.0624242}, // Park
		{lat: 42.355518, lng: -71.060225}, // Downtown Crossing
        {lat: 42.352271, lng: -71.05524200000001}, // South
        {lat: 42.342622, lng: -71.056967}, // Broadway
        {lat: 42.330154, lng: -71.057655}, // Andrew
        {lat: 42.320685, lng: -71.052391}, // JFK/UMASS
        {lat: 42.31129, lng: -71.053331}, // Savin Hill
        {lat: 42.300093, lng: -71.061667}, // Fields Corner
        {lat: 42.29312583, lng: -71.06573796000001}, // Shawmut
        {lat: 42.284652, lng: -71.06448899999999} // Ashmont
    ];

    // Braintree stations after fork
    var redLineBraintree = [
    	{lat: 42.320685, lng: -71.052391}, // JFK/UMASS
    	{lat: 42.275275, lng: -71.029583}, // North Quincy
        {lat: 42.2665139, lng: -71.0203369}, // Wollaston
        {lat: 42.251809, lng: -71.005409}, // Quincy Center
        {lat: 42.233391, lng: -71.007153}, // Quincy Adams
        {lat: 42.2078543, lng: -71.0011385} // Braintree
    ];

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





	  
	