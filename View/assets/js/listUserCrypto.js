function listUserCrypto() {

    var xhr = new XMLHttpRequest();
    xhr.open("get", "../index.php?target=crypto&action=showUserCrypto");
    xhr.onreadystatechange = function (ev) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(this.responseText);
            var example = JSON.parse(this.responseText);
            console.log(example);

            var str = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered\">";
            str += "<tr><th>Name</th>";
            str += "<th><span class=\"glyphicon glyphicon-usd\"></span> USD (price)</th>";
            str += "<th colspan=\"2\"><span class=\"glyphicon glyphicon-euro\"></span> EUR (price)</th></tr>";


            for (var j = 0; j < example.length; j++) {
                str += "<tr >";
                for (var item in example[j]) {
                    if (item == "USD") {
                        str += "<td style=\"background-color: #f4f442;\"> <span class=\"glyphicon glyphicon-usd\"></span> ";
                        str += example[j][item];
                        str += "</td>";
                    } else if (item == "EUR") {
                        str += "<td style=\"background-color: #f4f442;\"> <span class=\"glyphicon glyphicon-euro\"></span> ";
                        str += example[j][item];
                        str += "</td>";
                    } else {
                        str += "<td style=\"background-color: #f4f442;\">";
                        str += example[j][item];
                        str += "</td>";
                    }
                }
                str += "</tr>";
            }
            str += "</table>";
            document.getElementById("listCrypto").innerHTML = str;
            console.log(str);

        }else if(xhr.status===401){
            window.location.href="login.html";
        }
    }

    xhr.send();

}