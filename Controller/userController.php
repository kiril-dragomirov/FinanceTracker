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
            $loginCheck = UserDAO::checkUser($email, $password);
            if ($loginCheck["id"] !== null) {
                $_SESSION['user'] = $loginCheck;
            } else {
                echo "incorrect data";
            }

        }
    }

    public function edit()
    {

        if (isset($_POST["edit"])) {

            function validateName($name)
            {
                if (preg_match("/^[a-zA-Z'. -]+$/", $name)) {
                    return true;
                }
                return false;
            }


            function validateAge($age)
            {
                if (preg_match("/^[0-9]+$/", $age)) {
                    return true;
                }
                return false;
            }

            function validatePassword($password)
            {
                $uppercase = preg_match('@[A-Z]@', $password);
                $lowercase = preg_match('@[a-z]@', $password);
                $number = preg_match('@[0-9]@', $password);

                if ($uppercase && $lowercase && $number &&  strlen($password)>=8) {
                    return true;
                } else {
                    return false;
                }
            }


            function validateEmail($email)
            {
                if (preg_match("/^[_a-z0-9-+]+(\.[_a-z0-9-+]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/", $email)) {
                    return true;
                } else {
                    return false;
                }
            }

            $name = ucfirst(trim(htmlentities($_POST["name"])));
            $family_name = ucfirst(trim(htmlentities($_POST["family"])));
            $password = trim(htmlentities(($_POST["password"])));
            $repeatPassword = trim(htmlentities(($_POST["repeatPassword"])));
            $email = trim(htmlentities($_POST["email"]));
            $age = trim(htmlentities($_POST["age"]));
            $currentPassword = trim(htmlentities($_POST["currentPassword"]));

            if (!empty($currentPassword)) {
                if (validatePassword($currentPassword)) {
                    if (sha1($currentPassword) === $_SESSION["user"]["password"]) {
                        $edit=false;//Flag to check if there must be made changes in Base;



                        if (is_uploaded_file($_FILES["avatar"]["tmp_name"])) {

                            if ($_FILES["avatar"]["size"] > 2097152) {

                            } else {
                                unlink("./View/assets/user-image/" . $_SESSION["user"]["name"] . "jpg");

                                $info = getimagesize($_FILES['avatar']['tmp_name']);

                                if (($info[2] == IMAGETYPE_JPEG)) {


                                    if (move_uploaded_file($_FILES["avatar"]["tmp_name"], "./View/assets/user-image/" . $_SESSION["user"]["name"] . ".jpg")) {
                                        $_SESSION["user"]["image_url"] = "./assets/user-image/" . $_SESSION["user"]["name"] . ".jpg";
                                        $url="./assets/user-image/" . $_SESSION["user"]["name"] . ".jpg";
                                        $edit = true;
                                    }else{
                                        $url= $_SESSION["user"]["image_url"];
                                    }
                                }else{
                                    $url= $_SESSION["user"]["image_url"];
                                }

                            }
                        }else{
                            $url= $_SESSION["user"]["image_url"];
                        }

                        if (!empty($name)) {
                            if (validateName($name)) {
                                $_SESSION["user"]["name"] = $name;
                                $edit=true;
                            }
                        }

                        if (!empty($family_name)) {
                            if (validateName($family_name)) {
                                $_SESSION["user"]["family_name"] = $family_name;
                                $edit=true;
                            }
                        }

                        if (!empty($password)) {
                            if (!empty($repeatPassword)) {
                                if ($password === $repeatPassword) {
                                    if (validatePassword($password)) {
                                        $_SESSION["user"]["password"] = sha1($password);
                                        $edit=true;
                                    }
                                }
                            }
                        }


                        if (!empty($age)) {
                            if (validateAge($age)) {
                                if ($age > 18 && $age < 120) {
                                    $_SESSION["user"]["age"] = $age;
                                    $edit=true;
                                }
                            }
                        }

                        if (!empty($email)) {
                            if (validateEmail($email)) {
                                $_SESSION["user"]["email"] = $email;
                                $edit=true;
                            }
                        }



                        if($edit===true) {
                            try {
                                $user = new User();
                                $user->First($_SESSION["user"]["name"], $_SESSION["user"]["family_name"], $_SESSION["user"]["age"], $_SESSION["user"]["password"], $_SESSION["user"]["email"], $url,$_SESSION["user"]["id"]);
                                UserDAO::editUser($user);
                                header("location: View/edit.html");
                            }catch(\Exception $e){
                                header("HTTP/1.0 404 Not Found");
                                die();
                            }
                        }
                    }


                }
            }
        }
        header("location: View/index.html");
    }

    public function getUserData()
    {
//        if (isset($_GET["get"])) {
        //$user = new User();
        echo json_encode(UserDAO::getUserInfoForEit($_SESSION["user"]["id"]));
        //   }
    }


    public function register()
    {
        if (isset($_POST["reg"])) {
            $name = ucfirst(trim(htmlentities($_POST["name"])));
            $family_name = ucfirst(trim(htmlentities($_POST["family"])));
            $password = trim(htmlentities(($_POST["password"])));
            $repeatPassword = trim(htmlentities(($_POST["repeatPassword"])));
            $email = trim(htmlentities($_POST["email"]));
            $age = trim(htmlentities($_POST["age"]));


            function validateName($name)
            {
                if (preg_match("/^[a-zA-Z'. -]+$/", $name)) {
                    return true;
                }
                return false;
            }


            function validateAge($age)
            {
                if (preg_match("/^[0-9]+$/", $age)) {
                    return true;
                }
                return false;
            }

            function validatePassword($password)
            {
                $uppercase = preg_match('@[A-Z]@', $password);
                $lowercase = preg_match('@[a-z]@', $password);
                $number = preg_match('@[0-9]@', $password);

                if ($uppercase && $lowercase && $number &&  strlen($password)>=8) {
                    return true;
                } else {
                    return false;
                }
            }


            function validateEmail($email)
            {
                if (preg_match("/^[_a-z0-9-+]+(\.[_a-z0-9-+]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/", $email)) {
                    return true;
                }
                return false;
            }

            if (!empty($name) && !empty($family_name) && !empty($password) && !empty($repeatPassword) && !empty($email) && !empty($age)) {
//            $img=$_FILES["avatar"]["tmp_name"];
                if (isset($_FILES["avatar"]["tmp_name"])) {
                    if ($_FILES["avatar"]["size"] > 2097152) {

                            $file_data = false;
                        $url = "./assets/user-image/defaultwrong.png";
                    } else {
                        $img=$_FILES["avatar"]["tmp_name"];
                        $avatar = getimagesize($img);

                        if (($avatar[2] == IMAGETYPE_JPEG)) {

                            $file_data = true;
                        }else{
                            $file_data = false;
                            $url = "./assets/user-image/defaultwrong.png";
                        }

                    }
                }

//                if ($file_data) {
                    if ($password === $repeatPassword) {
                        if (validatePassword($password)) {
                            if (validateName($name)) {
                                if (validateName($family_name)) {
                                    if (validateEmail($email)) {
                                        if (validateAge($age)) {
                                            if ($age > 0 && $age < 120) {
                                                if (file_exists($_FILES["avatar"]["tmp_name"])) {
                                                    if (move_uploaded_file($img, "./View/assets/user-image/$name.jpg")) {
                                                        $url = "./assets/user-image/$name.jpg";
                                                    }

                                                } else {
                                                    $url = "./assets/user-image/defaultwrong.png";
                                                }
                                                $user = new User();
                                                $user->First($name, $family_name, $age, sha1($password), $email, $url);
                                                try {
                                                    if (UserDAO::registerUser($user)) {
                                                        header("location:view/login.html");
                                                    }
                                                }catch(\Exception $e) {
                                                    header("HTTP/1.0 404 Not Found");
                                                    die();
                                                }


                                            } else {
                                                echo "Age incorrect";
                                                header("location:./View/register.html");
                                            }
                                        } else {
                                            echo "age incorrect";
                                            header("location:./View/register.html");
                                        }

                                    } else {
                                        echo " email incorrect";
                                        header("location:./View/register.html");
                                    }
                                } else {
                                    echo "family incorrect";
                                    header("location:./View/register.html");
                                }
                            } else {
                                echo "name incorrect";
                                header("location:./View/register.html");
                            }
                        } else {
                            echo "password incorrect";
                            header("location:./View/register.html");
                        }
                    } else {
                        echo "repassword incorrect";
                        header("location:./View/register.html");
                    }


                } else {
                    echo "incorrect IMG!";
                    header("location:./View/register.html");
                }
            } else {
                echo "incorrect";
                header("location:./View/register.html");
            }

//        }
    }

    public function getUserId(){
        echo $_SESSION["user"]["id"];
    }

    public function check(){
        if(isset($_SESSION["user"])){
            echo "true";
        }else{
            echo "false";
        }
    }

    public function logout(){
        unset($_SESSION["user"]);
        echo "true";
    }


    public function takeInfoUser(){
        $user_id = $_SESSION["user"]["id"];
        try {
            $info = UserDAO::takeInfoUser($user_id);
            echo json_encode($info);
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }


    public function lastLogin(){
        $user_id = $_SESSION["user"]["id"];
        try{
            $lastLogin = UserDAO::lastLogin($user_id);

            echo json_encode($lastLogin);
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }
}