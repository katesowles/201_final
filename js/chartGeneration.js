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
var initialDate = new Date();

function addToDateArray(range) {
    var doubleRange = 2 * range;
    for (i = 0; i < doubleRange + 1; i++) {
        var newDay = (initialDate.valueOf() - (86400000 * range) + (86400000 * i));
        var date = new Date(newDay);
        var formattedDate = ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2) + '/' + date.getFullYear();
        dateArray.push(formattedDate);
    }
}

addToDateArray(7);


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

// function sum( obj ) {
//   var sum = 0;
//   for( var el in obj ) {
//     if( obj.hasOwnProperty( el ) ) {
//         // console.log(obj[el]);
//       sum += parseFloat( obj[el] );
//     }
//   }
//   // console.log(sum);
//   return sum;
// }
// if(bonnevilleDailies.hasOwnProperty('3/30/1966')) {
//     console.log('date match');
// }
// sum(bonnevilleDailies);
//

var matchDate = [];
for (var kk = 0; kk < bonnevilleDailies.length; kk++) {
    var searchDates = bonnevilleDailies[kk];
    if (searchDates.date == "3/30/1966") {
        matchDate.push(searchDates);
        console.log("matchFound");
        break
    }
}
console.log(matchDate);

var id = 2,
    found = false;
for (var i=0; i<bonnevilleDailies.length; i++) {
    if (bonnevilleDailies[i].id == id) {
        found = true;
        console.log(found);
        break;
    }
}














//
// var dailyTotalObject = {};
//
// var dailyTotalAverages = {};
//
// function getTotals() {
//     var counter = 0;
//
//     for (var i = 0; i < matchingDatesArray.length - 1; i++) {
//         if (matchingDatesArray[i]['Date'].slice(0, 4) === matchingDatesArray[i + 1]['Date'].slice(0, 4)) {
//             counter++;
//             var result = [matchingDatesArray[i + 1]["Chinook"] + matchingDatesArray[i + 1]["Coho"] + matchingDatesArray[i + 1]["Steelhead"], matchingDatesArray[i]["Chinook"] + matchingDatesArray[i]["Coho"] + matchingDatesArray[i]["Steelhead"]];
//
//
//             dailyTotalObject[matchingDatesArray[i]['Date']] = Math.floor(avg);
//
//             //some object with one date equally the total of all of that day over history = sum(dailyTotalObject);
//         } else {
//             var avg = result.reduce(function(a, b) { return a + b; }) / counter;
//
//             console.log(dailyTotalObject);
//             // console.log(matchingDatesArray);
//
//             counter = 0;
//
//         }
//
//         // console.log(counter);
//
//     }
// }
//
// // console.log(dailyTotalAverages);
//
//
//
// // function sumYears() {
// //     var result = []
// //     result.push(dailyTotalObject);
// //     // console.log(result);
// //     for (var i = 0; i < result.length; i++) {
// //
// //     }
// // }
// // sumYears();
// getTotals();



// needed for dailyComparisons chart ///////////////////////////////////////////
// var dailyTotalArray = [];
//
// function getTotals () {
//     console.log(matchingDatesArray.length);
//     console.log(matchingDatesArray);
//
//     for (i = 0; i < matchingDatesArray.length -1; i++) {
//         var counter = 0;
//         if (matchingDatesArray[i]['Date'].slice(0, 4) === matchingDatesArray[i + 1]['Date'].slice(0, 4)) {
//             counter++;
//             var result = [matchingDatesArray[i + 1]["Chinook"] + matchingDatesArray[i + 1]["Coho"] + matchingDatesArray[i + 1]["Steelhead"], matchingDatesArray[i]["Chinook"] + matchingDatesArray[i]["Coho"] + matchingDatesArray[i]["Steelhead"]];
//
//             // var avg = result.reduce(function(a, b) { return a + b }) / 50;
//
//             var dailyTotal = matchingDatesArray[i]["Chinook"] + matchingDatesArray[i]["Coho"] + matchingDatesArray[i]["Steelhead"]
//             dailyTotalArray.push(dailyTotal)
//     }
//     // console.log(avg);
//
// }
// }
// getTotals();
//
// // needed for dailyComparisons chart ///////////////////////////////////////////
// function getAverages () {
//     var dailyAverage = (dailyTotalArray.reduce(function(a, b) { return a + b; })) / dailyTotalArray.length;
//     // console.log(Math.floor(dailyAverage));
//     return dailyAverage;
// }
// // getAverages();







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
                text: "Annual Salmon Count"
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
                text: 'Species Share @ Bonneville Dam'
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
    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    $(function() {
        $('#chartContainer').highcharts({
            chart: {
                type: 'area',
            },
            title: {
                text: 'Historical Daily Average vs Most Recent Week'
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
                    fillOpacity: 0.3
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Historical Daily Average',
                color: "#ff8888",
                data: [0, 1, 4, 4, 5, 2, 3, 7, 9, 13, 15, 15, 14, 18, 22]
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
dailyComparisons(7); // pass it a range: 7, 30, 182
