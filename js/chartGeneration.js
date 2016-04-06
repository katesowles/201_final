var initialDate = new Date();
var dateArray               =   [];
var yearArray               =   [];
var bvilleChinookArray      =   [];
var dallesChinookArray      =   [];
var bvilleCohoArray         =   [];
var dallesCohoArray         =   [];
var bvilleSteelheadArray    =   [];
var dallesSteelheadArray    =   [];
var bvilleTotalArray        =   [];
var dallesTotalArray        =   [];

var chinookTotals           =   [];
var cohoTotals              =   [];
var steelheadTotals         =   [];
var annualChinookPercent    =   [];
var annualCohoPercent       =   [];
var annualSteelheadPercent  =   [];

///////////////////////// FUNCTIONS TO PLUG INTO CHARTS ////////////////////////

function addToYearArray () {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]["Project"] == "BON") {
            yearArray.push(fishCount[dataIndex]["Year"]);
        }
    }
}

function addToArray (project,array,species) {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]["Project"] == project) {
            array.push(fishCount[dataIndex][species]);
        }
    }
}

function addToTotalArray (project,array) {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]["Project"] == project) {
            array.push(fishCount[dataIndex]["Chinook"] + fishCount[dataIndex]["Coho"] + fishCount[dataIndex]["Steelhead"]);
        }
    }
}

function addToAnnualSplitArray(arrayTitle,species) {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]["Project"] == "BON") {
            arrayTitle.push(Math.floor(100 * (fishCount[dataIndex][species] / bvilleTotalArray[dataIndex])));
        }
    }
}

function addToDateArray (range) {
    var doubleRange = 2 * range;
    for (i = 0; i < doubleRange + 1; i++) {
        var newDay = (initialDate.valueOf() - (86400000 * range) + (86400000 * i));
        var whatever = new Date(newDay);
        var formatedDate = (whatever.getMonth() + 1) + '/' + whatever.getDate() + '/' +  whatever.getFullYear();
        dateArray.push(formatedDate);
    }
    console.log(dateArray);
}

// TODO find the matches for dateArray dates
// TODO create constructor for date matches that compiles all date matches within the range, adds them together
// TODO find the most recent data and fill out the chart
// TODO make speciesSplit chart usable with 2015 and up-to-date 2016 data

////////////////////////////////////////////////////////////////////////////////

// needed for speciesPerDamPerYear chart & speciesSplit chart
addToYearArray();

// needed for speciesPerDamPerYear chart
addToArray("BON", bvilleChinookArray, "Chinook");       // Generates total of Chinook in Bonneville each year
addToArray("BON", bvilleCohoArray, "Coho");             // Generates total number of Coho in Bonneville each year
addToArray("BON", bvilleSteelheadArray, "Steelhead");   // Generates total number of Steelhead in Bonneville each year
addToArray("TDA", dallesChinookArray, "Chinook");       // Generates total number of Chinook in The Dalles each year
addToArray("TDA", dallesCohoArray, "Coho");             // Generates total number of Coho in The Dalles each year
addToArray("TDA", dallesSteelheadArray, "Steelhead");   // Generates total number of Steelhead in The Dalles each year

// needed for speciesSplit chart
addToTotalArray("BON", bvilleTotalArray);               // Generates total number of ALL Salmon species in Bonneville each year
addToTotalArray("TDA", dallesTotalArray);               // Generates total number of ALL Salmon species in The Dalles each year
addToAnnualSplitArray(annualChinookPercent,"Chinook");  // Generates an array with the annual total of Chinook in Bonneville
addToAnnualSplitArray(annualCohoPercent,"Coho");        // Generates an array with the annual total of Coho in Bonneville
addToAnnualSplitArray(annualSteelheadPercent,"Steelhead");  // Generates an array with the annual total of Steelhead in Bonneville

// needed for dailyComparisons chart
addToDateArray(7);

//////////////////////////////// CHART CREATION ////////////////////////////////

function speciesPerDamPerYear(maximum) {

    function numberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $(function () {
        $('#speciesPerDamPerYear').highcharts({
            chart: {
                type: 'column',
            },
            title: {
                text: 'Annual Salmon Count'
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

        $('#speciesSplit').highcharts({
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
    // function numberWithCommas(number) {
    //     return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

    $(function () {
        $('#dailyComparisons').highcharts({
            chart: {
                type: 'area',
                spacingBottom: 30
            },
            title: {
                text: 'Fruit consumption *'
            },
            subtitle: {
                text: '* Jane\'s banana consumption is unknown',
                floating: true,
                align: 'right',
                verticalAlign: 'bottom',
                y: 15
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
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
                    text: 'Y-Axis'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'John',
                data: [0, 1, 4, 4, 5, 2, 3, 7]
            }, {
                name: 'Jane',
                data: [1, 0, 3, 5, 6, null, null, null]
            }]
        });
    });
};

// speciesPerDamPerYear(10);   // pass it a range: 10, 25, 50
// speciesSplit(0);            // pass it an year: 0 = 2014, 1 = 2013 ...
// dailyComparisons(7);        // pass it a range: 7, 30, 365
