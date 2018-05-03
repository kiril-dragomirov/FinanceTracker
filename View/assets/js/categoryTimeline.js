categoryTimeline();

function categoryTimeline(){
    var mainDiv=document.getElementById("categoryTimelineDiv");
    mainDiv.innerHTML="";
   // mainDiv.innerHTML="Timeline";
   //  var divInfo=document.createElement("infoPage");
   //  divInfo.setAttribute("class","alert alert-info");
   // divInfo.innerHTML="Timeline showing expenses and incomes for each category";
   //     mainDiv.appendChild(divInfo);

    var divSelectCategory=document.createElement("div");
    divSelectCategory.setAttribute("id","categoryDivSelect");
    mainDiv.appendChild(divSelectCategory);
    categorySelect()

    var divTimeline=document.createElement("div");
    divTimeline.setAttribute("class","panel panel-primary");
    divTimeline.setAttribute("id","timeline");
    mainDiv.appendChild(divTimeline);
    timeline("all");
}

function categorySelect() {

    var divCatSelectChart = document.getElementById("categoryDivSelect");
    divCatSelectChart.innerHTML = "";
    var selectCategoryChart = document.createElement("select");
    selectCategoryChart.id = "categoryId";
    selectCategoryChart.setAttribute("class", "form-control");

    divCatSelectChart.appendChild(selectCategoryChart);

    var request = new XMLHttpRequest();
    request.open("get", "../index.php?target=transactions&action=getCategoryUser");
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var option = document.createElement("option");
            option.innerHTML = "";
            option.value = "all";
            selectCategoryChart.appendChild(option);
            var response = JSON.parse(this.responseText);
            for (var i in response) {
                var option = document.createElement("option");
                option.innerHTML = response[i]["name"];
                option.value = response[i]["id"];
                selectCategoryChart.appendChild(option);
            }
        }else if(request.status===401){
            window.location.href="login.html";
        }
    };
    request.send();
    var selectedCategory = "";
    selectCategoryChart.onchange = function () {
        if (this.value != "not") {
            selectedCategory = this.value;
            timeline(selectedCategory);
            console.log(selectedCategory);

        }
    };

    document.getElementById("categoryTimelineDiv").appendChild(divCatSelectChart)
}

function timeline(selectedCategory){
    var mainTimelineDiv=document.getElementById("timeline");
    mainTimelineDiv.innerHTML="";
    var divPanelHeading=document.createElement("div");
    divPanelHeading.setAttribute("class","panel-heading");
    var iPanelHeading=document.createElement("i");
    iPanelHeading.setAttribute("class","fa fa-clock-o fa-fw");
    divPanelHeading.appendChild(iPanelHeading);
    divPanelHeading.innerHTML+="Timeline according category";
    mainTimelineDiv.appendChild(divPanelHeading);

    var divPanelBody=document.createElement("div");
    divPanelBody.setAttribute("class","panel-body");
    var ulTime=document.createElement("ul");
    ulTime.setAttribute("class","timeline");
    //Ajax to get expenses and incomes for category, if selectedCategory=="all" /for all category/ else for the selected
    //category.

    var request=new XMLHttpRequest();
    request.open("get","../index.php?target=transactions&action=getIncomesAndExpensesForCategory&categoryId="+selectedCategory);
    request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200){
            console.log(this.responseText);
            var response=JSON.parse(this.responseText);
            for(var i in response){
                if(response[i]["type_id"]==1){
                    var li=document.createElement("li");
                    var divBadge=document.createElement("div");
                    divBadge.setAttribute("class","timeline-badge success");
                    var iBadge=document.createElement("i");
                    iBadge.setAttribute("class","fa fa-credit-card");
                    divBadge.appendChild(iBadge);
                    li.appendChild(divBadge);
                    var divTimePanel=document.createElement("div");
                    divTimePanel.setAttribute("class","timeline-panel");
                    var divTimelineHeading=document.createElement("div");
                    divTimelineHeading.setAttribute("class","timeline-heading");
                    var h4=document.createElement("h4");
                    h4.setAttribute("class","timeline-title");
                    h4.innerHTML="Account: "+response[i]["accName"];
                    divTimelineHeading.appendChild(h4);
                    var divTimelineBody=document.createElement("div");
                    divTimelineBody.setAttribute("class","timeline-body");
                    var p=document.createElement("p");
                    p.innerHTML="Category: "+response[i]["cName"];
                    var pAmount=document.createElement("p");
                    pAmount.innerHTML="Amount: "+response[i]["amount"];
                    var pDate=document.createElement("p");
                    pDate.innerHTML="Date: "+response[i]["date"];
                    divTimelineBody.appendChild(p);
                    divTimelineBody.appendChild(pAmount);
                    divTimelineBody.appendChild(pDate);
                    divTimePanel.appendChild(divTimelineHeading);
                    divTimePanel.appendChild(divTimelineBody);
                    li.appendChild(divTimePanel);
                    ulTime.appendChild(li);

                }else{
                    var li1=document.createElement("li");
                    li1.setAttribute("class","timeline-inverted");
                    var divBadge1=document.createElement("div");
                    divBadge1.setAttribute("class","timeline-badge danger");
                    var iBadge1=document.createElement("i");
                    iBadge1.setAttribute("class","fa fa-credit-card");
                    divBadge1.appendChild(iBadge1);
                    li1.appendChild(divBadge1);
                    var divTimePanel1=document.createElement("div");
                    divTimePanel1.setAttribute("class","timeline-panel");
                    var divTimelineHeading1=document.createElement("div");
                    divTimelineHeading1.setAttribute("class","timeline-heading");
                    var h41=document.createElement("h4");
                    h41.setAttribute("class","timeline-title");
                    h41.innerHTML="Account: "+response[i]["accName"];
                    divTimelineHeading1.appendChild(h41);
                    var divTimelineBody1=document.createElement("div");
                    divTimelineBody1.setAttribute("class","timeline-body");
                    var p1=document.createElement("p");
                    p1.innerHTML="Category: "+response[i]["cName"];
                    var pAmount1=document.createElement("p");
                    pAmount1.innerHTML="Amount: "+response[i]["amount"];
                    var pDate1=document.createElement("p");
                    pDate1.innerHTML="Date: "+response[i]["date"];
                    divTimelineBody1.appendChild(p1);
                    divTimelineBody1.appendChild(pAmount1);
                    divTimelineBody1.appendChild(pDate1);
                    divTimePanel1.appendChild(divTimelineHeading1);
                    divTimePanel1.appendChild(divTimelineBody1);
                    li1.appendChild(divTimePanel1);
                    ulTime.appendChild(li1);

                }
                // ulTime.appendChild(li1);
            }
        }
    }
    request.send();

    // var li=document.createElement("li");
    // var divBadge=document.createElement("div");
    // divBadge.setAttribute("class","timeline-badge success");
    // var iBadge=document.createElement("i");
    // iBadge.setAttribute("class","fa fa-credit-card");
    // divBadge.appendChild(iBadge);
    // li.appendChild(divBadge);
    // var divTimePanel=document.createElement("div");
    // divTimePanel.setAttribute("class","timeline-panel");
    // var divTimelineHeading=document.createElement("div");
    // divTimelineHeading.setAttribute("class","timeline-heading");
    // var h4=document.createElement("h4");
    // h4.setAttribute("class","timeline-title");
    // h4.innerHTML="TEST";
    // divTimelineHeading.appendChild(h4);
    // var divTimelineBody=document.createElement("div");
    // divTimelineBody.setAttribute("class","timeline-body");
    // var p=document.createElement("p");
    // p.innerHTML="lorem ipsum";
    // divTimelineBody.appendChild(p);
    // divTimePanel.appendChild(divTimelineHeading);
    // divTimePanel.appendChild(divTimelineBody);
    // li.appendChild(divTimePanel);
    //
    // var li1=document.createElement("li");
    // li1.setAttribute("class","timeline-inverted");
    // var divBadge1=document.createElement("div");
    // divBadge1.setAttribute("class","timeline-badge danger");
    // var iBadge1=document.createElement("i");
    // iBadge1.setAttribute("class","fa fa-credit-card");
    // divBadge1.appendChild(iBadge1);
    // li1.appendChild(divBadge1);
    // var divTimePanel1=document.createElement("div");
    // divTimePanel1.setAttribute("class","timeline-panel");
    // var divTimelineHeading1=document.createElement("div");
    // divTimelineHeading1.setAttribute("class","timeline-heading");
    // var h41=document.createElement("h4");
    // h41.setAttribute("class","timeline-title");
    // h41.innerHTML="TEST";
    // divTimelineHeading1.appendChild(h41);
    // var divTimelineBody1=document.createElement("div");
    // divTimelineBody1.setAttribute("class","timeline-body");
    // var p1=document.createElement("p");
    // p1.innerHTML="lorem ipsum";
    // divTimelineBody1.appendChild(p1);
    // divTimePanel1.appendChild(divTimelineHeading1);
    // divTimePanel1.appendChild(divTimelineBody1);
    // li1.appendChild(divTimePanel1);

    // ulTime.appendChild(li);
    // ulTime.appendChild(li1);
    divPanelBody.appendChild(ulTime);
    mainTimelineDiv.appendChild(divPanelBody);

}