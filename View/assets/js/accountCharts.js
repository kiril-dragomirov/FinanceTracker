
    var AccDivChart = document.getElementById("chart");
    var mainDivChart = document.createElement("div");
    var selectAccChart = document.createElement("select");
    selectAccChart.setAttribute("class", "form-control");
    var LabelSelectAcc = document.createElement("p");
    LabelSelectAcc.innerHTML = "Selected Account";
    mainDivChart.appendChild(LabelSelectAcc);
//AJAX to catch all accounts names + their ids;
    var requestChartAcc = new XMLHttpRequest();
    requestChartAcc.open("get", "../index.php?target=accounts&action=accName&accName=get");
    requestChartAcc.onreadystatechange = function () {
        if (requestChartAcc.status === 200 && requestChartAcc.readyState === 4) {
            var response = JSON.parse(this.responseText);
            var option = document.createElement("option");
            option.innerHTML = "All";
            option.value = "all";
            selectAccChart.appendChild(option);
            for (var item in response) {
                var option = document.createElement("option");
                option.innerHTML = response[item]["name"];
                option.value = response[item]["id"];
                if (response[item]["id"] == id) {
                    option.selected = "selected";
                }
                selectAccChart.appendChild(option);
            }
            //console.log(JSON.parse(this.responseText)); TEST
        }
    }
    requestChartAcc.send();
//End of ajax
//Getting the selected id from drop down menu;
    var id="all";
    selectAccChart.onchange = function () {
        if (this.value != id) {
            //updating id with the selected acc id!
            //Later we will use id to for the transaction in DB;
            id = this.value;
            console.log(id);
        }
        categoryChartDisplay(id,typeChartId)
    };
    mainDivChart.appendChild(selectAccChart);
    AccDivChart.appendChild(mainDivChart);

    var divTypeChart=document.createElement("div");
    var selectTypeChart = document.createElement("select");
    selectTypeChart.setAttribute("class", "form-control");
    var pTypeTransaction = document.createElement("p");
    pTypeTransaction.innerHTML = "Select Type of transaction";
    divTypeChart.appendChild(pTypeTransaction);
    var requestTypeChart = new XMLHttpRequest();
    requestTypeChart.open("get", "../index.php?target=accounts&action=transType&transType=get");
    requestTypeChart.onreadystatechange = function () {
        if (requestTypeChart.status === 200 && requestTypeChart.readyState === 4) {
            var responseType = JSON.parse(this.responseText);
            for (var i in responseType) {
                var optionType = document.createElement("option");
                optionType.innerHTML = responseType[i]["name"];
                optionType.value = responseType[i]["id"];
                selectTypeChart.appendChild(optionType);
            }
        }
    }
    requestTypeChart.send();
    divTypeChart.appendChild(selectTypeChart);
    AccDivChart.appendChild(divTypeChart);
    var typeChartId = 1; //default the transactions will be income.
    selectTypeChart.onchange = function () {
        //updating id with the selected acc id!
        typeChartId = this.value;
        console.log(typeChartId);
        categoryChartDisplay(id,typeChartId)

    };

    var divCategoryChart=document.createElement("div");
    divCategoryChart.id="categoryChart";
    divCategoryChart.style.width="100%";
    divCategoryChart.style.height="400px"
    AccDivChart.appendChild(divCategoryChart);
    categoryChartDisplay(id,typeChartId)

    function categoryChartDisplay(acc_id,type_id){

        var request = new XMLHttpRequest();
        request.open("get", "../index.php?target=transactions&action=chartCategory&accId=" + acc_id+"&typeId="+type_id);
        request.onreadystatechange = function () {
            if (!(request.readyState === 4 && request.status === 200)) {
            }else{
                var response =JSON.parse(this.responseText);
                console.log(response);
                var legend;
                var dar = response;
                console.log(dar);
                var chartData = dar;
                if (AmCharts.isReady) {
                    chartCategory(chartData);
                } else {
                    AmCharts.ready(chartCategory(chartData));
                }
            }


        }

        request.send();


    }

    function chartCategory(chartData) {
        console.log("am chart ready");
        // PIE CHARTconsole.log("am chart writing");
        var chart = new AmCharts.AmPieChart();

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

        chart.write("categoryChart");
    }