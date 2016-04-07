////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// needed for speciesPerDamPerYear chart & speciesSplit chart //////////////////

var yearArray = [];

function addToYearArray() {
    for (var dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]["Project"] == "BON") {
            yearArray.push(fishCount[dataIndex]["Year"]);
        }
    }
}

addToYearArray();

// needed for speciesPerDamPerYear chart ///////////////////////////////////////

var bvilleChinookArray = [];
var dallesChinookArray = [];
var bvilleCohoArray = [];
var dallesCohoArray = [];
var bvilleSteelheadArray = [];
var dallesSteelheadArray = [];

function addToArray(project, array, species) {
    for (var dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]["Project"] == project) {
            array.push(fishCount[dataIndex][species]);
        }
    }
}

addToArray("BON", bvilleChinookArray, "Chinook");
addToArray("BON", bvilleCohoArray, "Coho");
addToArray("BON", bvilleSteelheadArray, "Steelhead");
addToArray("TDA", dallesChinookArray, "Chinook");
addToArray("TDA", dallesCohoArray, "Coho");
addToArray("TDA", dallesSteelheadArray, "Steelhead");

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// needed for speciesSplit chart ///////////////////////////////////////////////

var bvilleTotalArray = [];
var dallesTotalArray = [];

function addToTotalArray(project, array) {
    for (var dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]["Project"] == project) {
            array.push(fishCount[dataIndex]["Chinook"] + fishCount[dataIndex]["Coho"] + fishCount[dataIndex]["Steelhead"]);
        }
    }
}

addToTotalArray("BON", bvilleTotalArray);
addToTotalArray("TDA", dallesTotalArray);

// needed for speciesSplit chart ///////////////////////////////////////////////

var annualChinookPercent = [];
var annualCohoPercent = [];
var annualSteelheadPercent = [];

function addToAnnualSplitArray(arrayTitle, species) {
    for (var dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]["Project"] == "BON") {
            arrayTitle.push(Math.floor(100 * (fishCount[dataIndex][species] / bvilleTotalArray[dataIndex])));
        }
    }
}

addToAnnualSplitArray(annualChinookPercent, "Chinook");
addToAnnualSplitArray(annualCohoPercent, "Coho");
addToAnnualSplitArray(annualSteelheadPercent, "Steelhead");

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
// CURRENT DATA LINE ///////////////////////////////////////////////////////////
// needed for dailyComparisons chart // isolates the range of dates to show ////

var dateArray = [];
var dailyDateArray = [];
var initialDate = new Date();

function addToDateArray(range) {
    var doubleRange = 2 * range;
    for (i = 0; i < doubleRange + 1; i++) {
        var newDay = (initialDate.valueOf() - (86400000 * range) + (86400000 * i) );
        var date = new Date(newDay);
        var formattedDate = ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2) + '/' + date.getFullYear();
        var shortDate = (date.getMonth() + 1) + '/' + (date.getDate());
        dateArray.push(formattedDate);
        dailyDateArray.push(shortDate);
    }
}

// addToDateArray(7);


// needed for dailyComparisons chart // finds the data for most recent dates ///

var monthToMatch;
var dayToMatch;

function getMonthToMatch(arrayToSearch) {
    for (var i = 0; i < arrayToSearch.length; i++) {
        var monthToMatch = dateArray[i].slice(0, 2)
        var dayToMatch = dateArray[i].slice(3, 5)
    }
}

getMonthToMatch(dateArray);

// needed for dailyComparisons chart // finds the data for most recent dates ///

var mostRecentDataArray = [];

function addToMostRecentArray(range) {
    var latest = bonnevilleDailies.slice(-range - 1)
    mostRecentDataArray = latest;
}

addToMostRecentArray(7);
    // console.log(mostRecentDataArray);

// needed for dailyComparisons chart // calcs total fish for the most recent dates //

var mostRecentTotals = [];

function addToMostRecentTotals() {
    for (i = 0; i < mostRecentDataArray.length; i++) {
        mostRecentTotals.push(mostRecentDataArray[i]["Chinook"] + mostRecentDataArray[i]["Coho"] + mostRecentDataArray[i]["Steelhead"]);
    }
}

addToMostRecentTotals();


// HISTORICAL DATA LINE ////////////////////////////////////////////////////////
// needed for dailyComparisons chart // finds the matching dates in history ////

var today = bonnevilleDailies.slice(-1);

var matchingDatesArray = [];

function addToMatchingDatesArray(monthToMatch, dayToMatch) {
    for (i = 0; i < bonnevilleDailies.length; i++) {

        var fullDate = new Date(bonnevilleDailies[i]["Date"]);
        var formattedDate = ("0" + (fullDate.getMonth() + 1)).slice(-2) + '/' + ("0" + fullDate.getDate()).slice(-2) + '/' + fullDate.getFullYear();

        var month = ("0" + (fullDate.getMonth() + 1)).slice(-2).toString();
        var day = ("0" + fullDate.getDate()).slice(-2).toString();
        // console.log(month == monthToMatch && day == dayToMatch);

        if (month === monthToMatch && day === dayToMatch) {
            // console.log('ran true', bonnevilleDailies[i]);
            matchingDatesArray.push(bonnevilleDailies[i]);
        }
    }
    // console.log(matchingDatesArray);
    return matchingDatesArray;
}

for (var ii = 0; ii < dateArray.length; ii++) {
    addToMatchingDatesArray(dateArray[ii].slice(0, 2), dateArray[ii].slice(3, 5));
}
// console.log(matchingDatesArray);

// needed for dailyComparisons chart ///////////////////////////////////////////
var allSpeciesAverage = [];

function monthDayString(ep) {
  var newEp = new Date(ep);
  var month = newEp.getMonth() + 1;
  var day   = newEp.getDate();
  return month + '/' + day;
}
function allDaysForAllFishies() {
  var species = ["Chinook", "Steelhead", "Coho"];
  var epoch_day_incr = 24*60*60*1000;
  // Arbitrary date that contains 2000. Use a leap year!
  var d = new Date(2000, 0, 1); // Jan 1
  // var p = d.getTime(); // Convert to epoch
  for (var dd = 0; dd < dailyDateArray.length; dd++) {
    var mds = dailyDateArray[dd];
    // console.log(mds);
    // console.log(dailyDateArray);
    var mdMatches = fish.filter(function(el) { return el.Date.slice(0,-5) == mds; });
    var sum = mdMatches.reduce( function(sum, b) {
      return sum + b[species[0]] + b[species[1]] + b[species[2]]; }, 0);
      var avg = sum/mdMatches.length;
    //   console.log(avg);
      allSpeciesAverage.push(Math.floor(avg));
    // console.log(mds + ' ('+mdMatches.length+' years): Avg across all species = ' + sum/mdMatches.length);
    // p += epoch_day_incr; // Increment epoch by one day
  }
}
// allDaysForAllFishies();

console.log(allSpeciesAverage);





////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// CHART CREATION ////////////////////////////////

function speciesPerDamPerYear(maximum) {

    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    $(function() {
        $("#chartContainer").highcharts({
            chart: {
                type: "column",
            },
            title: {
                text: ""
            },
            xAxis: {
                categories: yearArray
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Salmon Counted"
                },
                stackLabels: {
                    enabled: false
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + numberWithCommas(this.y) + '<br/>' +
                        'Total: ' + numberWithCommas(this.point.stackTotal);
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                }
            },
            series: [{
                name: 'Bonneville Chinook',
                data: bvilleChinookArray.slice(0, maximum),
                stack: 'Bonneville',
                color: '#ffcccc'
            }, {
                name: 'Bonneville Steelhead',
                data: bvilleSteelheadArray.slice(0, maximum),
                stack: 'Bonneville',
                color: '#ffaaaa'
            }, {
                name: 'Bonneville Coho',
                data: bvilleCohoArray.slice(0, maximum),
                stack: 'Bonneville',
                color: '#ff8888'
            }, {
                name: 'The Dalles Chinook',
                data: dallesChinookArray.slice(0, maximum),
                stack: 'The Dalles',
                color: '#ffeecc'
            }, {
                name: 'The Dalles Steelhead',
                data: dallesSteelheadArray.slice(0, maximum),
                stack: 'The Dalles',
                color: '#ffccaa'
            }, {
                name: 'The Dalles Coho',
                data: dallesCohoArray.slice(0, maximum),
                stack: 'The Dalles',
                color: '#ffaa88'
            }]
        });
    });
}

function speciesSplit(year) {

    $(function() {
        Highcharts.setOptions({
            colors: ['#ffcccc', '#ffaaaa', '#ff8888']
        });
        var chart;

        $('#chartContainer').highcharts({
            chart: {
                type: 'pie',
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: yearArray
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Salmon Counted'
                },
                stackLabels: {
                    enabled: false
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
                }
            },
            plotOptions: {
                column: {
                    shadow: 'false',
                },
                pie: {
                    borderColor: 'null'
                }
            },
            series: [{
                name: "Species Percentage",
                data: [
                    ["Chinook", annualChinookPercent[year], "#ff8888"],
                    ["Steelhead", annualSteelheadPercent[year], "#ffaaaa"],
                    ["Coho", annualCohoPercent[year], "#ffcccc"]
                ],
                innerSize: "50%",
                showInLegend: true,
                dataLabels: {
                    enabled: false,
                }
            }]
        });
    });
}

function dailyComparisons(range) {
    addToDateArray(range);
    allDaysForAllFishies();
    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    $(function() {
        $('#chartContainer').highcharts({
            chart: {
                type: 'area',
            },
            title: {
                text: ''
            },

            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                categories: dateArray
            },
            yAxis: {
                title: {
                    text: 'Number of fish'
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.1
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Historical Daily Average',
                color: "#ff8888",
                data: allSpeciesAverage
            }, {
                name: "Most Recent Week's Data",
                color: "#ffaa88",
                data: mostRecentTotals
            }]
        });
    });
}

// speciesPerDamPerYear(10);   // pass it a range: 10, 25, 50
// speciesSplit(0);            // pass it an year: 0 = 2014, 1 = 2013 ...
dailyComparisons(7);        // pass it a range: 7, 30, 182
