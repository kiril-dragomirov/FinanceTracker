<?php

namespace Controller;
use Model\DAO\TargetsDAO;
use \Model\Targets;


class targetsController{

    function targetTypes(){
        echo json_encode(TargetsDAO::typeTargets());
    }

    function insertTarget(){
        $name=htmlentities(trim($_POST["name"]));
        $amount=htmlentities(trim($_POST["amount"]));
        $user_id=$_SESSION["user"]["id"];

        function validateAmount($amount)
        {
            if (preg_match("/^[0-9]+(\.[0-9]{2})?$/", $amount)) {
                return true;
            }
            return false;
        }
        function validateNameAcc($name)
        {
            if (false===(strpbrk($name, "#$%^&*()+=-[]';,./{}|:<>?~"))) {
                return true;
            }
            return false;
        }
        if (!empty($amount) && !empty($name)) {
            if ($amount > 0) {
                if (validateNameAcc($name)) {
                    if (validateAmount($amount)) {
                        $result = $accounts =TargetsDAO::insertTarget($user_id,$amount,$name);
                        if ($result) {
                            echo "correct";
                        } else {
                            echo "incorrect";
                        }
                    }
                }
            }
        }
    }


}