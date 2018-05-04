var x = new XMLHttpRequest();
x.open("get","../index.php?target=crypto&action=makeCryptoChart");
x.onreadystatechange = function (ev) {
    if(x.readyState === 4 && x.status === 200){
        var response = JSON.parse(this.responseText);
        console.log(response);
        console.log("opa");

        var chart = AmCharts.makeChart("chartCrypto", {
            "theme": "light",
            "type": "serial",
            "startDuration": 2,
            "dataProvider": response,
            "valueAxes": [{
                "position": "left",
                "title": "Best USD Price"
            }],
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillColorsField": "color",
                "fillAlphas": 1,
                "lineAlpha": 0.1,
                "type": "column",
                "valueField": "USD"
            }],
            "depth3D": 20,
            "angle": 30,
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "name",
            "categoryAxis": {
                "gridPosition": "start",
                "labelRotation": 90
            },
            "export": {
                "enabled": false
            }

        });
    }else if(x.status===401){
        window.location.href="login.html";
    }
}
x.send();