/*
To use plug in names and functions into functionsArray and list of functions
below respectively.
*/

var chartFunctionsArray = [chartOne, chartTwo, chartThree, chartFour, chartFive, chartSix, chartSeven];

var dropDownEvent = document.getElementById("dropDown");
var container = document.getElementById("chartContainer");
var chartTitle = document.getElementById("chartLabel");

dropDownEvent.addEventListener("change", function() {
  // alert("poopybutts");
  var dropDownIndex = document.getElementById('dropDown').selectedIndex;
  // alert(aa+1);

  chartFunctionsArray[dropDownIndex](); // dropDownIndex is equal to the index value of functionsArray

})


function chartOne() {
    // container.destroy();
    storageObject.chartNumber = 0;
    chartTitle.textContent = "Historical Daily Averages vs Most Recent Week";
    storageIn();
    dailyComparisons(7);
}

function chartTwo() {
    // container.destroy();
    storageObject.chartNumber = 1;
    chartTitle.textContent = "Annual Salmon Count, Last 10 Years";
    storageIn();
    speciesPerDamPerYear(10);
}

function chartThree() {
    // container.destroy();
    storageObject.chartNumber = 2;
    chartTitle.textContent = "Annual Salmon Count, Last 25 Years";
    storageIn();
    speciesPerDamPerYear(25);
}

function chartFour() {
    // container.destroy();
    storageObject.chartNumber = 3;
    chartTitle.textContent = "Annual Salmon Count, Last 50 Years";
    storageIn();
    speciesPerDamPerYear(50);
}

function chartFive() {
    // container.destroy();
    storageObject.chartNumber = 4;
    chartTitle.textContent = "Species Split, 2014";
    storageIn();
    speciesSplit(0);
}

function chartSix() {
    // container.destroy();
    storageObject.chartNumber = 5;
    chartTitle.textContent = "Species Split, 2009";
    storageIn();
    speciesSplit(5);
}

function chartSeven() {
    // container.destroy();
    storageObject.chartNumber = 6;
    chartTitle.textContent = "Species Split, 2004";
    storageIn();
    speciesSplit(10);
}
