
function showTotal(){
    var request= new XMLHttpRequest();
    request.open("get","../index.php?target=accounts&action=giveTotal");
    request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200){
            var response=JSON.parse(this.responseText);
            //console.log(response);
            var div=document.createElement("div");
            div.setAttribute("class","col-lg-12");
            var div2=document.createElement("div");
            div2.setAttribute("class","alert alert-warning text-center");
            var i=document.createElement("i");
            i.setAttribute("class","fa  fa-pencil fa-3x");
            if(response["accNumber"]>0){
                var total = response["income"] - response["expense"];
                i.innerHTML = "Total in all accounts:";
                if (total < 0) {
                    i.innerHTML += "<br>" + total.toFixed(2) + "<br>";
                    i.style.color = "red";
                } else if (total > 0) {
                    i.innerHTML += "<br>" + total.toFixed(2) + "<br>";
                    i.style.color = "green";
                } else {
                    i.innerHTML += "<br>" + total.toFixed(2) + "<br>";
                    i.style.color = "yellow";
                }
            }else{
                i.innerHTML="Still no accounts to show the total available amount!";
            }
            div2.appendChild(i);
            div.appendChild(div2);
            document.getElementById("row2").appendChild(div);
            //console.log(this.responseText); Test

        }
    }
    request.send();
}



function showBiggestIncomeInAccount(){
    var request=new XMLHttpRequest();
    request.open("get","../index.php?target=accounts&action=ShowBiggestIncome");
    request.onreadystatechange=function(){
        if(request.status===200 && request.readyState===4){
            console.log("SHow biggest income"+this.responseText);
            var response=JSON.parse(this.responseText);
            var div=document.createElement("div");
            div.setAttribute("class","col-lg-4");
            var div2=document.createElement("div");
            div2.setAttribute("class","panel panel-primary text-center no-boder");
            var div3=document.createElement("div");
            div3.setAttribute("class","panel-body green");
            var h3= document.createElement("h3");
            if(response["income"]!=null) {
                h3.innerHTML = response["name"];
                h3.innerHTML += "<br>" + response["income"];
            }else{
                h3.innerHTML = "Still no income";
            }
            h3.style.color="white";
            div3.appendChild(h3);
            div2.appendChild(div3);
            div.appendChild(div2);
            document.getElementById("row3").appendChild(div);
        }
    }
    request.send();
}


function showBiggestExpenseInAccount(){
    var request=new XMLHttpRequest();
    request.open("get","../index.php?target=accounts&action=showBiggestExpenseInAccount");
    request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200){
            console.log("SHOW biggest expense" +this.responseText);
            var response=JSON.parse(this.responseText);
            var div=document.createElement("div");
            div.setAttribute("class","col-lg-4");
            var div2=document.createElement("div");
            div2.setAttribute("class","panel panel-primary text-center no-boder");
            var div3=document.createElement("div");
            div3.setAttribute("class","panel-body red");
            var h3= document.createElement("h3");
            if(response["expense"]!=null) {
                h3.innerHTML = response["name"];
                h3.innerHTML += "<br>" + response["expense"];
            }else{
                h3.innerHTML = "Still no expenses";
            }
            h3.style.color="white";
            div3.appendChild(h3);
            div2.appendChild(div3);
            div.appendChild(div2);
            document.getElementById("row3").appendChild(div);

        }
    }
    request.send();
}


function showDiagram(){
    var div = document.createElement("div");
    div.setAttribute("class","col-lg-8");
    var piechart=document.createElement("div");
    piechart.style.width="100%";
    piechart.style.height="400px";
    piechart.setAttribute("id","piechart");


    console.log("chart");
    var request = new XMLHttpRequest();
    request.open("get", "../index.php?target=accounts&action=chartAccountsAmounts");
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
                configChart(chartData);
            } else {
                AmCharts.ready(configChart(chartData));
            }
        }


    }

    request.send();

    div.appendChild(piechart);
    document.getElementById("row3").appendChild(div);

}

function configChart(chartData) {
    for (var i in chartData) {
        chartData[i].Total = Math.abs(chartData[i].Total);
    }
    console.log("am chart ready");
    // PIE CHART
    var chart = new AmCharts.AmPieChart();
    chart.addTitle("Incomes And Expenses", 16);
    chart.dataProvider = chartData;
    chart.titleField = "name";
    chart.valueField = "Total";
    chart.outlineColor = "#FFFFFF";
    chart.outlineAlpha = 0.8;
    chart.outlineThickness = 2;
    chart.balloonText = "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>";
    // this makes the chart 3D
    chart.depth3D = 15;
    chart.angle = 30;
    // WRITE
    chart.write("piechart");




}
