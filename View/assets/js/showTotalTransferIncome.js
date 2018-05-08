function showTotalTransferIncome(){
  var mainDivTransfers=document.getElementById("row4");
  var div=document.createElement("div");
  div.setAttribute("class","col-lg-12");
  var divAvailableFromTransfers=document.createElement("div");
  divAvailableFromTransfers.setAttribute("class","alert alert-info");
  var h1=document.createElement("h1");

  var request=new XMLHttpRequest();
  request.open("get","../index.php?target=transactions&action=getAllTransferIncomes");
  request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200){
            var response=JSON.parse(this.responseText);
            console.log(response);
            var transferTotalAmountIncome=response[0]["sum"];
            transferTotalAmountIncome=+transferTotalAmountIncome;
            h1.innerHTML="You have "+ transferTotalAmountIncome.toFixed(2) +" available from transfers";
            if(response[0]["sum"]>0){
                h1.onclick=function () {
                    setTransferToAccount();
                }
            }
        }
  }
  request.send();

  h1.innerHTML="You have ... available from transfers";
  divAvailableFromTransfers.appendChild(h1);
  div.appendChild(divAvailableFromTransfers);
  mainDivTransfers.appendChild(div);



}

function setTransferToAccount(){
    //console.log("Here will be ");
    var divShow = document.getElementById("show");
    divShow.style.display="none";
    document.getElementById("row1").innerHTML="";
    document.getElementById("row2").innerHTML="";
    document.getElementById("row3").innerHTML="";
    document.getElementById("row4").innerHTML="";

    var divTransfers=document.getElementById("transfers");
    divTransfers.style.display="block";
    divTransfers.innerHTML="";

    var showButton=document.createElement("button");
    showButton.innerHTML="Show Main Page";
    showButton.setAttribute("class","panel panel-primary text-center no-boder panel-body blue");
    showButton.onclick=function(){
        showAccounts();
        divTransfers.innerHTML="";
        divTransfers.style.display="none";
    }
    divTransfers.appendChild(showButton);

    var selectAccDiv=document.createElement("div");
    var selectAcc = document.createElement("select");
    selectAcc.setAttribute("class", "form-control");
    var pSelectAcc = document.createElement("p");
    pSelectAcc.innerHTML = "Selected Account";
    selectAccDiv.appendChild(pSelectAcc);
    //AJAX to catch all accounts names + their ids;
    var request = new XMLHttpRequest();
    request.open("get", "../index.php?target=accounts&action=accName");
    request.onreadystatechange = function () {
        if (request.status === 200 && request.readyState === 4) {
            var response = JSON.parse(this.responseText);
            var option = document.createElement("option");
            option.innerHTML = "";
            option.value = "not";
            selectAcc.appendChild(option);
            for (var item in response) {
                var option = document.createElement("option");
                option.innerHTML = response[item]["name"];
                option.value = response[item]["id"];
                selectAcc.appendChild(option);
            }
            //console.log(JSON.parse(this.responseText)); TEST
        }
    }
    request.send();
    //End of ajax
    var accId="not"
    selectAcc.onchange = function () {

            //updating id with the selected acc id!
            //Later we will use id to for the transaction in DB;
        accId = this.value;
            console.log(accId);



    };
    selectAccDiv.appendChild(selectAcc);
    divTransfers.appendChild(selectAccDiv);

    var divPanelBody = document.createElement("div");
    divPanelBody.id="transferTableId";
    divTransfers.appendChild(divPanelBody);
    transferChartAcc();
    function transferChartAcc() {
        var divPanelBody= document.getElementById("transferTableId");
        divPanelBody.innerHTML = "";
        divPanelBody.setAttribute("class", "panel-body");
        var divTableResponsive = document.createElement("div");
        divTableResponsive.setAttribute("class", "table-responsive");
        var table = document.createElement("table");
        table.setAttribute("class", "table table-hover");
        var tbody = document.createElement("tbody");
        var requestTable = new XMLHttpRequest();
        requestTable.open("get", "../index.php?target=transactions&action=getIncomedTransfers");
        requestTable.onreadystatechange = function () {
            if (requestTable.readyState === 4 && requestTable.status === 200) {
                var responseTable = JSON.parse(this.responseText);
                for (var i in responseTable) {
                    var tr = document.createElement("tr");
                    for (var e in responseTable[i]) {

                        if(e=="id"){
                            var td = document.createElement("td");
                            var button=document.createElement("button");
                            button.setAttribute("class","btn btn-info btn-circle btn-lg");
                            var ib=document.createElement("i");
                            ib.setAttribute("class","fa fa-check");
                            button.appendChild(ib);
                            button.value=responseTable[i][e];
                            button.onclick=function(){
                                if(accId!="not") {
                                    var requestChangeType = new XMLHttpRequest();
                                    requestChangeType.open("post", "../index.php?target=transactions&action=changeTransferToAcc");
                                    requestChangeType.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                    requestChangeType.onreadystatechange = function () {

                                    }
                                    requestChangeType.send("accId=" + accId+"&id=" + this.value);
                                    transferChartAcc();
                                }
                            }
                            td.appendChild(button);
                            tr.appendChild(td);
                        }else{
                            var td = document.createElement("td");
                            td.innerHTML = responseTable[i][e];
                            tr.appendChild(td);
                        }
                    }
                    tbody.appendChild(tr);
                }
            }
        }
        requestTable.send();


        table.appendChild(tbody);
        divTableResponsive.appendChild(table);
        divPanelBody.appendChild(divTableResponsive);
    }
}