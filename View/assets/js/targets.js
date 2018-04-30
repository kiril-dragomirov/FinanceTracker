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
    };



    var addDiv=document.createElement("div");
    mainDiv.appendChild(addDiv);
    addDiv.setAttribute("id","add");

    addTarget(type_target);

}




function addTarget(type_target){
       var div=document.getElementById("add");

    if(type_target==1){
        var button=document.createElement("button");
        button.setAttribute("class","btn btn-primary btn-lg btn-block");
        button.innerHTML="Add target.";
        div.appendChild(button);
    }else{
        div.innerHTML="";
    }

    button.onclick=function(){
        var main=document.getElementById("targetDiv");
        main.innerHTML="";
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
        var button=document.createElement("button");
        button.setAttribute("class","btn btn-primary btn-lg");
        button.innerHTML="Insert";
        button.onclick=function(){
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
                        }
                    }
                }
                request.send("name="+name+"&amount="+amount);
            }


        }
        divButton.appendChild(button);
        main.appendChild(divButton);
        var divError=document.createElement("div");
        divError.style.display="none";
        divError.setAttribute("class","alert alert-danger");
        main.appendChild(divError);

    }

}