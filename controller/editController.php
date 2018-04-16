<?php
session_start();

function __autoload($class)
{

    $class = "..\\model\\" . $class;
    require_once str_replace("\\", "/", $class) . ".php";
}


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
                        if (move_uploaded_file($_FILES["avatar"]["tmp_name"], "../view/assets/user-image/" . $_SESSION["user"]["name"]."jpg")) {
                            $_SESSION["user"]["image_url"] = "/assets/view/" . $_SESSION["user"]["name"].".jpg";
                        }

                    }
                }
                $user = new User();
                $user->editUser($_SESSION["user"]["name"], $_SESSION["user"]["family_name"], $_SESSION["user"]["password"],
                    $_SESSION["user"]["email"], $_SESSION["user"]["image_url"], $_SESSION["user"]["age"], $_SESSION["user"]["id"]);
            }


        }
    }
}

if (isset($_GET["get"])) {
    $user = new User();
    echo json_encode($user->getUserInfoForEit($_SESSION["user"]["id"]));
}