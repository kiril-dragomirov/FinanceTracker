

function sendEmailAndPass() {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    var xhr = new XMLHttpRequest();
    xhr.open("post", "../controller/loginController.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if(xhr.status === 200 && xhr.readyState === 4){
            document.getElementById("errors").style.color = "red";
            document.getElementById("errors").innerHTML = this.responseText;
        }
    }
    xhr.send("email="+ email + "&password=" + pass);
}