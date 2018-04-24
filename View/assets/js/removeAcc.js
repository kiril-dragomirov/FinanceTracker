function removeAcc(id){
    var request=new XMLHttpRequest();
    request.open("post","../index.php?target=accounts&action=removeAcc");
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200){
            document.getElementById("row1").innerHTML = "";
            document.getElementById("row2").innerHTML = "";
            document.getElementById("row3").innerHTML = "";
            showAccounts();
        }
    }
    request.send("accId="+id);
}