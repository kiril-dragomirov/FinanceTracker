<?php
session_start();

var_dump($_SESSION["user"]);

?>

<script>
    var request = new XMLHttpRequest();
    request.open("get","../controller/accountsController.php?get=accNumber");
    request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200){
            console.log();
        }
    }
    request.send();
</script>
