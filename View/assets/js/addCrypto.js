
        var str = "";
        str += "<div class=\"form-group\"><label>Type Amount</label><input type=\"text\" class=\"form-control\" id=\"cryptoName\"></div>";

        str += "<div class=\"form-group\"><label>Type Amount</label><input type=\"text\" class=\"form-control\" id=\"cryptoAbb\"></div>";

        str += "<button type=\"submit\"  id=\"but\" class=\"btn btn-primary\" >Add</button>";
        console.log(str);
        document.getElementById("addCrypto").innerHTML = str;



document.getElementById("but").addEventListener("click",function(){

    var cryptoName = document.getElementById("cryptoName").value;
    var cryptoAbb = document.getElementById("cryptoAbb").value;
    var r = new XMLHttpRequest();
    r.open("post", "../index.php?target=crypto&action=addCryptocurrency" );
    r.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    r.onreadystatechange = function (ev) {
        if(r.readyState === 4 && r.status === 200){

            console.log(cryptoAbb);
            console.log(cryptoName);
            console.log(this.responseText);
            document.getElementById("error").innerHTML = this.responseText;

        }
    }
    r.send("cryptoName="+ cryptoName +"&cryptoAbb=" + cryptoAbb );
});