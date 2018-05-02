function addCrypto() {
    var str = "";
    str += "<div class=\"form-group\"><label>Crypto Abbreviation</label><input type=\"text\" class=\"form-control\" id=\"cryptoAbb\"></div>";

    str += "<button type=\"submit\"  id=\"but\" class=\"btn btn-primary\" >Add</button>";
    console.log(str);
    document.getElementById("addCrypto").innerHTML = str;


    document.getElementById("but").addEventListener("click", function () {


        var cryptoAbb = document.getElementById("cryptoAbb").value;
        var r = new XMLHttpRequest();
        r.open("post", "../index.php?target=crypto&action=addCryptocurrency");
        r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        r.onreadystatechange = function (ev) {
            if (r.readyState === 4 && r.status === 200) {
                listUserCrypto();
                console.log(cryptoAbb);
                console.log(this.responseText);
                if(this.responseText == "Incorrect abbreviation!!!" || this.responseText == "Already exist in your list!!!") {
                    document.getElementById("errHolder").style.visibility = "visible";
                    document.getElementById("errHolder").style.color = "red";
                    document.getElementById("errHolder").innerHTML = this.responseText;
                }else{
                    document.getElementById("errHolder").style.visibility = "hidden";
                }

            }
        }
        r.send("cryptoAbb=" + cryptoAbb);
    });

}