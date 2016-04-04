
//Calculates the distance between two points as the cros flies using the Haversine Formula
//from http://www.movable-type.co.uk/scripts/latlong.html

function calcDistance(latOne, lonOne, latTwo, lonTwo) {
  //variable set
  var R = 3958.76; //R is the earth's radius converted from meters to miles (using site above's information)
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
