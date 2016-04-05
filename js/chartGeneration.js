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

function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function addToYearArray () {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]['Project'] == "BON") {
            yearArray.push(fishCount[dataIndex]['Year']);
        }
    }
}

function addToArray (project,array,species) {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]['Project'] == project) {
            array.push(fishCount[dataIndex][species]);
        }
    }
}

function addToTotalArray (project,array) {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]['Project'] == project) {
            array.push(fishCount[dataIndex]['Chinook'] + fishCount[dataIndex]['Coho'] + fishCount[dataIndex]['Steelhead']);
        }
    }
}

function addToAnnualSplitArray(arrayTitle,species) {
    for (dataIndex = 0; dataIndex < fishCount.length; dataIndex++) {
        if (fishCount[dataIndex]['Project'] == "BON") {
            arrayTitle.push(Math.floor(100 * (fishCount[dataIndex][species] / bvilleTotalArray[dataIndex])));
        }
    }
}

addToYearArray();
addToArray("BON", bvilleChinookArray, "Chinook");       // Generates total of Chinook in Bonneville each year
addToArray("BON", bvilleCohoArray, "Coho");             // Generates total number of Coho in Bonneville each year
addToArray("BON", bvilleSteelheadArray, "Steelhead");   // Generates total number of Steelhead in Bonneville each year
addToArray("TDA", dallesChinookArray, "Chinook");       // Generates total number of Chinook in The Dalles each year
addToArray("TDA", dallesCohoArray, "Coho");             // Generates total number of Coho in The Dalles each year
addToArray("TDA", dallesSteelheadArray, "Steelhead");   // Generates total number of Steelhead in The Dalles each year
addToTotalArray("BON", bvilleTotalArray);               // Generates total number of ALL Salmon species in Bonneville each year
addToTotalArray("TDA", dallesTotalArray);               // Generates total number of ALL Salmon species in The Dalles each year
addToAnnualSplitArray(annualChinookPercent,"Chinook");
addToAnnualSplitArray(annualCohoPercent,"Coho");
addToAnnualSplitArray(annualSteelheadPercent,"Steelhead");

function speciesPerDamPerYear(maximum) {
    $(function () {
        $('#historicalAnnualTotals').highcharts({
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

// speciesPerDamPerYear(10)    // 10, 25, 50

function speciesSplit(index) {
    $(function () {
        $('#historicalAnnualTotals').highcharts({
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
                }
            },
            series: [{
                name: "Species Percentage",
                data: [["Chinook",annualChinookPercent[index]], ["Steelhead",annualSteelheadPercent[index]], ["Coho",annualCohoPercent[index]]],
                innerSize: '50%',
                showInLegend: true,
                dataLabels: {
                    enabled: false,
                }
                // color: '#ff0000'
            }]
        });
    });
}

speciesSplit(0);            // 0 = 2014, 1 = 2013 ...
