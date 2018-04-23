
function showTotal(){
    var request= new XMLHttpRequest();
    request.open("get","../index.php?target=accounts&action=giveTotal&give=total");
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
                    i.innerHTML += "<br>" + total + "<br>";
                    i.style.color = "red";
                } else if (total > 0) {
                    i.innerHTML += "<br>" + total + "<br>";
                    i.style.color = "green";
                } else {
                    i.innerHTML += "<br>" + total + "<br>";
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
    request.open("get","../index.php?target=accounts&action=ShowBiggestIncome&income=give");
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
    request.open("get","../index.php?target=accounts&action=showBiggestExpenseInAccount&expense=give");
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
    piechart.setAttribute("id","piechart");

    console.log("chart");
    var request= new XMLHttpRequest();
    request.open("get","../index.php?target=accounts&action=giveTotal&give=total");
    request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200) {
            var response = JSON.parse(this.responseText);
            console.log(response);

            var income = response["income"];
            console.log(income);
            if(income==null){
                income=0
            }
            var expense = response["expense"];
            if(expense==null){
                expense=0;
            }


            console.log(expense);
            if (income != 0 || expense != 0 ) {
            //DIAGRAM with all the income and expenses from all accounts.
                google.charts.load("current", {packages: ["corechart"]});
            google.charts.setOnLoadCallback(drawChart);


                function drawChart() {


                    var data = google.visualization.arrayToDataTable([
                        ['Task', 'Amount'],
                        ['Income', Number(income)],
                        ['Expense', Number(expense)]
                    ]);
                    console.log(data);
                    var options = {
                        title: 'Total incomes and expenses',
                        height:260,

                        is3D: true
                    };
                    $(window).resize(function(){
                        drawChart();
                    });
                    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

                    chart.draw(data, options);


                }
            }else{

                var h1=document.createElement("h1");
                piechart.appendChild(h1);
                h1.innerHTML="Still no data to display charts";
                piechart.style.height="150px";
                piechart.setAttribute("class","alert alert-info alert-dismissable");
            }
        }
        };

    request.send();



    div.appendChild(piechart);
    document.getElementById("row3").appendChild(div);
}
