

function addSelectField(){
    var x = new XMLHttpRequest();
    x.open("get", "../index.php?target=budget&action=selectAccount");
    x.onreadystatechange = function (ev) {
        if(x.readyState === 4 && x.status === 200){
            console.log(this.responseText);
            var response = JSON.parse(this.responseText);
            var acc = "";
            console.log(response);

            var str6 = "<div class=\"form-group\"><label>Select account</label><select class=\"form-control\" id=\"acc\">";
            for (var i in response) {
                if (response[i].name != null) {
                    str6 += "<option value=\"" + response[i].id + "\">";
                    str6 += response[i].name;
                    str6 += "</option>";
                }
                if (response[i].id) {
                    acc = response[i].id;
                }

            }

            str6 += "</select></div>";
            document.getElementById("selectA").innerHTML = str6;

            var str = "<button type=\"submit\"  class=\"btn btn-primary\" >Make a plan</button>";
            document.getElementById("but").innerHTML = str;
        }
    }
    x.send();

    document.getElementById("but").addEventListener("click",function(){
        var e1 = document.getElementById("acc");
        var str1 = e1.options[e1.selectedIndex].value;
        var r = new XMLHttpRequest();
        r.open("post", "../index.php?target=budget&action=makeBCharts" );
        r.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        r.onreadystatechange = function (ev) {
            if(r.readyState === 4 && r.status === 200){
                console.log(this.responseText);
                var response = JSON.parse(this.responseText);
                console.log(response);
                console.log("opa");
                if(response.length != 1) {
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
                }else if(response.length == 1){
                    document.getElementById("chart").innerHTML = "You have only one category ("+ response[0].category+ ") with budget amount ("+response[0].amount+")";
                }else{
                    document.getElementById("chart").innerHTML = "No budgets!!!";
                }
            }
        }
        r.send("accId=" + str1);
    });
}



