 var outterOne = document.getElementById('outterOne');
 var outterTwo = document.getElementById('outterTwo');
 var outterThree = document.getElementById('outterThree');
 var outterFour = document.getElementById('outterFour');

var divDisplayOne = document.getElementById("bonnevilleDam");
var divDisplayTwo = document.getElementById("eagleCreekTrailhead");
var divDisplayThree = document.getElementById("klickitatRiverFalls");
var divDisplayFour = document.getElementById("hermanCreekTrailhead");

divDisplayOne.className = "inactive";
divDisplayTwo.className = "inactive";
divDisplayThree.className = "inactive";
divDisplayFour.className = "inactive";

 outterOne.addEventListener("mouseover", function() {
    console.log("one");
    divDisplayOne.className = "active";
    divDisplayTwo.className = "inactive";
    divDisplayThree.className = "inactive";
    divDisplayFour.className = "inactive";
 })

 outterTwo.addEventListener("mouseover", function() {
    console.log("two");
    divDisplayOne.className = "inactive";
    divDisplayTwo.className = "active";
    divDisplayThree.className = "inactive";
    divDisplayFour.className = "inactive";
 })

 outterThree.addEventListener("mouseover", function() {
   console.log("three");
   divDisplayOne.className = "inactive";
   divDisplayTwo.className = "inactive";
   divDisplayThree.className = "active";
   divDisplayFour.className = "inactive";
 })

 outterFour.addEventListener("mouseover", function() {
   console.log("four");
   divDisplayOne.className = "inactive";
   divDisplayTwo.className = "inactive";
   divDisplayThree.className = "inactive";
   divDisplayFour.className = "active";
 })
