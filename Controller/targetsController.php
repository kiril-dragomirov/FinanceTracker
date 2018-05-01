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

    public function getAllActiveTargets(){
        $user_id=$_SESSION["user"]["id"];
        echo json_encode(TargetsDAO::getAllActiveTargets($user_id));
    }

    public function pauseTarget(){
        $target_id=htmlentities(trim($_POST["id"]));
        echo json_encode(TargetsDAO::pauseTarget($target_id));
    }

    public function getAllWaitingTargets(){
        $user_id=$_SESSION["user"]["id"];
        echo json_encode(TargetsDAO::getAllWaitingTargets($user_id));
    }

    public function startTarget(){
        $target_id=htmlentities($_POST["id"]);
        echo json_encode(TargetsDAO::startTarget($target_id));
    }

    public function setTargetToFinished(){
        $target_id=htmlentities(trim($_POST["id"]));
        echo json_encode(TargetsDAO::setTargetToFinished($target_id));
    }

    public function getAllFinishedAndSaved(){
        $user_id=$_SESSION["user"]["id"];
        echo json_encode(TargetsDAO::getAllFinishedAndSaved($user_id));
    }
}