checkIfUserIsLogged();

function checkIfUserIsLogged(){
    var request= new XMLHttpRequest();
    request.open("get","../index.php?target=user&action=check");
    request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200){
            var loc=window.location.href;
            if(this.responseText==="true"){

                if(loc=="http://localhost/tracker/FinanceTracker/view/login.html" || loc=="http://localhost/tracker/FinanceTracker/view/register.html"){
                     window.location.href="index.html";
                }

                console.log(window.location.href);
            }else{
                if(loc=="http://localhost/tracker/FinanceTracker/view/register.html"){
                    // window.location.href = "register.html";
                }else if(loc!="http://localhost/tracker/FinanceTracker/view/login.html") {
                    window.location.href = "login.html";
                }

            }
        }
    }
    request.send();
}