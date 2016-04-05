/*
Calculates the distance between two points as the salmon swims using
the Haversine Formula.
Haversine Formula is used to calcuate the distance between two points on earth.
This formula is taken from http://www.movable-type.co.uk/scripts/latlong.html
*/

function calcDistance(latOne, lonOne, latTwo, lonTwo) {
  //variable set
  var R = 3958.76; //R is the earth's radius converted from meters to miles
  var latRadiansOne = toRadians(latOne);
  var latRadiansTwo = toRadians(latTwo);
  var latChangeRads = toRadians(latTwo-latOne);
  var lonChangeRads = toRadians(lonTwo-lonOne);

  var aa = Math.sin(latChangeRads/2) * Math.sin(latChangeRads/2) + Math.cos(latRadiansOne) * Math.cos(latRadiansTwo) * Math.sin(lonChangeRads/2) *  Math.sin(lonChangeRads/2);

  var cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));

  return (R * cc).toFixed(1);

  // use for converting to radians
  function toRadians(xx) {
     return xx * Math.PI / 180;
  }
}

//by default the error message is hidden
var error = document.getElementById("error");
error.setAttribute("style", "visibility: hidden");

//by default the load icon is visible
var load = document.getElementById('load');
load.setAttribute("style", "visibility: visible");

//geolocation API to access GPS within users browser
navigator.geolocation.getCurrentPosition(userLocation);

//function to get position and manipulate dom based on events
function userLocation(currentPosition) {
  load.setAttribute("style", "visibility: hidden");

  //get span elements with lat and lon data within
  var fishViewingSpots = document.getElementsByClassName("getSpan");
  console.log(fishViewingSpots);

  /*
  loop through those span elements with lat/lon data
  and obtain it in fvsLatitude and fvsLongitude by using
  data-lat, data-lon attributes.
  */

  var fishViewingSpot ;
  var fvsLatitude ;
  var fvsLongitude ;
  var distanceMiles ;

  for (var i = 0; i < fishViewingSpots.length; i++) {

    fishViewingSpot = fishViewingSpots[i];
    fvsLatitude = fishViewingSpot.dataset.lat;
    fvsLongitude = fishViewingSpot.dataset.lon;

    console.log(fvsLatitude);

    /*
    calculate the distance from the currentPosition's coordinates
    lattitude, currentPosition's coordinates longitude and the
    fishViewingSpots's lattitude and fishViewingSpots's longitude
    */

    distanceMiles = calcDistance(currentPosition.coords.latitude, currentPosition.coords.longitude, fvsLatitude, fvsLongitude);

    fishViewingSpot.textContent = distanceMiles + " miles to ";

  }

}
