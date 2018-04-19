<?php

namespace Controller;
use Model\DAO\UserDAO;
use \Model\User;

class userController
{
    public function login()
    {

        if (isset($_POST["email"]) && isset($_POST["password"])) {
            $email = trim(htmlentities($_POST["email"]));
            $password = trim(htmlentities(sha1($_POST["password"])));
           // UserDAO::checkUser($email,$password);
            $loginCheck = UserDAO::checkUser($email,$password);
            if ($loginCheck["id"] !== null) {
                $_SESSION['user'] = $loginCheck;
            } else {
                echo "incorrect data";
            }

        }
    }
}