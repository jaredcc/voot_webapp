// Maps API Key: AIzaSyD5QsbBEXt76TPXMgxuaV6inX2Y0Q9gD3E
// Geocoding API Key: AIzaSyA9IJ4V75DpZE4meAOdf6b5LlPrFoqkDvo
var map;

// Takes in a Latitude and
// Longitude and creates a
// marker on the map
function addMarker(lat, lng, pollingLoc) {
  var marker = new google.maps.Marker({
    position: {
      lat,
      lng
    },
    map: map,
    animation:google.maps.Animation.DROP,
    address: pollingLoc
  });
  google.maps.event.addListener(marker, 'click', function() { showLocationWindow(marker.address); });
}

// Initializes the Map with a
// center on Austin, Texas
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 30.2672,
      lng: -97.7431
    },
    zoom: 8
  });

  addMarker(30.2672, -97.7431, 'Austin, Texas'); // Austin, Tx

  // Add polling locations
  addPollingLocations();
}

// IF the user is logged in, gets their
// stored address, finds polling locations
// and displays them on the map
function addPollingLocations() {
  // get user address from server
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      if (xmlHttp.responseText == 'No User Found') {
        // Display You Must Login Error...
      } else {
        getPollingLocations(xmlHttp.responseText);
      }
    }
  }
  xmlHttp.open("GET", 'http://localhost:3000/locations/user-address', true); // true for asynchronous
  xmlHttp.send(null);
}

// Calls google civic information api
// to get all the polling locations
function getPollingLocations(address) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

      var res = JSON.parse(xmlHttp.responseText);
      res.pollingLocations.forEach(function(location) {
        var pollingAddress = location.address.line1;
        if (location.address.line2 != null) {
          pollingAddress = pollingAddress + "%20" + location.address.line2;
        }
        pollingAddress = pollingAddress + location.address.city + "%20" + location.address.state + "%20" + location.address.zip;
        pollingAddress = pollingAddress.split(' ').join('%20');

        var fullLocation = location.address.locationName + " " + location.address.line1;
        if (location.address.line2 != null) {
          fullLocation = fullLocation + " " + location.address.line2;
        }
        fullLocation = fullLocation + " " +  location.address.city
        + " " + location.address.state + " " + location.address.zip;

        addPollingLocationsMarker(pollingAddress, fullLocation);
      });

    }
  }
  var req = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyDavSOAQc_B7Gaaj8cnL6EmPG2g9vgwlVU&electionId=2000&address=" + address;
  xmlHttp.open("GET", req, true); // true for asynchronous
  xmlHttp.send(null);
}

// Finds the latitude and longitude of the
// given POLLING LOCATION with the google
// geocoding api and then adds it as a marker on
// the map
function addPollingLocationsMarker(address, fullLocation) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      var res = JSON.parse(xmlHttp.responseText);

      res.results.forEach(function(entry) {
        addMarker(entry.geometry.location.lat, entry.geometry.location.lng, fullLocation);
      });
    }
  }
  var req = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA9IJ4V75DpZE4meAOdf6b5LlPrFoqkDvo&address=" + address;
  xmlHttp.open("GET", req, true); // true for asynchronous
  xmlHttp.send(null);
}

// Get the modal
var repWindow = document.getElementById('myModal');


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == repWindow) {
        repWindow.style.display = "none";
    }
}

function showLocationWindow(address) {
  repWindow.innerHTML = "";
  // Construct Representative Card
  var card = document.createElement("div");
  card.classList.add("card");
  card.classList.add("loc-card");

  var cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  var location = document.createElement("h5");
  location.classList.add("card-title");
  location.classList.add("card-data");
  location.innerHTML = "Selected Polling Location: <br> <br> <a target=\"_blank\" class=\"map-link\" href=\"http://maps.google.com/?q="
    + address + "\">" + address + "</a>";
  cardBody.appendChild(location);
  card.appendChild(cardBody);

  repWindow.appendChild(card);
  repWindow.style.display = "block";
}
