var request = new XMLHttpRequest();
request.open("get", "../index.php?target=user&action=lastLogin");
request.onreadystatechange = function (ev) {
    if(request.status === 200 && request.readyState === 4){

        var str = "* Last login: ";
        var res = JSON.parse(this.responseText);
        console.log(res);
        str += res["date"];

        document.getElementById("logs").innerHTML = str;
    }
}
request.send();