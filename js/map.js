var svgBonnevilleSite = document.getElementById('bonID');
var svgEagleSite = document.getElementById('eagleID');
var svgHermanSite = document.getElementById('hermanID');
var svgKlickSite = document.getElementById('klickID');

var divDisplayOne = document.getElementById("bonnevilleDam");
var divDisplayTwo = document.getElementById("eagleCreekTrailhead");
var divDisplayThree = document.getElementById("hermanCreekTrailhead");
var divDisplayFour = document.getElementById("klickitatRiverFalls");

divDisplayOne.className = "inactive";
divDisplayTwo.className = "inactive";
divDisplayThree.className = "inactive";
divDisplayFour.className = "inactive";

 svgBonnevilleSite.addEventListener("mouseover", function() {
     // localStorage functionality:
     storageObject.divDisplay = 1;
     storageIn();

    // displaying / hiding divs:
    divDisplayOne.className = "active";
    divDisplayTwo.className = "inactive";
    divDisplayThree.className = "inactive";
    divDisplayFour.className = "inactive";
 })

 svgEagleSite.addEventListener("mouseover", function() {
     // localStorage functionality:
     storageObject.divDisplay = 2;
     storageIn();

    // displaying / hiding divs:
    divDisplayOne.className = "inactive";
    divDisplayTwo.className = "active";
    divDisplayThree.className = "inactive";
    divDisplayFour.className = "inactive";
 })

 svgHermanSite.addEventListener("mouseover", function() {
     // localStorage functionality:
     storageObject.divDisplay = 3;
     storageIn();

   // displaying / hiding divs:
   divDisplayOne.className = "inactive";
   divDisplayTwo.className = "inactive";
   divDisplayThree.className = "active";
   divDisplayFour.className = "inactive";
 })

 svgKlickSite.addEventListener("mouseover", function() {
     // localStorage functionality:
     storageObject.divDisplay = 4;
     storageIn();
     
   // displaying / hiding divs:
   divDisplayOne.className = "inactive";
   divDisplayTwo.className = "inactive";
   divDisplayThree.className = "inactive";
   divDisplayFour.className = "active";
 })
