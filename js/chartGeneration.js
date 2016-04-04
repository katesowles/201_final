$(function () {
    $('#historicalAnnualSum').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Annual Salmon Count'
        },
        xAxis: {
            categories: yearArray
        },
        yAxis: {
            title: {
                text: 'Salmon Counted'
            }
        },
        series: [{
            name: 'Bonneville',
            data: bvilleTotals
        }, {
            name: 'The Dalles',
            data: dallesTotals
        }]
    });
});
