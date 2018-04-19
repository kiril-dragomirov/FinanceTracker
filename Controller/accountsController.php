<?php

namespace Controller;
use Model\DAO\AccountsDAO;
use \Model\Accounts;



class accountsController
{

    public function showAcc()
    {
        if (isset($_GET["get"])) {
            //echo "Hello";
//            $accounts = new AccountsDAO();
            echo json_encode($accounts = AccountsDAO::getAccountsInfo($_SESSION["user"]["id"]));

        }
    }

    public function giveTotal()
    {
        if (isset($_GET["give"])) {
            //   $accounts = new Accounts();
            echo json_encode($accounts = AccountsDAO::getTotal($_SESSION["user"]["id"]));
        }
    }

    public function ShowBiggestIncome()
    {
        if (isset($_GET["income"])) {
            // $accounts = new Accounts();
            echo json_encode($accounts = AccountsDAO::getMaxIncomeFromAllAccounts($_SESSION["user"]["id"]));
        }
    }

    public function showBiggestExpenseInAccount()
    {
        if (isset($_GET["expense"])) {
            // $accounts = new Accounts();
            echo json_encode($accounts = AccountsDAO::getMinIncomeFromAllAccounts($_SESSION["user"]["id"]));
        }
    }

//
    public function accName()
    {
        if (isset($_GET["accName"])) {
            // $accounts = new Accounts();
            echo json_encode($accounts = AccountsDAO::getAccNamesAndAccIds($_SESSION["user"]["id"]));
        }

    }

    public function insertAccount()
    {
        if (isset($_POST["name"])) {
            $name = htmlentities(trim($_POST["name"]));
            $amount = htmlentities(trim($_POST["amount"]));
            if (!empty($amount) && !empty($name)) {
                if ($amount > 0) {

                    //  $accounts = new Accounts();
                    $result = $accounts = AccountsDAO::checkIfAccountExistsAndInsert($name, $amount, $_SESSION["user"]["id"]);
                    if ($result) {
                        echo "correct";
                    } else {
                        echo "incorrect";
                    }
                }
            }
        }
    }

//
    public function transType()
    {
        if (isset($_GET["transType"])) {
            // $accounts = new Accounts();
            echo json_encode($accounts = AccountsDAO::getTransactionType());
        }

    }

    public function giveCategory()
    {
        if (isset($_GET["giveCategory"])) {
            // $accounts = new Accounts();
            echo json_encode($accounts = AccountsDAO::getCategoryList($_SESSION["user"]["id"]));
        }

    }

    public function getIconList()
    {
        if (isset($_GET["getIconList"])) {
        //    $accounts = new Accounts();
            echo json_encode($accounts=AccountsDAO::getIconList());
        }
    }
}