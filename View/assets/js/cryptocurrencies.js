
var request1 = new XMLHttpRequest();
request1.open("get", "../index.php?target=crypto&action=cryptoCounting");
request1.onreadystatechange = function () {
    if (request1.status === 200 && request1.readyState === 4) {
        console.log(this.responseText);
        var example = JSON.parse(this.responseText);
        console.log(example);

        var str = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered\">";
        str += "<tr><th>Name</th>";
        str += "<th><span class=\"glyphicon glyphicon-bitcoin\"></span> BTC</th>";
        str += "<th><span class=\"glyphicon glyphicon-usd\"></span> USD</th>";
        str += "<th colspan=\"2\"><span class=\"glyphicon glyphicon-euro\"></span> EUR</th></tr>";


        for (var j = 0; j < example.length; j++) {
            str += "<tr >";
            for (var item in example[j]) {
                if(item == "USD") {
                    str += "<td style=\"background-color: #f4f442;\"> <span class=\"glyphicon glyphicon-usd\"></span> ";
                    str += example[j][item];
                    str += "</td>";
                }else if(item == "EUR"){
                    str += "<td style=\"background-color: #f4f442;\"> <span class=\"glyphicon glyphicon-euro\"></span> ";
                    str += example[j][item];
                    str += "</td>";
                }else if(item == "BTC"){
                    str += "<td style=\"background-color: #f4f442;\"> <span class=\"glyphicon glyphicon-bitcoin\"></span> ";
                    str += example[j][item];
                    str += "</td>";
                }else{
                    str += "<td style=\"background-color: #f4f442;\">";
                    str += example[j][item];
                    str += "</td>";
                }
            }
            str += "</tr>";
        }
        str += "</table>";
        document.getElementById("cryp").innerHTML = str;
        console.log(str);
    }else if(request.status===401){
        window.location.href="login.html";
    }
}
request1.send();