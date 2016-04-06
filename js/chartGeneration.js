var monthToMatch;
var dayToMatch;
var initialDate             =   new Date();
var dateArray               =   [];
var dailyTotalArray         =   [];


// var chinookTotals           =   [];
// var cohoTotals              =   [];
// var steelheadTotals         =   [];

///////////////////////// FUNCTIONS TO PLUG INTO CHARTS ////////////////////////

// needed for speciesPerDamPerYear chart & speciesSplit chart //////////////////
var yearArray               =   [];

function addToYearArray () {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]["Project"] == "BON") {
            yearArray.push(fishCount[dataIndex]["Year"]);
        }
    }
}

addToYearArray();


// needed for speciesPerDamPerYear chart ///////////////////////////////////////
var bvilleChinookArray      =   [];
var dallesChinookArray      =   [];
var bvilleCohoArray         =   [];
var dallesCohoArray         =   [];
var bvilleSteelheadArray    =   [];
var dallesSteelheadArray    =   [];

function addToArray (project,array,species) {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
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


// needed for speciesSplit chart ///////////////////////////////////////////////
var bvilleTotalArray        =   [];
var dallesTotalArray        =   [];

function addToTotalArray (project,array) {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]["Project"] == project) {
            array.push(fishCount[dataIndex]["Chinook"] + fishCount[dataIndex]["Coho"] + fishCount[dataIndex]["Steelhead"]);
        }
    }
}

addToTotalArray("BON", bvilleTotalArray);
addToTotalArray("TDA", dallesTotalArray);


// needed for speciesSplit chart ///////////////////////////////////////////////
var annualChinookPercent    =   [];
var annualCohoPercent       =   [];
var annualSteelheadPercent  =   [];

function addToAnnualSplitArray (arrayTitle,species) {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]["Project"] == "BON") {
            arrayTitle.push(Math.floor(100 * (fishCount[dataIndex][species] / bvilleTotalArray[dataIndex])));
        }
    }
}

addToAnnualSplitArray(annualChinookPercent,"Chinook");
addToAnnualSplitArray(annualCohoPercent,"Coho");
addToAnnualSplitArray(annualSteelheadPercent,"Steelhead");


//
function addToDateArray (range) {
    var doubleRange = 2 * range;
    for (i = 0; i < doubleRange + 1; i++) {
        var newDay = (initialDate.valueOf() - (86400000 * range) + (86400000 * i));
        var date = new Date(newDay);
        var formattedDate = ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2) + '/' +  date.getFullYear();
        dateArray.push(formattedDate);
    }
    console.log(dateArray);
    console.log(dateArray.length);
}

function dateFormatOutput (initialDate) {
    var date = new Date(initialDate);
    var formattedDate = ("0" + (date.getMonth() + 1)).slice(-2) + '/' + ("0" + date.getDate()).slice(-2) + '/' +  date.getFullYear();
    var monthToMatch = formattedDate.slice(0,2);
    var dayToMatch = formattedDate.slice(3,5);
    var yearToMatch = formattedDate.slice(6,10);
    // console.log("Month: " + monthToMatch);
    // console.log("Day: " + dayToMatch);
    // console.log("Year: " + yearToMatch);
}

function padDate (dateString) {
    return ("0" + dateString).slice(-2);
}

function addToMatchingDatesArray (monthToMatch,dayToMatch,yearToMatch) {
    var matchingDatesArray = [];
    for (i = 0; i < bonnevilleDailies.length; i++) {
        var fullDate = new Date(bonnevilleDailies[i]["Date"]);
        var month = padDate(fullDate.getMonth() + 1);
        var day = padDate(fullDate.getDate());
        // console.log(month, day);

        if (padDate(month) == monthToMatch && padDate(day) == dayToMatch) {
            matchingDatesArray.push(bonnevilleDailies[i]);
        }
    }
    return matchingDatesArray;
}

var matchesFound = addToMatchingDatesArray("04","05","2016");

function getTotals () {
    for (i = 0; i < matchesFound.length; i++) {
        var dailyTotal = matchesFound[i]["Chinook"] + matchesFound[i]["Coho"] + matchesFound[i]["Steelhead"]
        dailyTotalArray.push(dailyTotal)
    }
}

function getAverages () {
    var dailyAverage = (dailyTotalArray.reduce(function(a, b) { return a + b; })) / dailyTotalArray.length;
    // console.log(Math.floor(dailyAverage));
    return dailyAverage;
}







// TODO find the matches for dateArray dates
// TODO create constructor for date matches that compiles all date matches within the range, adds them together
// TODO find the most recent data and fill out the chart
// TODO make speciesSplit chart usable with 2015 and up-to-date 2016 data

////////////////////////////////////////////////////////////////////////////////





// needed for dailyComparisons chart
addToDateArray(7);
dateFormatOutput(initialDate);
addToMatchingDatesArray("04","05","2016");
getTotals();
getAverages();



//////////////////////////////// CHART CREATION ////////////////////////////////

function speciesPerDamPerYear(maximum) {

    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $(function () {
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
                formatter: function () {
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
                data: bvilleChinookArray.slice(0,maximum),
                stack: 'Bonneville',
                color: '#ffcccc'
            }, {
                name: 'Bonneville Steelhead',
                data: bvilleSteelheadArray.slice(0,maximum),
                stack: 'Bonneville',
                color: '#ffaaaa'
            }, {
                name: 'Bonneville Coho',
                data: bvilleCohoArray.slice(0,maximum),
                stack: 'Bonneville',
                color: '#ff8888'
            }, {
                name: 'The Dalles Chinook',
                data: dallesChinookArray.slice(0,maximum),
                stack: 'The Dalles',
                color: '#ffeecc'
            }, {
                name: 'The Dalles Steelhead',
                data: dallesSteelheadArray.slice(0,maximum),
                stack: 'The Dalles',
                color: '#ffccaa'
            }, {
                name: 'The Dalles Coho',
                data: dallesCohoArray.slice(0,maximum),
                stack: 'The Dalles',
                color: '#ffaa88'
            }]
        });
    });
}

function speciesSplit(year) {

    $(function () {
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
                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
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
                    data: [["Chinook",annualChinookPercent[year], "#ff8888"], ["Steelhead",annualSteelheadPercent[year], "#ffaaaa"], ["Coho",annualCohoPercent[year], "#ffcccc"]],
                    innerSize: "50%",
                    showInLegend: true,
                    dataLabels: {
                        enabled: false,
                    }
            }]
        });
    });
}

// function dailyComparisons() {
//     function numberWithCommas(number) {
//         return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     }
//
//     $(function () {
//         $('#chartContainer').highcharts({
//             chart: {
//                 type: 'area',
//                 spacingBottom: 30
//             },
//             title: {
//                 text: 'Fruit consumption *'
//             },
//             subtitle: {
//                 text: '* Jane\'s banana consumption is unknown',
//                 floating: true,
//                 align: 'right',
//                 verticalAlign: 'bottom',
//                 y: 15
//             },
//             legend: {
//                 layout: 'vertical',
//                 align: 'left',
//                 verticalAlign: 'top',
//                 x: 150,
//                 y: 100,
//                 floating: true,
//                 borderWidth: 1,
//                 backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
//             },
//             xAxis: {
//                 categories: dateArray
//             },
//             yAxis: {
//                 title: {
//                     text: 'Y-Axis'
//                 },
//                 labels: {
//                     formatter: function () {
//                         return this.value;
//                     }
//                 }
//             },
//             tooltip: {
//                 formatter: function () {
//                     return '<b>' + this.series.name + '</b><br/>' +
//                         this.x + ': ' + this.y;
//                 }
//             },
//             plotOptions: {
//                 area: {
//                     fillOpacity: 0.5
//                 }
//             },
//             credits: {
//                 enabled: false
//             },
//             series: [{
//                 name: 'John',
//                 data: [0, 1, 4, 4, 5, 2, 3, 7]
//             }, {
//                 name: 'Jane',
//                 data: [1, 0, 3, 5, 6, null, null, null]
//             }]
//         });
//     });
// };

// speciesPerDamPerYear(10);   // pass it a range: 10, 25, 50
// speciesSplit(0);            // pass it an year: 0 = 2014, 1 = 2013 ...
// dailyComparisons(7);        // pass it a range: 7, 30, 182
