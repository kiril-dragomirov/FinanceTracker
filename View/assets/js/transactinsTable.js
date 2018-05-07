function searchTable(acc_id,type_id,date_from,date_to) {
    console.log("Smetka: " + acc_id + " tip tranzakciya: " + type_id + "ot data: " + date_from + " do data: " + date_to);


    if (type_id == 0 && date_from == 0 && date_to==0) {
        console.log("Smetka: " + acc_id + " tip tranzakciya: " + "Vsichki" + "ot data: " + "Vsichki" + " do data: " + "Vsichki");
        getData();
    }
    else if (type_id.trim() != 0 && date_from.trim() == 0 && date_to.trim()==0) {
        console.log("Smetka: " + acc_id + " tip tranzakciya: " + type_id + "ot data: " + "Vsichki" + " do data: " + "Vsichki");
        getData();
    }
    else if (type_id.trim() == 0 && date_from.trim() != 0 && date_to.trim()==0) {
        getData();
        console.log("Smetka: " + acc_id + " tip tranzakciya: " + "Vsichki" + "ot data: " + date_from + " do data: " + "Vsichki");
    }else if(type_id.trim()!=0 && date_from.trim()!=0 && date_to.trim()==0){
        console.log("Smetka: " + acc_id + " tip tranzakciya: " + type_id + "ot data: " + date_from + " do data: " + "Vsichki");
        getData();
    }else if(type_id.trim()!=0 && date_from.trim()!=0 && date_to.trim()!=0){
        console.log("Smetka: " + acc_id + " tip tranzakciya: " + type_id + "ot data: " + date_from + " do data: " + date_to);
        getData();
    }else if(type_id.trim()==0 && date_from.trim()!=0 && date_to.trim()!=0){
        console.log("Smetka: " + acc_id + " tip tranzakciya: " + "Vsichki" + "ot data: " + date_from + " do data: " + date_to);
        getData();
    }

    function getData() {
        var request = new XMLHttpRequest();
        var tbody = document.getElementById("tbody");
        tbody.innerHTML="";
        request.open("post", "../index.php?target=transactions&action=getTransactions");
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var response = JSON.parse(this.responseText);
                console.log(this.responseText);
                var tr=document.createElement("tr");
                var th1=document.createElement("th");
                th1.innerHTML="Account Name";
                tr.appendChild(th1);
                tbody.appendChild(tr);
                var th2=document.createElement("th");
                th2.innerHTML="Amount Income/Expense";
                tr.appendChild(th2);
                var th3=document.createElement("th");
                th3.innerHTML="Category Name";
                tr.appendChild(th3);
                var th4=document.createElement("th");
                th4.innerHTML="Remove";
                tr.appendChild(th4);
                var th5=document.createElement("th");
                th5.innerHTML="Date and Icon";
                tr.appendChild(th5);
                // var th6=document.createElement("th");
                // th6.innerHTML="Icon";
                // tr.appendChild(th6);
                tbody.appendChild(tr);


                for (var i in response) {
                    var tr = document.createElement("tr");
                    tr.id = "tr" + response[i]["ID"];
                    for (var e in response[i]) {
                        if (e != "Type") {
                            if (e != "ID") {

                                if(e=="image"){
                                    var img=document.createElement("img");
                                    img.setAttribute("src",response[i][e]);
                                    td.appendChild(img);
                                }else{ var td = document.createElement("td");
                                    td.innerHTML = response[i][e];
                                }
                                tr.appendChild(td);
                            } else if (e == "ID") {
                                var removeTransaction = document.createElement("button");
                                removeTransaction.setAttribute("class", "btn btn-warning btn-circle");
                                var iButton = document.createElement("i");
                                iButton.setAttribute("class", "fa fa-times");
                                removeTransaction.appendChild(iButton);
                                removeTransaction.id = response[i][e];

                                //Deleting Transaction
                                removeTransaction.onclick = function () {

                                    var remove_id = this.id;
                                    var removetr = document.getElementById("tr" + remove_id);
                                    tbody.removeChild(removetr);

                                    var removeRequest = new XMLHttpRequest();
                                    removeRequest.open("post", "../index.php?target=transactions&action=removeTransaction");
                                    removeRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                    removeRequest.onreadystatechange = function () {
                                        if (removeRequest.readyState === 4 && removeRequest.status === 200) {
                                            console.log(this.responseText);
                                        }
                                    }
                                    removeRequest.send("transId=" + remove_id);
                                    incomeExpenseChart(acc_id);
                                    console.log(remove_id);
                                }
                                tr.appendChild(removeTransaction);
                            }
                        } else {
                            if (response[i][e] == 1) {
                                tr.style.backgroundColor = "#00cc44";
                            } else {
                                tr.style.backgroundColor = "#ff6666";

                            }


                        }
                    }
                    tbody.appendChild(tr);
                }
                //console.log(response);
            }
        }
        request.send("accId=" + acc_id + "&type_id=" + type_id + "&date_from=" + date_from + "&date_to=" + date_to);
    }
}