showTransferSection();
function showTransferSection(){
    var mainDiv=document.getElementById("transferDiv");
    var divId=document.createElement("div");
    var p=document.createElement("p");
    //Getting user ID over AJAX
    var request=new XMLHttpRequest();
    request.open("get","../index.php?target=user&action=getUserId");
    request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200){
            var response=this.responseText;
            p.innerHTML="Your id is: "+response;
        }else if(request.status===401){
            location.href="login.html";
            console.log(this.status);
        }

    };
    request.send();

    divId.appendChild(p);
    mainDiv.appendChild(divId);

    var divTransferToId=document.createElement("div");
    var pTransferId=document.createElement("p");
    pTransferId.innerHTML="Transfer to id:";
    divTransferToId.appendChild(pTransferId);
    var inputTransferId=document.createElement("input");
    inputTransferId.setAttribute("maxlength","10");
    inputTransferId.setAttribute("class","form-control");
    inputTransferId.setAttribute("type","number");
    inputTransferId.setAttribute("id","inputTransferId");
    divTransferToId.appendChild(inputTransferId);
    mainDiv.appendChild(divTransferToId);

    var divTransferAmount=document.createElement("div");
    var pTransferAmount=document.createElement("p");
    pTransferAmount.innerHTML="Amount to transfer:";
    divTransferAmount.appendChild(pTransferAmount);
    var inputTransferAmount=document.createElement("input");
    inputTransferAmount.setAttribute("type","number");
    inputTransferAmount.setAttribute("maxlength","10");
    inputTransferAmount.setAttribute("class","form-control");
    inputTransferAmount.setAttribute("id","inputTransferAmount");
    divTransferAmount.appendChild(inputTransferAmount);
    mainDiv.appendChild(divTransferAmount);

    var divAccSelect=document.createElement("div");
    var pSelectAcc=document.createElement("p");
    pSelectAcc.innerHTML="Select account from which to transfer";
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
                    option.id=response[item]["Total"];
                    selectTransferAcc.appendChild(option);
                }
            }
            //console.log(JSON.parse(this.responseText)); TEST
        }
    }
    requestChartAcc.send();
    divAccSelect.appendChild(selectTransferAcc);
    mainDiv.appendChild(divAccSelect);
    var selectedAcc="not";
    selectTransferAcc.onchange=function(){
        selectedAcc=this.value;
        console.log(selectedAcc);
    }


    var divErrorHolder=document.createElement("div");
    // divErrorHolder.innerHTML="Wrong";
    divErrorHolder.style.display="none";
    divErrorHolder.setAttribute("class","alert alert-danger");
    mainDiv.appendChild(divErrorHolder);

    var divButtonSendTransfer=document.createElement("div");
    var button=document.createElement("button");
    button.innerHTML="Send Transfer";
    button.setAttribute("class","btn btn-info");
    divButtonSendTransfer.appendChild(button);
    mainDiv.appendChild(divButtonSendTransfer);

    button.onclick=function(){
        var amount=inputTransferAmount.value;
        var userId=inputTransferId.value;
        var accId=selectedAcc;
        console.log(accId);
        divErrorHolder.innerHTML="";
        divErrorHolder.style.display="none";
        var errors=false;


        var regexAmount=/^\d+(\.\d{1,2})?$/;

        if(inputTransferAmount.value.trim()<0 || inputTransferAmount.value.trim()=="" || inputTransferId.value.trim()<0 || inputTransferId.value.trim()==""){
            divErrorHolder.innerHTML="Wrong inputs";
            divErrorHolder.style.display="block";
            errors=true;
        }else if(!regexAmount.test(inputTransferAmount.value.trim())){
            divErrorHolder.innerHTML="Wrong inputs";
            divErrorHolder.style.display="block";
            errors=true;
        }else if(!regexAmount.test(inputTransferId.value.trim())){
            divErrorHolder.innerHTML="Wrong inputs";
            divErrorHolder.style.display="block";
            errors=true;
        }else{
            divErrorHolder.style.display="none";
        }

        if(errors===false){
            var request=new XMLHttpRequest();
            request.open("get","../index.php?target=transactions&action=transfer&userId="+userId+
                "&amount="+amount+"&accId="+accId);
            request.onreadystatechange=function(){
                if(request.readyState===4 && request.status===200) {
                    console.log(this.responseText);
                    if(this.responseText!==""){
                        divErrorHolder.innerHTML="Something went wrong with your transaction";
                        divErrorHolder.style.display="block";
                        }else{
                        document.getElementById("inputTransferId").value="";
                        document.getElementById("inputTransferAmount").value="";
                        transferChart();
                        }
                }
            };
            request.send();
        }
    }



        var divPanelBody = document.createElement("div");
    divPanelBody.id="transferTableId";
    mainDiv.appendChild(divPanelBody);
    transferChart();
    function transferChart() {
       var divPanelBody= document.getElementById("transferTableId");
        divPanelBody.innerHTML = "";
        divPanelBody.setAttribute("class", "panel-body");
        var divTableResponsive = document.createElement("div");
        divTableResponsive.setAttribute("class", "table-responsive");
        var table = document.createElement("table");
        table.setAttribute("class", "table table-hover");
        var tbody = document.createElement("tbody");
        var requestTable = new XMLHttpRequest();
        requestTable.open("get", "../index.php?target=transactions&action=getTransfers");
        requestTable.onreadystatechange = function () {
            if (requestTable.readyState === 4 && requestTable.status === 200) {
                var responseTable = JSON.parse(this.responseText);
                for (var i in responseTable) {
                    var tr = document.createElement("tr");
                    for (var e in responseTable[i]) {
                        var td = document.createElement("td");
                        td.innerHTML = responseTable[i][e];
                        tr.appendChild(td);
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







    console.log("da");
}