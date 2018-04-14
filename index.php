<?php
session_start();
require_once ("view/layouts/header.php");

if(isset($_GET["page"])){
    $page=htmlentities($_GET["page"]);
}else{
    $page="main";
}

if(isset($_SESSION["user"])){
    if($page==="logout"){
        session_destroy();
        header("location:index.php?page=login");
    }elseif($page!=="login" && $page!=="register"){
        require_once ("view/$page.html");
    }else{
        require_once ("view/main.html");
    }
}else{
    if($page==="login"){
        require_once ("view/login.html");
    }elseif($page==="register"){
        require_once ("view/register.html");
    }else{
        require_once ("view/login.html");
    }
}



require_once ("view/layouts/footer.php");