<?php
session_start();
function __autoload($class) {

    $class = "..\\model\\" . $class;
    require_once str_replace("\\", "/", $class) .".php";
}



if(isset($_POST["email"]) && isset($_POST["password"])){
    $email = trim(htmlentities($_POST["email"]));
    $password = trim(htmlentities(sha1($_POST["password"])));
    $user = new User();
    $loginCheck = $user->checkUser($email, $password);
    if($loginCheck["id"] !== null){
        $_SESSION['user'] = $loginCheck;
    }else{
        echo "incorrect data";
    }

}