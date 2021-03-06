function cryptoCalculator() {
    document.getElementById("loadingB").style.visibility = "visible";
    var request1 = new XMLHttpRequest();
    request1.open("get", "../index.php?target=crypto&action=cryptoCalculating");
    request1.onreadystatechange = function () {
        if (request1.status === 200 && request1.readyState === 4) {
            if(request1.responseText) {
                document.getElementById("loadingB").style.visibility = "hidden";
                console.log(this.responseText);
                var example = JSON.parse(this.responseText);
                console.log(example);
                var str = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered\">";
                str += "<tr><th>Name</th>";
                str += "<th>Your Price</th>";
                str += "<th>Count</th>";
                str += "<th>Market Price Per Unit</th>";
                str += "<th>Profit/Loss</th></tr>";

                for (var j = 0; j < example.length; j++) {

                    str += "<tr >";
                    for (var item in example[j]) {
                        if ((item == "USD" || item == "price" || item == "change") && example[j]["currency"] == "USD") {

                            if (item == "change" && example[j]["change"] >= 0) {
                                str += "<td style=\"background-color: #3e8f3e;\"> <span class=\"glyphicon glyphicon-usd\"></span> ";
                                str += example[j][item];
                                str += "</td>";
                            } else if (item == "change" && example[j]["change"] < 0) {
                                str += "<td style=\"background-color: #ff8080;\"> <span class=\"glyphicon glyphicon-usd\"></span> ";
                                str += example[j][item];
                                str += "</td>";
                            } else {
                                str += "<td style=\"background-color: #f4f442;\"> <span class=\"glyphicon glyphicon-usd\"></span> ";
                                str += example[j][item];
                                str += "</td>";
                            }

                        } else if ((item == "EUR" || item == "price" || item == "change") && example[j]["currency"] == "EUR") {
                            if (item == "change" && example[j]["change"] >= 0) {
                                str += "<td style=\"background-color: #3e8f3e;\"> <span class=\"glyphicon glyphicon-euro\"></span> ";
                                str += example[j][item];
                                str += "</td>";
                            } else if (item == "change" && example[j]["change"] < 0) {
                                str += "<td style=\"background-color: #ff8080;\"> <span class=\"glyphicon glyphicon-euro\"></span> ";
                                str += example[j][item];
                                str += "</td>";
                            } else {
                                str += "<td style=\"background-color: #f4f442;\"> <span class=\"glyphicon glyphicon-euro\"></span> ";
                                str += example[j][item];
                                str += "</td>";
                            }

                        } else if ((item == "BTC" || item == "price" || item == "change") && example[j]["currency"] == "BTC") {
                            if (item == "change" && example[j]["change"] >= 0) {
                                str += "<td style=\"background-color: #3e8f3e;\"> <span class=\"glyphicon glyphicon-bitcoin\"></span> ";
                                str += example[j][item];
                                str += "</td>";
                            } else if (item == "change" && example[j]["change"] < 0) {
                                str += "<td style=\"background-color: #ff8080;\"> <span class=\"glyphicon glyphicon-bitcoin\"></span> ";
                                str += example[j][item];
                                str += "</td>";
                            } else {
                                str += "<td style=\"background-color: #f4f442;\"> <span class=\"glyphicon glyphicon-bitcoin\"></span> ";
                                str += example[j][item];
                                str += "</td>";
                            }
                        } else if (item != "currency") {
                            str += "<td style=\"background-color: #f4f442;\">";
                            str += example[j][item];
                            str += "</td>";
                        }
                    }
                    str += "</tr>";

                }
                str += "</table>";
                document.getElementById("calc").innerHTML = str;
            }
        }else if(request1.status===401){
            window.location.href="login.html";
        }
    }
    request1.send();
}