<?php
session_start();

if(isset($_POST["email"]) && isset($_POST["password"])){
    $email = trim(htmlentities($_POST["email"]));
    $password = trim(htmlentities(sha1($_POST["password"])));
    $loginCheck = checkUser($email, $password);
    if($loginCheck == null){
        $_SESSION['user'] = $loginCheck;
    }else{
        echo "incorrect data";
    }

}