function callfunc() {
    var request = new XMLHttpRequest();
    request.open("get", "../index.php?target=budget&action=wrongBudgeting");
    request.onreadystatechange = function () {
        if (request.status === 200 && request.readyState === 4) {
            console.log(this.responseText);
            var example = JSON.parse(this.responseText);
            console.log(example);

            var str = "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" class=\"table table-striped table-bordered\">";
            str += "<tr><th>budgetId</th>";
            str += "<th>minusAmount</th>";
            str += "<th colspan=\"2\">Budget Period(from start to end)</th>";
            str += "<th>category</th></tr>";

            for (var j = 0; j < example.length; j++) {
                str += "<tr >";
                for (var item in example[j]) {
                    str += "<td style=\"background-color: #ff6666;\">";
                    str += example[j][item];
                    str += "</td>";
                }
                str += "</tr>";
            }
            str += "</table>";
            document.getElementById("infoBudget").innerHTML = str;
            console.log(str);
        }
    }
    request.send();
}