function makeAccountTimeline(){
    var req = new XMLHttpRequest();
    req.open("get", "../index.php?target=accounts&action=accName");
    req.onreadystatechange = function (ev) {
        if(req.status === 200 && req.readyState === 4){
            var response = JSON.parse(this.responseText);
            var str = "";
            str += "<div class=\"form-group\"><label>Select Account</label><select class=\"form-control\" id=\"accId\">";
            for (var i in response) {

                str += "<option value=\"" + response[i].id + "\">";
                str += response[i].name;
                str += "</option>";


            }

            str += "</select></div>";

            document.getElementById("chooseAcc").innerHTML = str;
            var str1 = "<button type=\"submit\" class=\"btn btn-primary\" >Check</button>";
            document.getElementById("pushAcc").innerHTML = str1;

        }
    }

    req.send();

    document.getElementById("pushAcc").addEventListener("click", function () {
        var e1 = document.getElementById("accId");
        var accId = e1.options[e1.selectedIndex].value;

        var re = new XMLHttpRequest();
        re.open("post", "../index.php?target=accounts&action=makeAccountTimeline");
        re.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        re.onreadystatechange = function (ev) {
            if (re.readyState === 4 && re.status === 200) {
                var response = JSON.parse(this.responseText);
                console.log("infoooooooooooo");
                console.log(response);
                var str20 = "";
                str20 += "            <div class=\"row\">\n" +
                    "                <div class=\"col-lg-12\">\n" +
                    "                    <!--Timeline -->\n" +
                    "                    <div class=\"panel panel-primary\">\n" +
                    "                        <div class=\"panel-heading\">\n" +
                    "                            <i class=\"fa fa-clock-o fa-fw\"></i>Timeline\n" +
                    "                        </div>\n" +
                    "\n" +
                    "                        <div class=\"panel-body\">\n" +
                    "                            <ul class=\"timeline\">";

                for(var i in response) {
                    if(response[i].type == "Income") {
                        str20 += "                                <li>\n" +
                            "                                    <div class=\"timeline-badge success\">\n" +
                            "                                        <i class=\"fa fa-thumbs-up\"></i>\n" +
                            "                                    </div>\n" +
                            "                                    <div class=\"timeline-panel\">\n" +
                            "                                        <div class=\"timeline-heading\">\n" +
                            "                                            <h4 class=\"timeline-title\">"+response[i].category+"</h4>\n" +
                            "                                            <p style=\"color:green;\">\n" +
                            "                                                <small class=\"text-muted\"><i class=\"fa fa-check\"></i> "+response[i].type+"</small>\n" +
                            "                                            </>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"timeline-body\">\n" +
                            "                                            <p>Amount money: "+ response[i].amount +"</p>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"timeline-body\">\n" +
                            "                                            <p>Account name: "+response[i].account+"</p>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                </li>\n";
                    }else {
                        str20 += "                                <li class=\"timeline-inverted\">\n" +
                            "                                    <div class=\"timeline-badge danger\">\n" +
                            "                                        <i class=\"fa fa-thumbs-down\"></i>\n" +
                            "                                    </div>\n" +
                            "                                    <div class=\"timeline-panel\">\n" +
                            "                                        <div class=\"timeline-heading\">\n" +
                            "                                            <h4 class=\"timeline-title\">"+response[i].category+"</h4>\n" +
                            "                                            <p style=\"color:red;\">\n" +
                            "                                                <small class=\"text-muted\"><i class=\"fa fa-close\"></i> "+response[i].type+"</small>\n" +
                            "                                            </p>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"timeline-body\">\n" +
                            "                                            <p>Amount money: "+ response[i].amount +"</p>\n" +
                            "                                        </div>\n" +
                            "                                        <div class=\"timeline-body\">\n" +
                            "                                            <p>Account name: "+response[i].account+"</p>\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                </li>\n";
                    }
                }

                str20 +="                            </ul>\n" +
                    "                        </div>\n" +
                    "\n" +
                    "                    </div>\n" +
                    "                    <!--End Timeline -->\n" +
                    "                </div>\n" +
                    "            </div>";

                document.getElementById("accTimeline").innerHTML = str20;

            }
        }
        re.send("accId=" + accId);
    });


}


            //
            // str2 += "            <div class=\"row\">\n" +
            //     "                <div class=\"col-lg-12\">\n" +
            //     "                    <!--Timeline -->\n" +
            //     "                    <div class=\"panel panel-primary\">\n" +
            //     "                        <div class=\"panel-heading\">\n" +
            //     "                            <i class=\"fa fa-clock-o fa-fw\"></i>Timeline\n" +
            //     "                        </div>\n" +
            //     "\n" +
            //     "                        <div class=\"panel-body\">\n" +
            //     "                            <ul class=\"timeline\">\n" +
            //     "                                <li>\n" +
            //     "                                    <div class=\"timeline-badge\">\n" +
            //     "                                        <i class=\"fa fa-check\"></i>\n" +
            //     "                                    </div>\n" +
            //     "                                    <div class=\"timeline-panel\">\n" +
            //     "                                        <div class=\"timeline-heading\">\n" +
            //     "                                            <h4 class=\"timeline-title\">Timeline Event</h4>\n" +
            //     "                                            <p>\n" +
            //     "                                                <small class=\"text-muted\"><i class=\"fa fa-time\"></i>11 hours ago via Twitter</small>\n" +
            //     "                                            </p>\n" +
            //     "                                        </div>\n" +
            //     "                                        <div class=\"timeline-body\">\n" +
            //     "                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo eu mi scelerisque vulputate. Aliquam in metus eu lectus aliquet egestas.</p>\n" +
            //     "                                        </div>\n" +
            //     "                                    </div>\n" +
            //     "                                </li>\n" +
            //     "                                <li class=\"timeline-inverted\">\n" +
            //     "                                    <div class=\"timeline-badge warning\">\n" +
            //     "                                        <i class=\"fa fa-credit-card\"></i>\n" +
            //     "                                    </div>\n" +
            //     "                                    <div class=\"timeline-panel\">\n" +
            //     "                                        <div class=\"timeline-heading\">\n" +
            //     "                                            <h4 class=\"timeline-title\">Timeline Event</h4>\n" +
            //     "                                        </div>\n" +
            //     "                                        <div class=\"timeline-body\">\n" +
            //     "                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo eu mi scelerisque vulputate. Aliquam in metus eu lectus aliquet egestas.</p>\n" +
            //     "                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo eu mi scelerisque vulputate. Aliquam in metus eu lectus aliquet egestas.</p>\n" +
            //     "                                        </div>\n" +
            //     "                                    </div>\n" +
            //     "                                </li>\n" +
            //     "                                <li>\n" +
            //     "                                    <div class=\"timeline-badge danger\">\n" +
            //     "                                        <i class=\"fa fa-credit-card\"></i>\n" +
            //     "                                    </div>\n" +
            //     "                                    <div class=\"timeline-panel\">\n" +
            //     "                                        <div class=\"timeline-heading\">\n" +
            //     "                                            <h4 class=\"timeline-title\">Timeline Event</h4>\n" +
            //     "                                        </div>\n" +
            //     "                                        <div class=\"timeline-body\">\n" +
            //     "                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo eu mi scelerisque vulputate. Aliquam in metus eu lectus aliquet egestas.</p>\n" +
            //     "                                        </div>\n" +
            //     "                                    </div>\n" +
            //     "                                </li>\n" +
            //     "                                <li class=\"timeline-inverted\">\n" +
            //     "                                    <div class=\"timeline-panel\">\n" +
            //     "                                        <div class=\"timeline-heading\">\n" +
            //     "                                            <h4 class=\"timeline-title\">Timeline Event</h4>\n" +
            //     "                                        </div>\n" +
            //     "                                        <div class=\"timeline-body\">\n" +
            //     "                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo eu mi scelerisque vulputate. Aliquam in metus eu lectus aliquet egestas.</p>\n" +
            //     "                                        </div>\n" +
            //     "                                    </div>\n" +
            //     "                                </li>\n" +
            //     "                                <li>\n" +
            //     "                                    <div class=\"timeline-badge info\">\n" +
            //     "                                        <i class=\"fa fa-save\"></i>\n" +
            //     "                                    </div>\n" +
            //     "                                    <div class=\"timeline-panel\">\n" +
            //     "                                        <div class=\"timeline-heading\">\n" +
            //     "                                            <h4 class=\"timeline-title\">Timeline Event</h4>\n" +
            //     "                                        </div>\n" +
            //     "                                        <div class=\"timeline-body\">\n" +
            //     "                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo eu mi scelerisque vulputate. Aliquam in metus eu lectus aliquet egestas.</p>\n" +
            //     "                                            <hr>\n" +
            //     "                                            <div class=\"btn-group\">\n" +
            //     "                                                <button type=\"button\" class=\"btn btn-primary btn-sm dropdown-toggle\" data-toggle=\"dropdown\">\n" +
            //     "                                                    <i class=\"fa fa-cog\"></i>\n" +
            //     "                                                    <span class=\"caret\"></span>\n" +
            //     "                                                </button>\n" +
            //     "                                                <ul class=\"dropdown-menu\" role=\"menu\">\n" +
            //     "                                                    <li><a href=\"#\">Action</a>\n" +
            //     "                                                    </li>\n" +
            //     "                                                    <li><a href=\"#\">Another action</a>\n" +
            //     "                                                    </li>\n" +
            //     "                                                    <li><a href=\"#\">Something else here</a>\n" +
            //     "                                                    </li>\n" +
            //     "                                                    <li class=\"divider\"></li>\n" +
            //     "                                                    <li><a href=\"#\">Separated link</a>\n" +
            //     "                                                    </li>\n" +
            //     "                                                </ul>\n" +
            //     "                                            </div>\n" +
            //     "                                        </div>\n" +
            //     "                                    </div>\n" +
            //     "                                </li>\n" +
            //     "                                <li>\n" +
            //     "                                    <div class=\"timeline-panel\">\n" +
            //     "                                        <div class=\"timeline-heading\">\n" +
            //     "                                            <h4 class=\"timeline-title\">Timeline Event</h4>\n" +
            //     "                                        </div>\n" +
            //     "                                        <div class=\"timeline-body\">\n" +
            //     "                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo eu mi scelerisque vulputate. Aliquam in metus eu lectus aliquet egestas.</p>\n" +
            //     "                                        </div>\n" +
            //     "                                    </div>\n" +
            //     "                                </li>\n" +
            //     "                                <li class=\"timeline-inverted\">\n" +
            //     "                                    <div class=\"timeline-badge success\">\n" +
            //     "                                        <i class=\"fa fa-thumbs-up\"></i>\n" +
            //     "                                    </div>\n" +
            //     "                                    <div class=\"timeline-panel\">\n" +
            //     "                                        <div class=\"timeline-heading\">\n" +
            //     "                                            <h4 class=\"timeline-title\">Timeline Event</h4>\n" +
            //     "                                        </div>\n" +
            //     "                                        <div class=\"timeline-body\">\n" +
            //     "                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel justo eu mi scelerisque vulputate. Aliquam in metus eu lectus aliquet egestas.</p>\n" +
            //     "                                        </div>\n" +
            //     "                                    </div>\n" +
            //     "                                </li>\n" +
            //     "                            </ul>\n" +
            //     "                        </div>\n" +
            //     "\n" +
            //     "                    </div>\n" +
            //     "                    <!--End Timeline -->\n" +
            //     "                </div>\n" +
            //     "            </div>";
