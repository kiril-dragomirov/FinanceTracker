function showNewAccountSection(){
     var divShow = document.getElementById("show");
     //Zachistvame
     document.getElementById("row1").innerHTML="";
    document.getElementById("row2").innerHTML="";
    document.getElementById("row3").innerHTML="";
     divShow.style.display="none";
        //getting element!
        var divTrans=document.getElementById("trans");
        divTrans.style.display="block";
        divTrans.innerHTML="";
        //Button to show main page!
        var showButton=document.createElement("button");
        showButton.innerHTML="Show Main Page";
        showButton.setAttribute("class","panel panel-primary text-center no-boder panel-body blue");
        showButton.onclick=function(){
            showAccounts();
            divTrans.style.display="none";
        }
        divTrans.appendChild(showButton);
        var div=document.createElement("div");
        var pName=document.createElement("p");
        pName.innerHTML="Account Name:";
        div.appendChild(pName);
        var name=document.createElement("input");
        name.setAttribute("id","name");
        name.setAttribute("type","text");
        name.setAttribute("name","nameAcc");
        name.setAttribute("maxlength","20");
        // name.setAttribute("class", "col-lg-3");
        div.appendChild(name);
        var pAmount=document.createElement("p");
        pAmount.innerHTML="Amount in new account:";
        div.appendChild(pAmount);
         var amount=document.createElement("input");
          amount.setAttribute("id","amount");
           amount.setAttribute("type","number");
           //doesnt work!
            amount.setAttribute("name","amount");
           amount.setAttribute("maxlength","3");
            amount.setAttribute("min","0");

         div.appendChild(amount);

         var insertAccButton=document.createElement("button");
         insertAccButton.innerHTML="Add account";
         insertAccButton.setAttribute("class","btn btn-primary");
         //onclick function to add acc to DB + Validations
         div.appendChild(insertAccButton);

        divTrans.appendChild(div);




}