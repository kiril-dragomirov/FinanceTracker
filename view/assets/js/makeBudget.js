var xhr = new XMLHttpRequest();
xhr.open("get", "../index.php?target=budget&action=selectAccount");
xhr.onreadystatechange = function (ev) {
    if(xhr.status == 200 && xhr.readyState == 4){


        console.log(this.responseText);
        var response = JSON.parse(this.responseText);
        var acc = "";
        console.log(response);

        var str6 = "<div class=\"form-group\"><label>Select account</label><select class=\"form-control\" id=\"acc\">";
        for(var i in response){
            if(response[i].name != null) {
                str6 += "<option value=\""+response[i].id +"\">";
                str6 += response[i].name;
                str6 += "</option>";
            }
            if(response[i].id){
                acc = response[i].id;
            }

        }

        str6 += "</select></div>";
        document.getElementById("account").innerHTML = str6;
        var str1 = "<div class=\"form-group\"><label>Type Amount</label><input type=\"number\" class=\"form-control\" id=\"am\"></div>";
        document.getElementById("amount").innerHTML = str1;
        var str2 = "<div class=\"form-group\"><label>Select category</label><select class=\"form-control\" id=\"cat\">";

        for(var j in response){
            if(response[j].cat != null) {
                str2 += "<option value=\""+ response[i].id_cat +"\">";
                str2 += response[j].cat;
                str2 += "</option>";
            }

        }
        str2 += "</select></div>";
        document.getElementById("category").innerHTML = str2;

        var str3 = "<div class=\"form-group\"><label>Date From </label><input class=\"form-control\" id=\"datefrom\"></div>";
        document.getElementById("from").innerHTML = str3;

        var str4 = "<div class=\"form-group\"><label>Date To</label><input class=\"form-control\" id=\"dateto\"></div>";
        document.getElementById("to").innerHTML = str4;

        var str = "<button type=\"submit\"  class=\"btn btn-primary\" >Make a plan</button>";
        document.getElementById("but").innerHTML = str;
        document.getElementById("da").options[document.getElementById("da").selectedIndex].value
        console.log(str)
        console.log(document.getElementById("da").options[document.getElementById("da").selectedIndex].value)


    }
}
xhr.send();
//ADDING EVENT ON THE BUTTON
document.getElementById("but").addEventListener("click",function(){
    var e1 = document.getElementById("acc");
    var str1 = e1.options[e1.selectedIndex].value;
    var e2 = document.getElementById("cat");
    var str2 = e2.options[e2.selectedIndex].value;
    var e3 = document.getElementById("am").value;
    var e4 = document.getElementById("datefrom").value;
    var e5 = document.getElementById("dateto").value;
    var r = new XMLHttpRequest();
    r.open("post", "../index.php?target=budget&action=makeBudget" );
    r.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    r.onreadystatechange = function (ev) {
        if(r.readyState === 4 && r.status === 200){
            console.log(str1);
            console.log(str2);
            console.log(e3);
            console.log(e4);
            console.log(e5);
            console.log(this.responseText);
        }
    }
    r.send("account_id="+ str1 +"&budget_amount=" + e3 +"&category_id="+ str2 + "&date_from=" + e4 + "&date_to=" + e5);
})