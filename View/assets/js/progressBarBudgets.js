





var request = new XMLHttpRequest();
request.open("get","../index.php?target=budget&action=budgetingDiff");
request.onreadystatechange = function (ev) {
    if(request.status === 200 && request.readyState === 4){
        var response = 4;
        var str = "";
        for(var i = 0; i < response; i++) {

             str += "<div class=\"col-sm-10\" style=\"margin-top: 100px\" >\n" +
                "    <div>\n" +
                "        <p>\n" +
                "            <strong>Task 4</strong>\n" +
                "            <span class=\"pull-right text-muted\">80% Complete</span>\n" +
                "        </p>\n" +
                "        <div class=\"progress progress-striped active\">\n" +
                "            <div class=\"progress-bar progress-bar-danger\" role=\"progressbar\" aria-valuenow=\"80\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 80%\">\n" +
                "                <span class=\"sr-only\">80% Complete (danger)</span>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>";
        }
        document.getElementById("opa").innerHTML = str;
    }
}

request.send();



