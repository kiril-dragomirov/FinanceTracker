<?php
//session_start();
//require_once ("view/layouts/header.php");
//
//if(isset($_GET["page"])){
//    $page=htmlentities($_GET["page"]);
//}else{
//    $page="main";
//}
//
//if(isset($_SESSION["user"])){
//    if($page==="logout"){
//        session_destroy();
//        header("location:index.php?page=login");
//    }elseif($page!=="login" && $page!=="register"){
//        require_once ("view/$page.html");
//    }else{
//        require_once ("view/main.html");
//    }
//}else{
//    if($page==="login"){
//        require_once ("view/login.html");
//    }elseif($page==="register"){
//        require_once ("view/register.html");
//    }else{
//        require_once ("view/login.html");
//    }
//}
//
//
//
//require_once ("view/layouts/footer.php");


spl_autoload_register(function ($class) {
    $class = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php' ;
    require_once __DIR__ . DIRECTORY_SEPARATOR . $class;
});


session_start();
\Model\DAO\DAO::init();

$fileNotFound = false;
//request?target=user&action=register
//would lead to invoking register method in /Controller/UserController
$controllerName = isset($_GET['target']) ? $_GET['target'] : 'base';
$methodName = isset($_GET['action']) ? $_GET['action'] : 'index';

$controllerClassName = '\\Controller\\' . $controllerName . 'Controller';

if (class_exists($controllerClassName))
{
    $contoller = new $controllerClassName();
    if (method_exists($contoller, $methodName)) {
//        if request is not for login or register, check for login
        if(!($controllerName == "user" && $methodName == "login")){
            if(!isset($_SESSION["user"])){
                header("HTTP/1.1 401 Unauthorized");
                die();
            }
        }
        try{
            $contoller->$methodName();
        }
        catch(\PDOException $e){
//            header("HTTP/1.1 500");
echo $e->getMessage();
            die();
        }
    } else {
        $fileNotFound = true;
    }
} else {
    $fileNotFound = true;
}


if ($fileNotFound) {
    //return header 404
    echo 'target or action invalid: target = ' . $controllerName . ' and action = ' .$methodName;
}