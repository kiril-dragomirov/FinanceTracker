var xhr = new XMLHttpRequest();
xhr.open("get", "../index.php?target=user&action=takeInfoUser");
xhr.onreadystatechange = function (ev) {
    if(xhr.status === 200 && xhr.readyState === 4){
        var response = JSON.parse(this.responseText);
        var str = "";
        str += "<div class=\"user-section\">";
        str +=    "      <div class=\"user-section-inner\">";
        str +=    "            <img src=\"";
        str +=    response.image_url;
        str +=    "\" alt=\"\">";
        str +=    "      </div>";
        str +=    "      <div class=\"user-info\">";
        str +=    "            <div>";
        str +=    response.name;
        str +=    "</div>";
        str +=    "              <div class=\"user-text-online\">";
        str +=    "                <span class=\"user-circle-online btn btn-success btn-circle \"></span>&nbsp;Online";
        str +=    "               </div>";
        str +=    "            </div>";
        str +=    "      </div>";
        document.getElementById("userProf").innerHTML = str;
    }
}
xhr.send();