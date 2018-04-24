
var xhr = new XMLHttpRequest();
xhr.open("get", "../index.php?target=budget&action=makeStatistic");
xhr.onreadystatechange = function () {
    if (!(xhr.readyState === 4 && xhr.status === 200)) {

    } else {
        var chart;
        var legend;


        var dar = this.responseText;
        console.log(dar);
        console.log("da");
        var chartData = JSON.parse(dar);
        // var chartData = [
        //     {
        //         "groups": "m",
        //         "counter": 34
        //     },{
        //         "groups": "w",
        //         "counter": 23
        //     }
        // ];

        AmCharts.ready(function () {
            // PIE CHART
            chart = new AmCharts.AmPieChart();
            chart.addTitle("Age", 16);
            chart.dataProvider = chartData;
            chart.titleField = "category";
            chart.valueField = "counter";
            chart.outlineColor = "#FFFFFF";
            chart.outlineAlpha = 0.8;
            chart.outlineThickness = 2;
            chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
            // this makes the chart 3D
            chart.depth3D = 15;
            chart.angle = 30;

            // WRITE
            chart.write("chartdiv");
        });
    }
}
xhr.send();
