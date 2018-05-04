function wrongExpensesStat() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "../index.php?target=budget&action=wrongBudgeting");
    xhr.onreadystatechange = function () {
        if (!(xhr.readyState === 4 && xhr.status === 200)) {
            if(request.status===401){
                window.location.href="login.html";
            }
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
                chart.write("wrong");
            });
        }
    }
    xhr.send();
}