
showAccounts();
function showAccounts(){
    // document.getElementById("show").innerHTML="";
    document.getElementById("row1").innerHTML = "";
    document.getElementById("row2").innerHTML = "";
    document.getElementById("row3").innerHTML = "";
    document.getElementById("row4").innerHTML = "";
    document.getElementById("show").style.display="block";
    var request= new XMLHttpRequest();
    request.open("get","../index.php?target=accounts&action=showAcc");
    request.onreadystatechange=function(){
        if(request.status===200 && request.readyState===4){
            var response=JSON.parse(this.responseText);
            console.log(response);
            var check=0;
            for(var item in response){
                //With -check- we will count how many accounts we have, possible accs-4;
                check++;
               var div1= document.createElement("div");
               div1.setAttribute("class","col-lg-3");
               var div2=document.createElement("div");
                div2.setAttribute("class","alert alert-warning text-center");

                var i=document.createElement("i");
                i.onclick=function(){
                    showTransferSection(this.id);
                }

                i.setAttribute("class","fa  fa-pencil fa-3x");
                i.setAttribute("id",response[item]["id"]);
                div2.appendChild(i);
                //Button to delete ACC;
                var buttonRemove=document.createElement("button");
                buttonRemove.setAttribute("class","btn btn-danger btn-circle btn-lg");
                buttonRemove.id=response[item]["id"];
                var iButton=document.createElement("i");
                iButton.setAttribute("class","fa fa-times");
                buttonRemove.appendChild(iButton);
                buttonRemove.onclick=function(){
                    removeAcc(this.id);
                };
                div2.appendChild(buttonRemove);
                for(var each in response[item]){
                    i.innerHTML=response[item]["name"];
                    var total=response[item]["income"]-response[item]["expense"];
                    if(total<0){
                        i.style.color="red";
                        i.innerHTML+="<br>"+ total.toFixed(2) +"<br>";
                    }else if(total>0){
                        i.innerHTML += "<br>" + total.toFixed(2) + "<br>";
                        i.style.color="green";
                    }else{
                        i.innerHTML += "<br>" + total.toFixed(2) + "<br>";
                        i.style.color="yellow";
                    }
                    div1.appendChild(div2);

               }
                document.getElementById("row1").appendChild(div1);

            }
            if(check<4){
                var div3=document.createElement("div");
                div3.setAttribute("class","col-lg-3");
                var div4=document.createElement("div");
                div4.setAttribute("class","alert alert-warning text-center");
                var i1=document.createElement("i");
                i1.setAttribute("class","fa  fa-pencil fa-3x");
                i1.innerHTML="Create new account!";
                div4.appendChild(i1);
                div3.appendChild(div4);
                div3.onclick=function() {
                    showNewAccountSection();
                }
                document.getElementById("row1").appendChild(div3);

            }
            console.log(check);
        }
    };
    request.send();

    // var chartAcc= document.getElementById("chartAcc");
    // chartAcc.style.display="none";
    showTotal();
    showDiagram();
    showBiggestIncomeInAccount();
    showBiggestExpenseInAccount();
    showTotalTransferIncome();

}