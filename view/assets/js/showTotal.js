showTotal();
function showTotal(){
    var request= new XMLHttpRequest();
    request.open("get","../controller/accountsController.php?give=total");
    request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200){
            var response=JSON.parse(this.responseText);
            var div=document.createElement("div");
            div.setAttribute("class","col-lg-3");
            var div2=document.createElement("div");
            div2.setAttribute("class","alert alert-warning text-center");
            var i=document.createElement("i");
            i.setAttribute("class","fa  fa-pencil fa-3x");
            var total=response["income"]-response["expense"];
            i.innerHTML="Total in all accounts:";
            if(total<0){
                i.innerHTML+="<br>"+total+"<br>";
                i.style.color="red";
            }else if(total>0){
                i.innerHTML+="<br>"+total+"<br>";
                i.style.color="green";
            }else{
                i.innerHTML+="<br>"+total+"<br>";
                i.style.color="yellow";
            }

            div2.appendChild(i);
            div.appendChild(div2);
            document.getElementById("row2").appendChild(div);
            console.log(this.responseText);

        }
    }
    request.send();
}
