function addCrypto() {
    var x = new XMLHttpRequest();
    x.open("get", "../index.php?target=crypto&action=selectCurrencies");
    x.onreadystatechange = function (ev) {
        if (x.readyState === 4 && x.status === 200) {
            var response = JSON.parse(this.responseText);
            var str = "";
            str += "<div class=\"form-group\"><label>Crypto Abbreviation</label><input type=\"text\" class=\"form-control\" id=\"cryptoAbb\"></div>";
            str += "<div class=\"form-group\"><label>Price (price per unit)</label><input type=\"number\" class=\"form-control\" id=\"buyPrice\"></div>";
            str += "<div class=\"form-group\"><label>Select currency</label><select class=\"form-control\" id=\"typeC\">";
            for (var i in response) {

                str += "<option value=\"" + response[i].id + "\">";
                str += response[i].name;
                str += "</option>";


            }

            str += "</select></div>";

            str += "<div class=\"form-group\"><label>Count</label><input type=\"number\" class=\"form-control\" id=\"cryptoCount\"></div>";
            var str1 = "<button type=\"submit\" class=\"btn btn-primary\" >Add</button>";
            console.log(str);
            document.getElementById("addCrypto").innerHTML = str;
            document.getElementById("push").innerHTML = str1;
        }
    }
    x.send();

    document.getElementById("push").addEventListener("click", function () {
        var e1 = document.getElementById("typeC");
        var typeCur = e1.options[e1.selectedIndex].value;
        var cryptoAbb = document.getElementById("cryptoAbb").value;
        var price = document.getElementById("buyPrice").value;
        var count = document.getElementById("cryptoCount").value;
        var r = new XMLHttpRequest();
        r.open("post", "../index.php?target=crypto&action=addCryptocurrency");
        r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        r.onreadystatechange = function (ev) {
            if (r.readyState === 4 && r.status === 200) {

                // console.log(typeCur);
                console.log(this.responseText);
                if (this.responseText == "Incorrect abbreviation!!!") {
                    document.getElementById("errHolder").style.visibility = "visible";
                    document.getElementById("errHolder").style.color = "red";
                    document.getElementById("errHolder").innerHTML = this.responseText;
                } else {
                    // document.getElementById("errHolder").style.visibility = "hidden";
                    document.getElementById("errHolder").style.color = "green";
                    document.getElementById("errHolder").innerHTML = this.responseText;
                    cryptoCalculator();

                }

            }
        }
        r.send("cryptoAbb=" + cryptoAbb + "&cryptoPrice=" + price + "&cryptoCount=" + count + "&typeCur=" + typeCur);
    });

}