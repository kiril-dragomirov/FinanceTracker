<?php


if (isset($_POST["reg"])) {
    $name = trim(htmlentities($_POST["name"]));
    $family_name = trim(htmlentities($_POST["family"]));
    $password = trim(htmlentities(($_POST["password"])));
    $repeatPassword = trim(htmlentities(($_POST["repeatPassword"])));
    $email = trim(htmlentities($_POST["email"]));
    $age=trim(htmlentities($_POST["age"]));


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

    function validatePassword($password){
        $uppercase = preg_match('@[A-Z]@', $password);
        $lowercase = preg_match('@[a-z]@', $password);
        $number    = preg_match('@[0-9]@', $password);

        if(!$uppercase || !$lowercase || !$number || strlen($password) <0) {
            return false;
        }else{
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
                // echo "Ne"; PROVERKA
            } else {
                $file_data = true;
                // echo "da";  PROVERKA
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

                                    } else {
                                        echo "Age incorrect";
                                    }
                                } else {
                                    echo "age incorrect";
                                }

                            } else {
                                echo " email incorrect";
                            }
                        } else {
                            echo "family incorrect";
                        }
                    } else {
                        echo "name incorrect";
                    }
                } else {
                    echo "password incorrect";
                }
            } else {
                echo "repassword incorrect";
            }


        }else{
            echo "incorrect IMG!";
        }
    } else {
        echo "incorrect";
    }

}