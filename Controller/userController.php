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

                if (!$uppercase || !$lowercase || !$number || strlen($password) < 0) {
                    return false;
                } else {
                    return true;
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


                        if (!empty($name)) {
                            if (validateName($name)) {
                                $_SESSION["user"]["name"] = $name;
                            }
                        }

                        if (!empty($family_name)) {
                            if (validateName($family_name)) {
                                $_SESSION["user"]["family_name"] = $family_name;
                            }
                        }

                        if (!empty($password)) {
                            if (!empty($repeatPassword)) {
                                if ($password === $repeatPassword) {
                                    if (validatePassword($password)) {
                                        $_SESSION["user"]["password"] = sha1($password);
                                    }
                                }
                            }
                        }


                        if (!empty($age)) {
                            if (validateAge($age)) {
                                if ($age > 18 && $age < 120) {
                                    $_SESSION["user"]["age"] = $age;
                                }
                            }
                        }

                        if (!empty($email)) {
                            if (validateEmail($email)) {
                                $_SESSION["user"]["email"] = $email;
                            }
                        }

                        if (is_uploaded_file($_FILES["avatar"]["tmp_name"])) {

                            if ($_FILES["avatar"]["size"] > 2097152) {

                            } else {
                                //  unlink(/* ADR na img koito shte mahnem! */);
                                if (move_uploaded_file($_FILES["avatar"]["tmp_name"], "../View/assets/user-image/" . $_SESSION["user"]["name"] . "jpg")) {
                                    $_SESSION["user"]["image_url"] = "/assets/View/" . $_SESSION["user"]["name"] . ".jpg";
                                }

                            }
                        }
//                        $user = new User();
                        UserDAO::editUser($_SESSION["user"]["name"], $_SESSION["user"]["family_name"], $_SESSION["user"]["password"],
                            $_SESSION["user"]["email"], $_SESSION["user"]["image_url"], $_SESSION["user"]["age"], $_SESSION["user"]["id"]);
                    }


                }
            }
        }
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

                if (!$uppercase || !$lowercase || !$number || strlen($password) < 0) {
                    return false;
                } else {
                    return true;
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
//        $file_data=true;
                if (isset($_FILES["avatar"]["tmp_name"])) { //ZASHTO ISSET, A NE IS_UPLOADED FILE?
                    if ($_FILES["avatar"]["size"] > 2097152) {
                        $file_data = false;
                        $url = "/View/user-image/default.png";
                    } else {
                        $file_data = true;

                    }
                }

                if ($file_data) {
                    if ($password === $repeatPassword) {
                        if (validatePassword($password)) {
                            if (validateName($name)) {
                                if (validateName($family_name)) {
                                    if (validateEmail($email)) {
                                        if (validateAge($age)) {
                                            if ($age > 0 && $age < 120) {
                                                if (file_exists($_FILES["avatar"]["tmp_name"])) {
                                                    if (move_uploaded_file($_FILES["avatar"]["tmp_name"], "../View/assets/user-image/$name.png")) {
                                                        $url = "/View/user-image/$name.png";
                                                    }

                                                } else {
                                                    $url = "/View/user-image/default.png";
                                                }
                                                $user = new User();
                                                $user->First($name, $family_name, $age, sha1($password), $email, $url);
                                                if (UserDAO::registerUser($user)) {
                                                    header("location:../View/login.html");
                                                }


                                            } else {
                                                echo "Age incorrect";
                                                header("location:../View/register.html");
                                            }
                                        } else {
                                            echo "age incorrect";
                                            header("location:../View/register.html");
                                        }

                                    } else {
                                        echo " email incorrect";
                                        header("location:../View/register.html");
                                    }
                                } else {
                                    echo "family incorrect";
                                    header("location:../View/register.html");
                                }
                            } else {
                                echo "name incorrect";
                                header("location:../View/register.html");
                            }
                        } else {
                            echo "password incorrect";
                            header("location:../View/register.html");
                        }
                    } else {
                        echo "repassword incorrect";
                        header("location:../View/register.html");
                    }


                } else {
                    echo "incorrect IMG!";
                    header("location:../View/register.html");
                }
            } else {
                echo "incorrect";
                header("location:../View/register.html");
            }

        }
    }

    public function getUserId(){
        echo $_SESSION["user"]["id"];
    }
}