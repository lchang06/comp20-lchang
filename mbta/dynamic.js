/*  var alewife = {"lat": 42.395428, "lng": -71.142483};
    var davis = {"lat": 42.39674, "lng": -71.121815};
    var porter = {"lat": 42.3884, "lng": -71.11914899999999};
    var harvard = {"lat": 42.373362, "lng": -71.118956};
    var central = {"lat": 42.365486, "lng": -71.103802};
    var kendall = {"lat": 42.36249079, "lng":-71.08617653};
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
    var braintree = {"lat": 42.2078543, "lng": -71.0011385};*/

// initialize map with center on South Station
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:42.351947, lng:-71.055086}, // center on South Station
        zoom: 12 // reasonable zoom to see red line
    });

    // All Station coordinates
    var alewife = new google.maps.LatLng(42.395428, -71.142483);
    var davis = new google.maps.LatLng(42.39674, -71.121815);
    var porter = new google.maps.LatLng(42.3884,-71.11914899999999);
    var harvard = new google.maps.LatLng(42.373362,-71.118956);
    var central =  new google.maps.LatLng(42.365486,-71.103802);
    var kendall =  new google.maps.LatLng(42.36249079,-71.08617653);
    var charlesMGH = new google.maps.LatLng(42.361166,-71.070628);
    var park = new google.maps.LatLng(42.35639457, -71.0624242);
    var downtownCrossing = new google.maps.LatLng(42.355518, -71.060225);
    var south = new google.maps.LatLng(42.352271, -71.05524200000001);
    var broadway = new google.maps.LatLng(42.342622, -71.056967);
    var andrew = new google.maps.LatLng(42.330154, -71.057655);
    var jfkUmass = new google.maps.LatLng(42.320685, -71.052391);
    var savinHill = new google.maps.LatLng(42.31129, -71.053331);
    var fieldsCorner = new google.maps.LatLng(42.300093, -71.061667);
    var shawmut = new google.maps.LatLng(42.29312583, -71.06573796000001);
    var ashmont = new google.maps.LatLng(42.284652, -71.06448899999999);
    var northQuincy = new google.maps.LatLng(42.275275, -71.029583);
    var wollaston = new google.maps.LatLng(42.2665139, -71.0203369);
    var quincyCenter = new google.maps.LatLng(42.251809, -71.005409);
    var quincyAdams = new google.maps.LatLng(42.233391, -71.007153);
    var braintree = new google.maps.LatLng(42.2078543,-71.0011385);

    // All Station names

    // Ashmont Redline Names
    var redLineAshmontNames = ['Alewife', 'Davis Square', 'Porter Square', 'Harvard Square', 'Central Square', 
        'Kendall Square', 'Charles/MGH' , 'Park Station', 'Downtown Crossing', 'South Station', 'Broadway', 
        'Andrew', 'JFK UMass', 'Savin Hill', 'Fields Corner', 'Shawmut', 'Ashmont'
    ];

    // Braintree stations after fork
    var redLineBraintreeNames = ['JFK UMass', 'North Quincy', 'Wollaston', 'Quincy Center', 'Quincy Adams', 'Braintree'
    ];


    // Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        
        // Get user's geolocation
        var pos = new google.maps.LatLng (parseFloat(position.coords.latitude), parseFloat(position.coords.longitude));

        // Calculate smallest distance between position and stations
        var smallestDist = google.maps.geometry.spherical.computeDistanceBetween(alewife, pos); 
        var nearestStation = redLineAshmontNames[0];
        var count = 0;
        var nearestCoords = alewife;

        redLineAshmont.forEach(function(distance) {
            var distance = google.maps.geometry.spherical.computeDistanceBetween(distance, pos);
            if (distance < smallestDist) {
                smallestDist = distance;
                nearestStation = redLineAshmontNames[count];
                nearestCoords = redLineAshmont[count];
            }
            count ++;
        });

        count = 0;
        redLineBraintree.forEach(function(distance) {
            var distance = google.maps.geometry.spherical.computeDistanceBetween(distance, pos);
            if (distance < smallestDist) {
                smallestDist = distance;
                nearestStation = redLineBraintreeNames[count];
                nearestCoords = redLineBraintree[count];
            }
            count++;
        });

        // Draw polyline to nearest station
        var nearestStationPath = new google.maps.Polyline({
            path: [pos, nearestCoords],
            geodesic: true,
            strokeColor: '#0000FF',
            strokeOpacity: 1.0,
            strokeWeight: 2.5
        });
        nearestStationPath.setMap(map);

        // Display infowindow with closest station when clicked
        var contentString = '<div>Nearest MBTA Redline Station: ' + nearestStation + '</div>'
            + '<div>Located ' + smallestDist/1609.344 + ' miles away</div>';
        var infoWindow = new google.maps.InfoWindow({
          content: contentString
        });

        infoWindow.open(map); // open map
        map.setCenter(pos); // center map on user's location

        // Put marker on user's location
        var marker = new google.maps.Marker({ 
            position: pos,
            map: map,
            title: 'You are here'
        });

        marker.addListener('click', function() {
          infoWindow.open(map, marker);
        });


        }, function() { // Location found
            handleLocationError(true, infoWindow, map.getCenter());
        });


    } else { // Location not found
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        }

    // Draw Polyline Through RedLine Stations
    // Ashmont Redline Stations
    var redLineAshmont = [alewife, davis, porter, harvard, central, kendall, charlesMGH, park, 
        downtownCrossing, south, broadway, andrew, jfkUmass, savinHill, fieldsCorner, shawmut, ashmont
    ];

    // Braintree stations after fork
    var redLineBraintree = [jfkUmass, northQuincy, wollaston, quincyCenter, quincyAdams, braintree
    ];

    redLineAshmont.forEach(function(station, info) {
        var station = new google.maps.Marker({ // place marker on each station
            position: station,
            map: map,
            icon: { url: "trainIcon.png"}
        })

        var info = new google.maps.InfoWindow({ // have info window when station clicked
            content: 'hi'
        });

        station.addListener('click', function() {
            info.open(map,station);
        });
    });

    redLineBraintree.forEach(function(station, info) {
        var station = new google.maps.Marker({
            position: station,
            map: map,
            icon: { url: "trainIcon.png"}
        })

        var info = new google.maps.InfoWindow({
            content: 'hi'
        });

        station.addListener('click', function() {
            info.open(map,station);
        });
    });

    // Set linetype for both paths
    var redLinePath1 = new google.maps.Polyline({
        path: redLineAshmont,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2.5
    });

    var redLinePath2 = new google.maps.Polyline({
    path: redLineBraintree,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2.5
    });

    // Set paths on map
    redLinePath1.setMap(map);
    redLinePath2.setMap(map);

    // Catch for errors, notify user if location not found
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
  }





	  
	