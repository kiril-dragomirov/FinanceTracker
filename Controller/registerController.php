<?php
namespace Controller;
use Model\DAO\UserDAO;
use \Model\User;

class registerController
{
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
                        $url = "/view/user-image/default.png";
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
                                                    if (move_uploaded_file($_FILES["avatar"]["tmp_name"], "../view/assets/user-image/$name.png")) {
                                                        $url = "/view/user-image/$name.png";
                                                    }

                                                } else {
                                                    $url = "/view/user-image/default.png";
                                                }
                                                $user = new User();
                                                $user->First($name, $family_name, $age, sha1($password), $email, $url);
                                                if (UserDAO::registerUser($user)) {
                                                    header("location:../view/login.html");
                                                }


                                            } else {
                                                echo "Age incorrect";
                                                header("location:../view/register.html");
                                            }
                                        } else {
                                            echo "age incorrect";
                                            header("location:../view/register.html");
                                        }

                                    } else {
                                        echo " email incorrect";
                                        header("location:../view/register.html");
                                    }
                                } else {
                                    echo "family incorrect";
                                    header("location:../view/register.html");
                                }
                            } else {
                                echo "name incorrect";
                                header("location:../view/register.html");
                            }
                        } else {
                            echo "password incorrect";
                            header("location:../view/register.html");
                        }
                    } else {
                        echo "repassword incorrect";
                        header("location:../view/register.html");
                    }


                } else {
                    echo "incorrect IMG!";
                    header("location:../view/register.html");
                }
            } else {
                echo "incorrect";
                header("location:../view/register.html");
            }

        }
    }
}