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
                document.getElementById("error").innerHTML = this.responseText;

            }
        }
        r.send("cryptoAbb=" + cryptoAbb);
    });

}