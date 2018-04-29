function logout(){
    var request =new XMLHttpRequest();
    request.open("get","../index.php?target=user&action=logout");
    request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200){
            if(this.responseText==="true"){
                window.location.href="login.html"
            }
        }
    }
    request.send();
}