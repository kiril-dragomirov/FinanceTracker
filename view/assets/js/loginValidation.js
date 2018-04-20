

function sendEmailAndPass() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    var xhr = new XMLHttpRequest();
    xhr.open("post", "../index.php?target=user&action=login");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if(xhr.status === 200 && xhr.readyState === 4){
            if(this.responseText == "incorrect data") {
                document.getElementById("errors").style.color = "red";
                document.getElementById("errors").innerHTML = this.responseText;
            }else{
                location.href="../view/main.html";
                // document.getElementById("errors").style.color = "red";
                // document.getElementById("errors").innerHTML = this.responseText;
            }
        }
    }
    xhr.send("email="+ email + "&password=" + pass);
}