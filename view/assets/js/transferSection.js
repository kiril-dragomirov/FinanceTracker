function showTransferSection(id) {
    var divShow = document.getElementById("show");
    document.getElementById("row1").innerHTML = "";
    document.getElementById("row2").innerHTML = "";
    document.getElementById("row3").innerHTML = "";
    divShow.style.display = "none";
    var accTrans = document.getElementById("accTrans");
    accTrans.innerHTML = "";
    accTrans.style.display = "block";
    // accTrans.innerHTML=id; TESTING
    var showButton = document.createElement("button");
    showButton.innerHTML = "Show Main Page";
    showButton.setAttribute("class", "panel panel-primary text-center no-boder panel-body blue");
    showButton.onclick = function () {
        showAccounts();
        accTrans.innerHTML = "";
        accTrans.style.display = "none";
    }
    accTrans.appendChild(showButton);
    var mainDiv = document.createElement("div");
    var selectAcc = document.createElement("select");
    selectAcc.setAttribute("class", "form-control");
    var pSelectAcc = document.createElement("p");
    pSelectAcc.innerHTML = "Selected Account";
    mainDiv.appendChild(pSelectAcc);
    //AJAX to catch all accounts names + their ids;
    var request = new XMLHttpRequest();
    request.open("get", "../index.php?target=accounts&action=accName&accName=get");
    request.onreadystatechange = function () {
        if (request.status === 200 && request.readyState === 4) {
            var response = JSON.parse(this.responseText);
            for (var item in response) {
                var option = document.createElement("option");
                option.innerHTML = response[item]["name"];
                option.value = response[item]["id"];
                if (response[item]["id"] == id) {
                    option.selected = "selected";
                }
                selectAcc.appendChild(option);
            }
            //console.log(JSON.parse(this.responseText)); TEST
        }
    }
    request.send();
    //End of ajax
    //Getting the selected id from drop down menu;
    selectAcc.onchange = function () {
        if (this.value != id) {
            //updating id with the selected acc id!
            //Later we will use id to for the transaction in DB;
            id = this.value;
            console.log(id);
            }
        document.getElementById("table").innerHTML="";
        showTable();
        searchTable(id,0,0,0);
        TransactionIncomeExpenseChart(id);
    };
    mainDiv.appendChild(selectAcc);
    accTrans.appendChild(mainDiv);

    //Amount input
    var mainDiv5 = document.createElement("div");
    var pAmount = document.createElement("p");
    pAmount.innerHTML = "Amount";
    mainDiv5.appendChild(pAmount);
    var amountInput = document.createElement("input");
    amountInput.id = "amountInput";
    amountInput.type = "number";
    amountInput.setAttribute("class", "form-control");
    amountInput.setAttribute("maxlength", "10");
    amountInput.setAttribute("min", 0);
    mainDiv5.appendChild(amountInput);
    accTrans.appendChild(mainDiv5);


    //DropDown with types (income/expense);
    var mainDiv2 = document.createElement("div");
    var selectType = document.createElement("select");
    selectType.setAttribute("class", "form-control");
    var pTypeTransaction = document.createElement("p");
    pTypeTransaction.innerHTML = "Select Type of transaction";
    mainDiv2.appendChild(pTypeTransaction);
    var requestType = new XMLHttpRequest();
    requestType.open("get", "../index.php?target=accounts&action=transType&transType=get");
    requestType.onreadystatechange = function () {
        if (requestType.status === 200 && requestType.readyState === 4) {
            var responseType = JSON.parse(this.responseText);
            var optionType = document.createElement("option");
            optionType.innerHTML = "";
            optionType.value = "";
            selectType.appendChild(optionType);
            for (var i in responseType) {
                var optionType = document.createElement("option");
                optionType.innerHTML = responseType[i]["name"];
                optionType.value = responseType[i]["id"];
                selectType.appendChild(optionType);
            }
        }
    }
    requestType.send();
    mainDiv2.appendChild(selectType);
    accTrans.appendChild(mainDiv2);
    var type_id = ""; //default the transactions will be income.
    selectType.onchange = function () {
        //updating id with the selected acc id!
        type_id = this.value;
        console.log(type_id);

    };


    //Dropdown with all categories

    var mainDiv3 = document.createElement("div");
    var selectCategory = document.createElement("select");
    selectCategory.setAttribute("class", "form-control");
    var pCategory = document.createElement("div");
    pCategory.innerHTML = "Category:";
    mainDiv3.appendChild(pCategory);
    var requestCategory = new XMLHttpRequest();
    requestCategory.open("get", "../index.php?target=accounts&action=giveCategory&giveCategory=get");
    requestCategory.onreadystatechange = function () {
        if (requestCategory.status === 200 && requestCategory.readyState === 4) {
            var responseCategory = JSON.parse(this.responseText);
            var optionCategory = document.createElement("option");
            optionCategory.innerHTML = "";
            optionCategory.setAttribute("value", "");
            selectCategory.appendChild(optionCategory);
            for (var i in responseCategory) {
                if (responseCategory[i]["name"] !== "First Income" && responseCategory[i]["id"] != 1) {
                    var optionCategory = document.createElement("option");

                    optionCategory.setAttribute("value", responseCategory[i]["id"]);
                    // optionCategory.setAttribute("background-image:url",responseCategory[i]["img_url"]);
                    var imgCat = document.createElement("IMG");
                    imgCat.setAttribute("src", responseCategory[i]["img_url"]);
                    optionCategory.innerHTML += imgCat;
                    optionCategory.innerHTML += responseCategory[i]["name"];
                    selectCategory.appendChild(optionCategory);
                }

            }
        }
    };
    requestCategory.send();
    mainDiv3.appendChild(selectCategory);
    accTrans.appendChild(mainDiv3);

    var mainDiv44 = document.createElement("div");
    accTrans.appendChild(mainDiv44);

    //var icon_id = "";
    var category_id = "";
    selectCategory.onchange = function () {

        if (this.value == 12) {
            category_id = this.value; // Later should check if category id=12!
            var mainDiv4 = document.createElement("div");
            mainDiv4.id = "4";
            var nameNewCat = document.createElement("input");
            var paragraphNameCategory = document.createElement("p");
            paragraphNameCategory.innerHTML = "New category name";
            mainDiv4.appendChild(paragraphNameCategory);
            nameNewCat.setAttribute("class", "form-control");
            nameNewCat.setAttribute("maxlength", "20");
            nameNewCat.id = "newCategoryName";
            mainDiv4.appendChild(nameNewCat);
            var divSelectIconOther=document.createElement("div");
            divSelectIconOther.setAttribute("class","drop-down");
            var selectIcon = document.createElement("select");
            selectIcon.setAttribute("name","options");
            selectIcon.setAttribute("class", "form-control");
            selectIcon.setAttribute("id", "iconList");
            var pIcon = document.createElement("p");
            pIcon.innerHTML = "Select Icon";
            mainDiv4.appendChild(pIcon);

            var requestIcon = new XMLHttpRequest();
            requestIcon.open("get", "../index.php?target=accounts&action=getIconList&getIconList=get");
            requestIcon.onreadystatechange = function () {
                if (requestIcon.status === 200 && requestIcon.readyState === 4) {
                    var responseIcon = JSON.parse(this.responseText);
                    // console.log(responseIcon); Test
                    var optionIcon = document.createElement("option");
                    optionIcon.setAttribute("value", "");
                    optionIcon.innerHTML = "";
                    selectIcon.appendChild(optionIcon);
                    for (var e in responseIcon) {
                        var optionIcon = document.createElement("option");
                        optionIcon.setAttribute("value", responseIcon[e]["id"]);
                        optionIcon.setAttribute("class",responseIcon[e]["id"]);
                        //  var img = document.createElement("img");
                        //  img.setAttribute("src", responseIcon[e]["img_url"]);
                        optionIcon.style.backgroundImage = "url(" + responseIcon[e]["img_url"] + ")";
                        //  mainDiv4.appendChild(img); //Test
                        selectIcon.appendChild(optionIcon);

                    }
                }

            }
            requestIcon.send();

            var icon_id = "";
            selectIcon.onchange = function () {
                icon_id = this.value;
                console.log(icon_id); //Testing;
            }
            divSelectIconOther.appendChild(selectIcon);
            mainDiv4.appendChild(divSelectIconOther);


            mainDiv44.appendChild(mainDiv4);


        } else {
            //updating id with the selected cat id!
            if (typeof(document.getElementById("4")) != "undefined" && document.getElementById("4") != null) {
                var removeDiv = document.getElementById("4");
                mainDiv44.removeChild(removeDiv);
            }

            //Setting Category id! ; IMPORTANT for later!
            category_id = this.value;
            // var icon_id="";
            // selectIcon.onchange = function () {
            //     icon_id = this.value;
            //     //console.log(icon_id); //Testing;
            // }

        }
        console.log(category_id);
    }

    accTrans.appendChild(mainDiv44);

    //Regex amount
    var amountRegex = /\s[0-1]{1}[0-9]{0,3}/;
    var nameTransactionRegex = /^[a-zA-Z ]+$/;


    var buttonInsertTransacation = document.createElement("button");
    buttonInsertTransacation.innerHTML = "Insert Transaction into Account";
    buttonInsertTransacation.setAttribute("class", "btn btn-success");
    //  Ajax input into DB.
    buttonInsertTransacation.onclick = function () {
        var err = false;

        if (id == "" || id == null) {
            console.log("idAcc");
            err = true;
        }

        var amount = document.getElementById("amountInput").value.trim();
        if (amount == "" || amount == null || amount < 0) {
            err = true;
            console.log("AmountAcc");
        }
        else if (amountRegex.test(amount)) {
            err = true;
            console.log("AmountAccRegex");
        }

        if (type_id.trim() == "" || type_id == null) {
            err = true;
            console.log("typeId");
        }

        if (category_id.trim() == "" || category_id.trim() == null) {

            console.log("category");
            err = true;
        }
        if (category_id == 12) {
            var nameNewCatInput = document.getElementById("newCategoryName").value.trim();
            if (nameNewCatInput == "" || nameNewCatInput == null) {
                err = true;
                console.log("newCatName");
            } else if (!nameTransactionRegex.test(nameNewCatInput)) {
                err = true;
                console.log("RegexName");
            }
            var icon_list = document.getElementById("iconList").value;
            if (icon_list == "" || icon_list == null) {
                err = true;
                console.log(icon_list);
            }
        }

        if (err === true) {
            mainDivErr.innerHTML = "Please fill all the fields and select lists!";
        } else {
            mainDivErr.innerHTML = "";
        }

        if (err === false) {
            if (category_id != 12) {
                var requestInsertTransaction = new XMLHttpRequest();
                requestInsertTransaction.open("post", "../index.php?target=transactions&action=insertTransaction");
                requestInsertTransaction.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                requestInsertTransaction.onreadystatechange = function () {
                    if (requestInsertTransaction.readyState === 4 && requestInsertTransaction.status === 200) {
                        console.log(this.responseText); //Testing Purpose
                        if (this.responseText == "correct!") {
                            accTrans.innerHTML = "";
                            accTrans.style.display = "none";
                            showAccounts();
                        }
                    }
                }
                requestInsertTransaction.send("accId=" + id + "&amount=" + amount + "&categoryId=" + category_id
                    + "&typeId=" + type_id);
            }
            else if (category_id == 12) {
                var requestInsertTransactionAndCategory = new XMLHttpRequest();
                requestInsertTransactionAndCategory.open("post", "../index.php?target=transactions&action=insertTransactionAndCategory");
                requestInsertTransactionAndCategory.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                requestInsertTransactionAndCategory.onreadystatechange = function () {
                    if (requestInsertTransactionAndCategory.readyState === 4 &&
                        requestInsertTransactionAndCategory.status === 200) {
                        console.log(this.responseText); //Testing Purpose
                        if (this.responseText == "correct") {
                            accTrans.innerHTML = "";
                            accTrans.style.display = "none";
                            showAccounts();
                        }else{
                            accTrans.innerHTML="";
                            showTransferSection(id);
                        }
                    }
                }
                requestInsertTransactionAndCategory.send("accId=" + id + "&amount=" + amount + "&categoryName=" +
                    nameNewCatInput+"&iconId="+ icon_list + "&typeId=" + type_id);
            }
        }

    }

    accTrans.appendChild(buttonInsertTransacation);
    var mainDivErr = document.createElement("div");

    accTrans.appendChild(mainDivErr);
    var divTable = document.createElement("div");
    divTable.setAttribute("class","panel panel-default");
    divTable.id="table";


    function showTable() {

       var table= document.getElementById("table");
       table.innerHTML="";
       var panelHeading=document.createElement("div");
       panelHeading.setAttribute("class","panel-heading");
       panelHeading.innerHTML="Transactions";
       table.appendChild(panelHeading);
       var panelBody=document.createElement("div");
       panelBody.setAttribute("class","panel-body");
       var selectTypeTable=document.createElement("select");
        selectTypeTable.setAttribute("class","col-sm-3"); //form-control



        //Getting all the Type Transactions with AJAX:
        var tableType = new XMLHttpRequest();
        tableType.open("get", "../index.php?target=accounts&action=transType&transType=get");
        tableType.onreadystatechange = function () {
            if (tableType.status === 200 && tableType.readyState === 4) {
                var responseType = JSON.parse(this.responseText);
                var tableOptionType = document.createElement("option");
                tableOptionType.innerHTML = "";
                tableOptionType.value = 0;
                selectTypeTable.appendChild(tableOptionType);
                for (var i in responseType) {
                    var tableOptionType = document.createElement("option");
                    tableOptionType.innerHTML = responseType[i]["name"];
                    tableOptionType.value = responseType[i]["id"];
                    selectTypeTable.appendChild(tableOptionType);
                }
            }
        }
        tableType.send();
            var tableTypeId="";
        var selectedDateTo="";//Del
        selectTypeTable.onchange = function () {
            tableTypeId = this.value;
            //updating id with the selected acc id!
            if(selectDateTo.selectedIndex != 0){
                selectedDateTo=selectDateTo.value;
                searchTable(id,tableTypeId,selectDateFromValue,selectedDateTo);
            }else {


                searchTable(id, tableTypeId, selectDateFromValue, selectedDateTo);
            }
            console.log(tableTypeId);

        }

       panelBody.appendChild(selectTypeTable);

        //Select menu with available dates
       var selectDateFrom=document.createElement("select");
        selectDateFrom.setAttribute("class","col-sm-3"); //form-control
        var requestDateFrom= new XMLHttpRequest();
        requestDateFrom.open("get","../index.php?target=transactions&action=dateFrom&accId="+id);
        requestDateFrom.onreadystatechange=function(){
            if(requestDateFrom.readyState===4 && requestDateFrom.status===200){
                var responseDateFrom=JSON.parse(this.responseText);
                var optionDateFrom=document.createElement("option");
                optionDateFrom.value=0;
                optionDateFrom.innerHTML="";
                selectDateFrom.appendChild(optionDateFrom);
                for(var i in responseDateFrom){
                    var optionDateFrom=document.createElement("option");
                    optionDateFrom.value=responseDateFrom[i]["date"];
                    optionDateFrom.innerHTML=responseDateFrom[i]["date"];
                    selectDateFrom.appendChild(optionDateFrom);
                }
               // console.log(responseDateFrom); TESTING PURPOSE
            }

        }
        requestDateFrom.send();

        panelBody.appendChild(selectDateFrom);

        //SELECT menu with "TO:" dates;
        var selectDateToValue="";
        var selectDateTo=document.createElement("select");
        selectDateTo.setAttribute("class","col-sm-3"); //form-control
        var selectDateFromValue="";
        selectDateFrom.onchange=function(){
            selectDateTo.innerHTML="";
            selectDateFromValue=this.value;
            var selectDateToValue="";
            searchTable(id,tableTypeId,selectDateFromValue,selectDateToValue);
            console.log(selectDateFromValue);
            if(selectDateFromValue.trim()!=0){
                var requestSelectDateTo= new XMLHttpRequest();
                requestSelectDateTo.open("get","../index.php?target=transactions&action=getDateToList&dateFrom="
                    +selectDateFromValue+"&accId="+id);
                requestSelectDateTo.onreadystatechange=function(){
                    if(requestSelectDateTo.readyState===4 && requestSelectDateTo.status===200){
                        var responseSelectDateTo=JSON.parse(this.responseText);
                        var optionDateTo=document.createElement("option");
                        optionDateTo.value=0;
                        optionDateTo.innerHTML="";
                        selectDateTo.appendChild(optionDateTo);
                        for(var i in responseSelectDateTo){
                            var optionDateTo=document.createElement("option");
                            optionDateTo.value=responseSelectDateTo[i]["date"];
                            optionDateTo.innerHTML=responseSelectDateTo[i]["date"];
                            selectDateTo.appendChild(optionDateTo);
                        }
                       // console.log(responseSelectDateTo); Testing Purpose
                    }
                }
                requestSelectDateTo.send();

                selectDateTo.onchange=function(){
                    selectDateToValue=this.value;
                    console.log(selectDateToValue);
                    searchTable(id,tableTypeId,selectDateFromValue,selectDateToValue);
                }
            }


        }
        selectedDateTo=selectDateToValue;
        var selectedDateFrom=selectDateFromValue;
        panelBody.appendChild(selectDateTo);

       var responsiveTable=document.createElement("div");
       responsiveTable.setAttribute("class","table-responsive");
       var tableBody=document.createElement("table");
       tableBody.setAttribute("class","table table-hover");
       var tbody=document.createElement("tbody");
       tbody.setAttribute("id","tbody");
       var tr=document.createElement("tr");
       var td=document.createElement("td");
       td.innerHTML=id;
       tr.appendChild(td);
       tbody.appendChild(tr);
       tableBody.appendChild(tbody);
       responsiveTable.appendChild(tableBody);
       panelBody.appendChild(responsiveTable);
       table.appendChild(panelBody);

    }
    accTrans.appendChild(divTable);



    showTable();
    searchTable(id,0,0,0);




    accTrans.appendChild(divTable);

    var divChart=document.createElement("div");
    divChart.id="chart";
    accTrans.appendChild(divChart);
    TransactionIncomeExpenseChart(id);
}


// !!!!!!!!!--------!!!!!!!! Must have validaions if Any value of the drop down is empty string /""/ and if
// there is such value in db!;

