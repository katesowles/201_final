/*
To use plug in names and functions into functionsArray and list of functions
below respectively. 
*/

var functionsArray = [chartOne, chartTwo, chartThree, chartFour, chartFive, chartSix, chartSeven, chartEight, chartNine];

var dropDownEvent = document.getElementById("dropDown");

dropDownEvent.addEventListener("change", function() {
  // alert("poopybutts");
  var dropDownIndex = document.getElementById('dropDown').selectedIndex;
  // alert(aa+1);

  functionsArray[dropDownIndex](); // dropDownIndex is equal to the index value of functionsArray

})


function chartOne() {
  alert("functionOne");
}

function chartTwo() {
  alert("functionTwo");
}

function chartThree() {
  alert("functionThree");
}

function chartFour() {
  alert("functionFour");
}

function chartFive() {
  alert("functionFive");
}

function chartSix() {
  alert("functionSix");
}

function chartSeven() {
  alert("functionSeven");
}

function chartEight() {
  alert("functionEight");
}

function chartNine() {
  alert("functionNine");
}
