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
    divTransferAmount.appendChild(inputTransferAmount);
    mainDiv.appendChild(divTransferAmount);

    var divAccSelect=document.createElement("div");
    var pSelectAcc=document.createElement("p");
    pSelectAcc.innerHTML="Select account from which to transfer";
    divAccSelect.appendChild(pSelectAcc);
    var selectTransferAcc=document.createElement("select");
    selectTransferAcc.setAttribute("class","form-control");
    var requestChartAcc = new XMLHttpRequest();
    requestChartAcc.open("get", "../index.php?target=accounts&action=accNameForPositiveAcc");
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
        // function get() {
        //     var requestForAmount = new XMLHttpRequest();
        //     requestForAmount.open("get", "../index.php?target=accounts&action=accNameForPositiveAcc");
        //     requestForAmount.onreadystatechange = function () {
        //         if (requestForAmount.status === 200 && requestForAmount.readyState === 4) {
        //             var response = JSON.parse(this.responseText);
        //             for (var item in response) {
        //                 if (response[item]["id"] == accId) {
        //                     var available = response[item]["Total"];
        //                     return available
        //                 } else {
        //                     return "not";
        //                 }
        //             }
        //             //console.log(JSON.parse(this.responseText)); TEST
        //
        //         }
        //     }
        //     requestForAmount.send();
        // }
        // console.log(get());
        divErrorHolder.innerHTML="";
        divErrorHolder.style.display="none";
        var errors=false;



        if(inputTransferAmount.value.trim()<0 || inputTransferAmount.value.trim()=="" || inputTransferId.value.trim()<0 || inputTransferId.value.trim()==""){
            divErrorHolder.innerHTML="Wrong inputs";
            divErrorHolder.style.display="block";
            errors=true;
        }

        if(errors===false){
            var request=new XMLHttpRequest();
            request.open("get","../index.php?target=transactions&action=transfer&userId="+userId+
                "&amount="+amount+"&accId="+accId);
            request.onreadystatechange=function(){
                console.log(this.responseText);
            };
            request.send();
        }
    }



    console.log("da");
}