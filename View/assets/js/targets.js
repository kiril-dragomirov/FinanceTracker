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
                                document.getElementById("targetDiv").innerHTML="";
                                var toTargetSectionButton=document.createElement("button");
                                toTargetSectionButton.innerHTML="Show Targets";
                                toTargetSectionButton.setAttribute("class","panel panel-primary text-center no-boder panel-body blue");
                                toTargetSectionButton.onclick=function(){

                                    targetTypes();

                                }
                                document.getElementById("targetDiv").appendChild(toTargetSectionButton);
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
                            buttonStart.innerHTML="Pause";
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
        mainDiv.innerHTML=type_id;
        console.log("Table"+type_id);

    }
    table.appendChild(tbody);
    divTResponsive.appendChild(table);
    divPanelBody.appendChild(divTResponsive);
    mainDiv.appendChild(divPanelBody);


}