function categoryStat() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "../index.php?target=budget&action=selectCategories");
    xhr.onreadystatechange = function () {
        if (!(xhr.readyState === 4 && xhr.status === 200)) {

        } else {
            var chart;
            var legend;


            var dar = this.responseText;
            console.log(dar);
            var chartData = JSON.parse(dar);

            AmCharts.ready(function () {
                // PIE CHART
                chart = new AmCharts.AmPieChart();
                chart.addTitle("Different categories", 16);
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
}

function amountBudgetStat(){
    var request = new XMLHttpRequest();
    request.open("get","../index.php?target=budget&action=selectCategoryAmount");
    request.onreadystatechange = function (ev) {
        if(request.status === 200 && request.readyState === 4) {
            var response = JSON.parse(this.responseText);
            console.log(response);

            var chart = AmCharts.makeChart("chart", {
                "theme": "light",
                "type": "serial",
                "startDuration": 2,
                "dataProvider": response,
                "valueAxes": [{
                    "position": "left",
                    "title": "Amount money"
                }],
                "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillColorsField": "color",
                    "fillAlphas": 1,
                    "lineAlpha": 0.1,
                    "type": "column",
                    "valueField": "amount"
                }],
                "depth3D": 20,
                "angle": 30,
                "chartCursor": {
                    "categoryBalloonEnabled": false,
                    "cursorAlpha": 0,
                    "zoomable": false
                },
                "categoryField": "category",
                "categoryAxis": {
                    "gridPosition": "start",
                    "labelRotation": 90
                },
                "export": {
                    "enabled": false
                }

            });
        }
    }
    request.send();
}
