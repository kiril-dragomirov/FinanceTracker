function TransactionIncomeExpenseChart(id) {

    var mainDiv = document.getElementById("chart");
    mainDiv.innerHTML = ""; //Clean the div everytime it is invoked
    // mainDiv.setAttribute("class", "col-lg-12");
    mainDiv.style.width = "100%";
    mainDiv.style.height = "400px";


    var request = new XMLHttpRequest();
    request.open("get", "../index.php?target=transactions&action=chartIncomeExpenses&ia=" + id);
    request.onreadystatechange = function () {
        if (!(request.readyState === 4 && request.status === 200)) {
        }else{
            var response = JSON.parse(this.responseText);
            console.log(response);
            var chart;
            var legend;
            var dar = response;
            console.log(dar);
            var chartData = dar;
            AmCharts.ready(function () {
                // PIE CHART
                chart = new AmCharts.AmPieChart();
                chart.addTitle("Incomes And Expenses", 16);
                chart.dataProvider = chartData;
                chart.titleField = "kkey";
                chart.valueField = "valuee";
                chart.outlineColor = "#FFFFFF";
                chart.outlineAlpha = 0.8;
                chart.outlineThickness = 2;
                chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
                // this makes the chart 3D
                chart.depth3D = 15;
                chart.angle = 30;
                // WRITE
                chart.write("chart");

            });
        }


    }

    request.send();

}