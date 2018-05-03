targetTypes();
function targetTypes(){
    var mainDiv=document.getElementById("targetDiv");
    mainDiv.innerHTML="";

    var divSelect = document.createElement("div");
    var pNameSelect=document.createElement("p");
    pNameSelect.innerHTML="Select Target Type:";
    divSelect.appendChild(pNameSelect);
    var select = document.createElement("select");
    select.setAttribute("class","form-control");
    //AJAX inorder to get all target types
    var request= new XMLHttpRequest();
    request.open("get","../index.php?target=targets&action=targetTypes");
    request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200) {
            var response=JSON.parse(this.responseText);

            for(var i in response){
                var option=document.createElement("option");
                option.innerHTML=response[i]["name"];
                option.setAttribute("value",response[i]["id"]);
                select.appendChild(option);
            }
        }else if(request.status===401){
            window.location.href="login.html";
            console.log(this.status);
        }
    }
    request.send();

    divSelect.appendChild(select);
    mainDiv.appendChild(divSelect);
    var type_target=1;
    select.onchange=function(){
       type_target=this.value;
        console.log(type_target);
        addTarget(type_target);
        tableTargetsType(type_target);

    };



    var addDiv=document.createElement("div");
    mainDiv.appendChild(addDiv);
    addDiv.setAttribute("id","add");

    addTarget(type_target);

    var tableTargets=document.createElement("div");
    tableTargets.setAttribute("id","tableTargets");
    mainDiv.appendChild(tableTargets);

    tableTargetsType(type_target);

}




function addTarget(type_target){
       var div=document.getElementById("add");

    if(type_target==1){
        var button=document.createElement("button");
        button.setAttribute("class","btn btn-primary btn-lg btn-block");
        button.innerHTML="Add target.";
        div.appendChild(button);
        button.onclick=function(){
            var main=document.getElementById("targetDiv");
            main.innerHTML="";
            var toTargetSectionButton=document.createElement("button");
            toTargetSectionButton.innerHTML="Show Targets";
            toTargetSectionButton.setAttribute("class","panel panel-primary text-center no-boder panel-body blue");
            toTargetSectionButton.onclick=function(){

                targetTypes();

            }
            document.getElementById("targetDiv").appendChild(toTargetSectionButton);
            var divInputName=document.createElement("div");
            var pInputName=document.createElement("p");
            pInputName.innerHTML="Insert name of your target";
            divInputName.appendChild(pInputName);
            var inputTargetName=document.createElement("input");
            inputTargetName.setAttribute("maxlength","20");
            inputTargetName.setAttribute("class","form-control");
            inputTargetName.setAttribute("id","inputTargetName");
            divInputName.appendChild(inputTargetName);
            main.appendChild(divInputName);
            var divInputAmount=document.createElement("div");
            var pInputAmount=document.createElement("p");
            pInputAmount.innerHTML="Insert amount of the target";
            divInputAmount.appendChild(pInputAmount);
            var inputAmountTarget=document.createElement("input");
            inputAmountTarget.setAttribute("type","number");
            inputAmountTarget.setAttribute("maxlength","10");
            inputAmountTarget.setAttribute("min","0");
            inputAmountTarget.setAttribute("class","form-control");
            inputAmountTarget.setAttribute("id","inputAmountTarget");
            divInputAmount.appendChild(inputAmountTarget);
            main.appendChild(divInputAmount);
            var divButton=document.createElement("div");
            var buttonInsert=document.createElement("button");
            buttonInsert.setAttribute("class","btn btn-primary btn-lg");
            buttonInsert.innerHTML="Insert";
            divButton.appendChild(buttonInsert);
            main.appendChild(divButton);
            buttonInsert.onclick=function(){
                var errors=true;
                var regexName= /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
                var regexAmount=/^\d+(\.\d{1,2})?$/;
                var amount=document.getElementById("inputAmountTarget").value.trim();
                var name=document.getElementById("inputTargetName").value.trim();

                if(name===""){
                    divError.innerHTML="Insert Data";
                    errors=false;
                }else if(!regexName.test(name)){
                    divError.innerHTML="Please enter valid name";
                    errors=false;
                }

                if(amount===""){
                    divError.innerHTML="Insert Amount";
                    errors=false;
                }else if(!regexAmount.test(amount)){
                    divError.innerHTML="Please enter valid amount";
                    errors=false;
                }

                if(errors===false){
                    divError.style.display="block";
                }else{
                    divError.style.display="none";
                }

                if(errors=true){
                    var request= new XMLHttpRequest();
                    request.open("post","../index.php?target=targets&action=insertTarget");
                    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    request.onreadystatechange=function(){
                        if(request.readyState===4 && request.status===200){
                            if(this.responseText==="correct"){
                                document.getElementById("inputAmountTarget").value="";
                                document.getElementById("inputTargetName").value="";
                                targetTypes();
                            }
                        }
                    }
                    request.send("name="+name+"&amount="+amount);
                }


            }

            var divError=document.createElement("div");
            divError.style.display="none";
            divError.setAttribute("class","alert alert-danger");
            main.appendChild(divError);

        }
    }else{
        div.innerHTML="";
    }



}

function tableTargetsType(type_id){
    var mainDiv=document.getElementById("tableTargets");
    mainDiv.innerHTML="";
    var divPanelBody=document.createElement("div");
    divPanelBody.setAttribute("class","panel-body");
    var divTResponsive=document.createElement("div");
    divTResponsive.setAttribute("class","table-responsive");
    var table=document.createElement("table");
    table.id="tableTargets";
    table.setAttribute("class","table table-hover");
    var tbody=document.createElement("tbody");
    if(type_id==1){
        // mainDiv.innerHTML=type_id;
        console.log("Table"+type_id);
        var requestFirst=new XMLHttpRequest();
        requestFirst.open("get","../index.php?target=targets&action=getAllActiveTargets");
        requestFirst.onreadystatechange=function(){
            if(requestFirst.readyState===4 && requestFirst.status===200){
                var response=JSON.parse(this.responseText);
                console.log(response);
                var tr=document.createElement("tr");
                var th1=document.createElement("th");
                th1.innerHTML="Actions:";
                tr.appendChild(th1);
                var th12=document.createElement("th");
                th12.innerHTML="Name";
                tr.appendChild(th12);

                var th13=document.createElement("th");
                th13.innerHTML="Goal Amount";
                tr.appendChild(th13);
                tbody.appendChild(tr);
                for(var i in response){
                    var tr=document.createElement("tr");
                    // tbody.setAttribute("id","TR"+response[i]["id"])
                    for(var e in response[i]){
                        var td=document.createElement("td");
                        // td.setAttribute("id","TD"+response[i]["id"]);
                        if(e=="id"){
                            var buttonInsertToThisTarget=document.createElement("button");
                            buttonInsertToThisTarget.setAttribute("class", "btn btn-success");
                            buttonInsertToThisTarget.setAttribute("value",response[i][e]);
                            buttonInsertToThisTarget.innerHTML="Insert Money in This target";
                            buttonInsertToThisTarget.onclick=function(){
                                var target_id=this.value;
                                var mainTargetDiv=document.getElementById("targetDiv");
                                mainTargetDiv.innerHTML="";
                                var toTargetSectionButton=document.createElement("button");
                                toTargetSectionButton.innerHTML="Show Targets";
                                toTargetSectionButton.setAttribute("class","panel panel-primary text-center no-boder panel-body blue");
                                toTargetSectionButton.onclick=function(){

                                    targetTypes();

                                }
                                mainTargetDiv.appendChild(toTargetSectionButton);

                                var divTargetName=document.createElement("div");
                                divTargetName.setAttribute("class","alert alert-info");
                                var requestTargetName=new XMLHttpRequest();
                                requestTargetName.open("get","../index.php?target=targets&action=getTargetName&targetId="+target_id);
                                requestTargetName.onreadystatechange=function(){
                                    if(requestTargetName.readyState===4 && requestTargetName.status===200){
                                        var p=document.createElement("p");
                                        p.innerHTML="Target Name :  "+requestTargetName.responseText;
                                        divTargetName.appendChild(p);
                                    }
                                }
                                requestTargetName.send();
                                mainTargetDiv.appendChild(divTargetName);

                                var divAccSelect=document.createElement("div");
                                var pSelectAcc=document.createElement("p");
                                pSelectAcc.innerHTML="Select account from which to insert saving for the target";
                                divAccSelect.appendChild(pSelectAcc);
                                var selectTransferAcc=document.createElement("select");
                                selectTransferAcc.setAttribute("class","form-control");
                                var requestChartAcc = new XMLHttpRequest();
                                requestChartAcc.open("get", "../index.php?target=accounts&action=chartAccountsAmounts");
                                requestChartAcc.onreadystatechange = function () {
                                    if (requestChartAcc.status === 200 && requestChartAcc.readyState === 4) {
                                        var response = JSON.parse(this.responseText);
                                        var option = document.createElement("option");
                                        option.innerHTML = "";
                                        option.value = "not";
                                        selectTransferAcc.appendChild(option);
                                        for (var item in response) {
                                            if(response[item]["Total"]>0) {
                                                var option = document.createElement("option");
                                                option.innerHTML = response[item]["name"];
                                                option.value = response[item]["id"];
                                                // option.id=response[item]["Total"];
                                                selectTransferAcc.appendChild(option);
                                            }
                                        }
                                        //console.log(JSON.parse(this.responseText)); TEST
                                    }
                                }
                                requestChartAcc.send();
                                divAccSelect.appendChild(selectTransferAcc);
                                mainTargetDiv.appendChild(divAccSelect);
                                var selectedAcc="not";
                                selectTransferAcc.onchange=function(){
                                    selectedAcc=this.value;
                                    console.log(selectedAcc);
                                }

                                var divAmount=document.createElement("div");
                                var pAmount=document.createElement("p");
                                pAmount.innerHTML="Insert Amount:";
                                divAmount.appendChild(pAmount);
                                var inputType=document.createElement("input");
                                inputType.setAttribute("type","number");
                                inputType.setAttribute("maxlength","10");
                                inputType.setAttribute("id","amountTargetInput");
                                inputType.setAttribute("min","0");
                                inputType.setAttribute("class","form-control");
                                divAmount.appendChild(inputType);
                                mainTargetDiv.appendChild(divAmount);

                                var divErr=document.createElement("div");
                                divErr.setAttribute("class","alert alert-danger");
                                divErr.style.display="none";
                                mainTargetDiv.appendChild(divErr);
                                var divbuttonFinished=document.createElement("div");
                                var buttonFinished=document.createElement("button");
                                buttonFinished.innerHTML="Finished";
                                buttonFinished.setAttribute("class","btn btn-danger");
                                buttonFinished.setAttribute("value",target_id);
                                buttonFinished.onclick=function () {
                                   console.log(this.value);
                                    var id=this.value;
                                var requestFinished=new XMLHttpRequest();
                                requestFinished.open("post","../index.php?target=targets&action=setTargetToFinished");
                                requestFinished.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                requestFinished.onreadystatechange=function(){
                                    if(requestFinished.readyState===4 && requestFinished.status===200){
                                        targetTypes();

                                    }
                                };
                                requestFinished.send("id="+id);

                                };
                                divbuttonFinished.appendChild(buttonFinished);
                                var buttonAdd=document.createElement("button");
                                buttonAdd.innerHTML="Add savings to target";
                                buttonAdd.setAttribute("class","btn btn-info");
                                buttonAdd.setAttribute("value",target_id);
                                buttonAdd.onclick=function(){
                                    // console.log(this.value); Testing purpose
                                    var id=this.value;
                                    var errors=true;
                                    var amountValue=document.getElementById("amountTargetInput").value.trim();
                                    var regexAmount=/^\d+(\.\d{1,2})?$/;
                                    if(selectedAcc==="not") {
                                        divErr.innerHTML = "Select Acc";
                                        errors=false;
                                    }else if(amountValue<=0){
                                        divErr.innerHTML = "Insert Amount";
                                        errors=false;
                                    }else if(amountValue==""){
                                        divErr.innerHTML = "Insert Amount";
                                        errors=false;
                                    }else if(!regexAmount.test(amountValue)){
                                            divErr.innerHTML = "Insert correct Amount";
                                        errors=false;
                                    }

                                    if(errors===false){
                                        divErr.style.display="block";
                                    }else {
                                        divErr.style.display = "none";

                                        var request = new XMLHttpRequest();
                                        request.open("post", "../index.php?target=targets&action=insertAmountForTarget");
                                        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                        request.onreadystatechange = function () {
                                            if (request.readyState === 4 && request.status === 200) {
                                                console.log(this.responseText);
                                                if(this.responseText=="wrong"){
                                                    divErr.innerHTML="";
                                                    divErr.innerHTML="Something went wrong with ur input";
                                                    divErr.style.display = "block";
                                                }else{
                                                    document.getElementById("amountTargetInput").value="";
                                                    loadChart(target_id);
                                                    tableTargetSavings(target_id);
                                                }
                                            }
                                        };
                                        request.send("target_id=" + id+"&amount="+amountValue+"&accId="+selectedAcc);
                                    }
                                };
                                divbuttonFinished.appendChild(buttonAdd);
                                mainTargetDiv.appendChild(divbuttonFinished);


                                var divChart=document.createElement("div");
                                divChart.setAttribute("id","targetCharts");
                                divChart.style.width="100%";
                                divChart.style.height="400px";
                                mainTargetDiv.appendChild(divChart);
                                loadChart(target_id);

                                var divTableSavings=document.createElement("div");
                                divTableSavings.setAttribute("id","tableSavings");
                                mainTargetDiv.appendChild(divTableSavings);
                                tableTargetSavings(target_id)

                            };
                            td.appendChild(buttonInsertToThisTarget);
                            var buttonPause=document.createElement("button");
                            buttonPause.setAttribute("value",response[i][e]);
                            buttonPause.setAttribute("class","btn btn-warning");
                            buttonPause.innerHTML="Pause";
                            td.appendChild(buttonPause);
                            buttonPause.onclick=function(){
                               var request=new XMLHttpRequest();
                               request.open("post","../index.php?target=targets&action=pauseTarget");
                               request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                               request.onreadystatechange=function(){
                                   if(request.readyState===4 && request.status===200){
                                        // if(this.responseText==""){
                                            tableTargetsType(type_id);
                                        // }
                                   }
                               }
                               request.send("id="+this.value);
                            }
                        }else{
                            td.innerHTML=response[i][e];
                        }
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
            }
        }
        requestFirst.send();
    }else if(type_id==2){
        var requestSecond=new XMLHttpRequest();
        requestSecond.open("get","../index.php?target=targets&action=getAllWaitingTargets");
        requestSecond.onreadystatechange=function(){
            console.log(this.responseText);
            if(requestSecond.readyState===4 && requestSecond.status===200){
                var response=JSON.parse(this.responseText);
                console.log(response);
                var tr=document.createElement("tr");
                var th1=document.createElement("th");
                th1.innerHTML="Actions:";
                tr.appendChild(th1);
                var th12=document.createElement("th");
                th12.innerHTML="Name";
                tr.appendChild(th12);

                var th13=document.createElement("th");
                th13.innerHTML="Goal Amount";
                tr.appendChild(th13);
                tbody.appendChild(tr);
                for(var i in response){
                    var tr=document.createElement("tr");
                    // tbody.setAttribute("id","TR"+response[i]["id"])
                    for(var e in response[i]){
                        var td=document.createElement("td");
                        // td.setAttribute("id","TD"+response[i]["id"]);
                        if(e=="id"){
                            var buttonStart=document.createElement("button");
                            buttonStart.setAttribute("value",response[i][e]);
                            buttonStart.setAttribute("class","btn btn-warning");
                            buttonStart.innerHTML="Start";
                            td.appendChild(buttonStart);
                            buttonStart.onclick=function(){
                                var request=new XMLHttpRequest();
                                request.open("post","../index.php?target=targets&action=startTarget");
                                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                request.onreadystatechange=function(){
                                    if(request.readyState===4 && request.status===200){
                                        // if(this.responseText==""){
                                        tableTargetsType(type_id);
                                        // }
                                    }
                                }
                                request.send("id="+this.value);
                            }
                        }else{
                            td.innerHTML=response[i][e];
                        }
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
            }
        }
        requestSecond.send();

        // mainDiv.innerHTML=type_id;
        console.log("Table"+type_id);

    }else if(type_id==3){
         // mainDiv.innerHTML="";
        // console.log("Table"+type_id);
        var request=new XMLHttpRequest();
        request.open("get","../index.php?target=targets&action=getAllFinishedAndSaved");
        request.onreadystatechange=function(){
            if(request.readyState===4 && request.status===200){
               var response=JSON.parse(this.responseText);
               var tr=document.createElement("tr");
               var th1=document.createElement("th");
               th1.innerHTML="Name";
               tr.appendChild(th1);
               var th12=document.createElement("th");
               th12.innerHTML="Saved";
                tr.appendChild(th12);

                var th13=document.createElement("th");
               th13.innerHTML="Total target amount";
                tr.appendChild(th13);
                tbody.appendChild(tr);
                for(var i in response){
                   var tr=document.createElement("tr");
                   for(var e in response[i]){
                       var td=document.createElement("td");
                       td.innerHTML=response[i][e];
                       tr.appendChild(td);
                       }

                    tbody.appendChild(tr);
               }
            }
        }
        request.send();
    }
    table.appendChild(tbody);
    divTResponsive.appendChild(table);
    divPanelBody.appendChild(divTResponsive);
    mainDiv.appendChild(divPanelBody);


}




function loadChart(target_id) {
    var request=new XMLHttpRequest();
    request.open("get","../index.php?target=targets&action=getTargetAvailableAmountInfo&targetId="+target_id);
    request.onreadystatechange=function() {
        if (request.readyState === 4 && request.status === 200) {
            var response = JSON.parse(this.responseText);
            var legend;
            var dar = response;
            console.log(dar);
            var chartData = dar;
            if (AmCharts.isReady) {
                targetsChart(chartData);
            } else {
                AmCharts.ready(targetsChart(chartData));
            }
        }
    }
    request.send();

}

function targetsChart(chartData) {
    // for (var i in chartData) {
    //     chartData[i].Total = Math.abs(chartData[i].Total);
    // }
    console.log("am chart ready");
    // PIE CHART
    var chart = new AmCharts.AmPieChart();
    chart.addTitle("Total amount", 16);
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
    chart.write("targetCharts");




}

function tableTargetSavings(target_id){
    var mainTableDiv=document.getElementById("tableSavings");
    mainTableDiv.innerHTML="";

    var divPanelBody=document.createElement("div");
    divPanelBody.setAttribute("class","panel-body");
    var divTResponsive=document.createElement("div");
    divTResponsive.setAttribute("class","table-responsive");
    var table=document.createElement("table");
    table.id="tableTargets";
    table.setAttribute("class","table table-hover");
    var tbody=document.createElement("tbody");

        var request=new XMLHttpRequest();
        request.open("get","../index.php?target=targets&action=getSavingsForTarget&targetId="+target_id);
        request.onreadystatechange=function(){
            if(request.readyState===4 && request.status===200){
                var response=JSON.parse(this.responseText);
                var tr=document.createElement("tr");
                var th1=document.createElement("th");
                th1.innerHTML="Amount";
                tr.appendChild(th1);
                var th12=document.createElement("th");
                th12.innerHTML="Date";
                tr.appendChild(th12);
                tbody.appendChild(tr);
                // var totalSaved=0;
                for(var i in response){
                    // totalSaved=totalSaved+response[i]["amount"];
                    var tr=document.createElement("tr");
                    for(var e in response[i]){
                        var td=document.createElement("td");
                        td.innerHTML=response[i][e];
                        tr.appendChild(td);
                    }
                    tbody.appendChild(tr);
                }
                // console.log(totalSaved);
            }

        }
        request.send();
    //
    // var tr=document.createElement("tr");
    // var td=document.createElement("td");
    // td.innerHTML=target_id;
    // tr.appendChild(td);
    // tbody.appendChild(tr);


    table.appendChild(tbody);
    divTResponsive.appendChild(table);
    divPanelBody.appendChild(divTResponsive);
    mainTableDiv.appendChild(divPanelBody);
}