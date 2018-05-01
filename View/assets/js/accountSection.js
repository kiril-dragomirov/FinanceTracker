function showNewAccountSection(){
     var divShow = document.getElementById("show");
     //Zachistvame
     document.getElementById("row1").innerHTML="";
    document.getElementById("row2").innerHTML="";
    document.getElementById("row3").innerHTML="";
    document.getElementById("row4").innerHTML="";
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
            divTrans.innerHTML="";
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
        name.setAttribute("name","name");
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
         // div.appendChild("<br><br>");
            var divButtonHold=document.createElement("div");
            //STYLE THIS DIV!;
            divButtonHold.setAttribute("class", ".col-md-3 .col-md-offset-3");
         var insertAccButton=document.createElement("button");
         insertAccButton.innerHTML="Add account";
         insertAccButton.setAttribute("class","btn btn-primary");
         //onclick function to add acc to DB + Validations
            var divErrHold=document.createElement("div");
            var divErr=document.createElement("div");
            divErr.setAttribute("class","alert alert-danger col-md-4");
            divErr.style.display="none";
            insertAccButton.onclick=function(){

                var regexName= /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
                var regexAmount=/^\d+(\.\d{1,2})?$/;

            var err=false;
            divErr.innerHTML="";
            if(document.getElementById("name").value.trim()===""){
                divErr.style.display="block";
                divErr.innerHTML+="Please enter account name!";
                err=true;
            }else if(!regexName.test(document.getElementById("name").value.trim())){
                divErr.style.display="block";
                divErr.innerHTML+="Please enter valid name!";
                err=true;
            }
            // else{
            //     divErr.style.display="none";
            //     // divErr.innerHTML="";
            // }

            if(document.getElementById("amount").value.trim()===""){
                divErr.style.display="block";
                divErr.innerHTML+="Please enter amount!";
                err=true;
            }else if(document.getElementById("amount").value.trim()<0){
                // divErr.innerHTML="";
                divErr.style.display="block";
                divErr.innerHTML+="Please enter amount bigger than 0!";
                err=true;
            }else if(!regexAmount.test(document.getElementById("amount").value.trim())){
                // divErr.innerHTML="";
                divErr.style.display="block";
                divErr.innerHTML+="Please enter amount which is valid!";
                err=true;
            }
            //     else{
            //     divErr.style.display="none";
            //     // divErr.innerHTML="";
            // }
                if(err===false){
                        divErr.style.display="none";
                        divErr.innerHTML="";
                }

            if(err===false){
                var accName = document.getElementById("name").value.trim();
                var accAmount = document.getElementById("amount").value.trim();
                var request = new XMLHttpRequest();
                request.open("post","../index.php?target=accounts&action=insertAccount");
                request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.onreadystatechange=function(){
                    if(request.status===200 && request.readyState===4){
                        console.log(this.responseText);
                        if(this.responseText==="correct"){
                            showAccounts();
                            divTrans.innerHTML="";
                            divTrans.style.display="none";
                        }else if(this.responseText==="incorrect"){
                            name.innerHTML="";
                            amount.innerHTML="";
                        }
                    }
                };

                request.send("name="+ accName +"&amount="+ accAmount);
            }
        }

            divErrHold.appendChild(divErr);
            div.appendChild(divErrHold);
            divButtonHold.appendChild(insertAccButton);
            div.appendChild(divButtonHold);

        divTrans.appendChild(div);




}