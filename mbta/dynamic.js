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
        'Kendall Square', 'Charles/MGH' , 'Park Street', 'Downtown Crossing', 'South Station', 'Broadway', 
        'Andrew', 'JFK UMass', 'Savin Hill', 'Fields Corner', 'Shawmut', 'Ashmont'
    ];
    // Braintree stations after fork
    var redLineBraintreeNames = ['JFK UMass', 'North Quincy', 'Wollaston', 'Quincy Center', 'Quincy Adams', 'Braintree'
    ];
    // Stop_ID list
    var stop_idList = ['place-alfcl', 'place-davis', 'place-portr', 'place-harsq', 'place-cntsq', 'place-knncl', 
        'place-chmnl', 'place-pktrm', 'place-dwnxg', 'place-sstat', 'place-brdwy', 'place-andrw', 'place-jfk', 'place-shmnl',
        'place-fldcr', 'place-smmnl', 'place-asmnl', 'place-jfk', 'place-nqncy', 'place-wlsta', 'place-qnctr', 'place-qamnl', 'place-brntn'
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
        // Check distance from user's position to each station on Ashmont line
        redLineAshmont.forEach(function(distance) {
            var distance = google.maps.geometry.spherical.computeDistanceBetween(distance, pos);
            if (distance < smallestDist) {
                smallestDist = distance;
                nearestStation = redLineAshmontNames[count];
                nearestCoords = redLineAshmont[count];
            }
            count ++;
        });
        // Check distance from user's position to each station on Braintree line
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
        var contentString = '<h1>Nearest MBTA Redline Station: ' + nearestStation + '</h1>'
            + '<h2>Located ' + smallestDist/1609.344 + ' miles away</h2>';
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
    

    // Draw Polyline Through RedLine Stations, Make Clickable Markers With Info
    // Ashmont Redline Stations
    var redLineAshmont = [alewife, davis, porter, harvard, central, kendall, charlesMGH, park, 
        downtownCrossing, south, broadway, andrew, jfkUmass, savinHill, fieldsCorner, shawmut, ashmont
    ];
    // Braintree stations after fork
    var redLineBraintree = [jfkUmass, northQuincy, wollaston, quincyCenter, quincyAdams, braintree
    ];

    var i = 0;
    redLineAshmont.forEach(function(station, info) {
        var station = new google.maps.Marker({ // place marker on each station
            position: station,
            map: map,
            icon: {url: "trainIcon.png"}
        })

        var scheduleTimes = "<h1>" + redLineAshmontNames[i] + "</h1>";

        // XML Request
        var URL = 'https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=' + stop_idList[i];

        var request = new XMLHttpRequest();
        request.open("GET", URL, true );
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200){
                var theData = request.responseText;
                schedule = JSON.parse(theData);

                scheduleTimes += "<h2>Arrival Times: </h2><ul>"
                for (k = 0; k < schedule.data.length; k++) {
                    direction_id = schedule.data[k].attributes.direction_id;
                    if (direction_id == 0) {
                        direction = "Southbound (Ashmont/Braintree) ";
                    }
                    else if (direction_id == 1) {
                        direction = "Northbound (Alewife) ";
                    }

                    if (schedule.data[k].attributes.arrival_time != null) {
                        scheduleTimes += "<li>" + schedule.data[k].attributes.arrival_time.substring(11,19) 
                        + " — " + direction + "</li>";
                    }
                }
                scheduleTimes += "</ul>";

                scheduleTimes += "<h2>Departure Times: </h2><ul>"
                for (k = 0; k < schedule.data.length; k++) {
                    direction_id = schedule.data[k].attributes.direction_id;
                    if (direction_id == 0) {
                        direction = "Southbound (Ashmont/Braintree)";
                    }
                    else if (direction_id == 1) {
                        direction = "Northbound (Alewife)";
                    }
                    if (schedule.data[k].attributes.departure_time != null) {
                        scheduleTimes += "<li>" + schedule.data[k].attributes.departure_time.substring(11,19) 
                        + " — " + direction + "</li>";
                    }
                }
                scheduleTimes += "</ul>";
                    var info = new google.maps.InfoWindow({ // have info window when station clicked
                        content: scheduleTimes
                    });

                    station.addListener('click', function() {
                        info.open(map,station);
                    });
        }
       }
       i++;
       request.send();
    });

    var m = 0;
    redLineBraintree.forEach(function(station, info) {
        var station = new google.maps.Marker({
            position: station,
            map: map,
            icon: {url: "trainIcon.png"}
        })

        var scheduleTimes = "<h1>" + redLineBraintreeNames[m] + "</h1>";
        var direction_id;
        var direction;

         // XML Request
        var URL = 'https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=' + stop_idList[i];

        var request = new XMLHttpRequest();
        request.open("GET", URL, true );
        request.onreadystatechange = function() {
            if (request.readyState == 4 && request.status == 200){
                var theData = request.responseText;
                schedule = JSON.parse(theData);

                scheduleTimes += "<h2>Arrival Times: </h2><ul>"
                for (k = 0; k < schedule.data.length; k++) {

                    direction_id = schedule.data[k].attributes.direction_id;
                    if (direction_id == 0) {
                        direction = "Southbound (Ashmont/Braintree)";
                    }
                    else if (direction_id == 1) {
                        direction = "Northbound (Alewife)";
                    }

                    if (schedule.data[k].attributes.arrival_time != null) {
                        scheduleTimes += "<li>" + schedule.data[k].attributes.arrival_time.substring(11,19) 
                        + " — " + direction + "</li>";
                    }
                }
                scheduleTimes += "</ul>";

                scheduleTimes += "<h2>Departure Times: </h2><ul>"
                for (k = 0; k < schedule.data.length; k++) {
                    direction_id = schedule.data[k].attributes.direction_id;
                    if (direction_id == 0) {
                        direction = "Southbound (Ashmont/Braintree)";
                    }
                    else if (direction_id == 1) {
                        direction = "Northbound (Alewife)";
                    }

                    if (schedule.data[k].attributes.departure_time != null) {
                        scheduleTimes += "<li>" + schedule.data[k].attributes.departure_time.substring(11,19) 
                        + " — " + direction + "</li>";
                    }
                }
                scheduleTimes += "</ul>";

                var info = new google.maps.InfoWindow({ // have info window when station clicked
                    content: scheduleTimes
                });

                station.addListener('click', function() {
                    info.open(map,station);
                });
            }
       }
       i++;
       m++;
       request.send();
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





	  
	