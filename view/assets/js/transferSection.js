function showTransferSection(id){
    var divShow = document.getElementById("show");
    document.getElementById("row1").innerHTML="";
    document.getElementById("row2").innerHTML="";
    document.getElementById("row3").innerHTML="";
    divShow.style.display="none";
    var accTrans = document.getElementById("accTrans");
    accTrans.innerHTML="";
    accTrans.style.display="block";
    // accTrans.innerHTML=id; TESTING
    var showButton=document.createElement("button");
    showButton.innerHTML="Show Main Page";
    showButton.setAttribute("class","panel panel-primary text-center no-boder panel-body blue");
    showButton.onclick=function(){
        showAccounts();
        accTrans.style.display="none";
    }
    accTrans.appendChild(showButton);
    var mainDiv=document.createElement("div");
    var select=document.createElement("select");
    select.setAttribute("class","form-control");

        //AJAX to catch all accounts names + their ids;
    var request=new XMLHttpRequest();
    request.open("get","../controller/accountsController.php?accName=get");
    request.onreadystatechange=function(){
        if(request.status===200 && request.readyState===4){
            var response=JSON.parse(this.responseText);
            for(var item in response){
               var option = document.createElement("option");
               option.innerHTML=response[item]["name"];
               option.value=response[item]["id"];
               if(response[item]["id"]==id){
                   option.selected="selected";
               }
               select.appendChild(option);
            }
            //console.log(JSON.parse(this.responseText)); TEST
        }
    }
    request.send();
    //End of ajax

    select.onchange=function(){
        if(this.value!=id){
            //updating id with the selected acc id!
            id=this.value;
            console.log(id);
        }
    }
    mainDiv.appendChild(select);
    accTrans.appendChild(mainDiv);



}