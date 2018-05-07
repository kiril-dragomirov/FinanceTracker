<?php

namespace Controller;
use Model\DAO\AccountsDAO;
use \Model\Accounts;



class accountsController
{

    public function showAcc()
    {

            try {
                echo json_encode($accounts = AccountsDAO::getAccountsInfo($_SESSION["user"]["id"]));
            }catch(\Exception $e) {
                header("HTTP/1.0 404 Not Found");
                die();
            }

    }

    public function giveTotal()
    {

            try {
                echo json_encode($accounts = AccountsDAO::getTotal($_SESSION["user"]["id"]));
            }catch(\Exception $e){
                header("HTTP/1.0 404 Not Found");
                die();
           }

    }

    public function ShowBiggestIncome()
    {

            try {
                echo json_encode($accounts = AccountsDAO::getMaxIncomeFromAllAccounts($_SESSION["user"]["id"]));
            }catch(\Exception $e) {
                header("HTTP/1.0 404 Not Found");
                die();
            }

    }

    public function showBiggestExpenseInAccount()
    {

            try {
                echo json_encode($accounts = AccountsDAO::getMinIncomeFromAllAccounts($_SESSION["user"]["id"]));
            }catch(\Exception $e) {
                header("HTTP/1.0 404 Not Found");
                die();
            }

    }

//
    public function accName()
    {

            try {
                echo json_encode($accounts = AccountsDAO::getAccNamesAndAccIds($_SESSION["user"]["id"]));
            }catch(\Exception $e) {
                header("HTTP/1.0 404 Not Found");
                die();
            }


    }

    public function insertAccount()
    {

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
        if (isset($_POST["name"])) {
            $name = htmlentities(trim($_POST["name"]));
            $amount = htmlentities(trim($_POST["amount"]));
            if (!empty($amount) && !empty($name)) {
                if ($amount > 0) {
                    if (validateNameAcc($name)) {
                        if (validateAmount($amount)) {
                            //  $accounts = new Accounts();
                            try {
                                $result = $accounts = AccountsDAO::checkIfAccountExistsAndInsert($name, $amount, $_SESSION["user"]["id"]);
                                if ($result) {
                                    echo "correct";
                                } else {
                                    echo "incorrect";
                                }
                            }catch(\Exception $e) {
                                header("HTTP/1.0 404 Not Found");
                                die();
                            }
                        }
                    }
                }
            }
        }
    }

//
    public function transType()
    {

            try {
                echo json_encode($accounts = AccountsDAO::getTransactionType());
            }catch(\Exception $e) {
                header("HTTP/1.0 404 Not Found");
                die();
            }


    }

    public function giveCategory()
    {

            try {
                echo json_encode($accounts = AccountsDAO::getCategoryList($_SESSION["user"]["id"]));
            }catch(\Exception $e) {
                header("HTTP/1.0 404 Not Found");
                die();
            }


    }

    public function getIconList()
    {

        try {
            echo json_encode($accounts = AccountsDAO::getIconList());
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }

    }

    public function removeAcc(){
        $accId=htmlentities(trim($_POST["accId"]));
        try {
            AccountsDAO::removeAcc($accId);
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function chartAccountsAmounts(){
        $user_id=$_SESSION["user"]["id"];
        try {
            echo json_encode(AccountsDAO::chartAccountsAmounts($user_id));
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function makeAccountTimeline(){
        $acc_id=trim(htmlentities($_POST["accId"]));
        try {
            $info = AccountsDAO::makeTimeline($acc_id);
            echo json_encode($info);
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function takePDF(){


            }

}


