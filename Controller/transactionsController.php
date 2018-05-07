<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 20.4.2018 г.
 * Time: 0:38
 */

namespace Controller;

use Model\DAO\TransactionsDAO;
use \Model\Transactions;


class transactionsController
{
    public function insertTransaction()
    {
        $accountId = htmlentities(trim($_POST["accId"]));
        $amount = htmlentities(trim($_POST["amount"]));
        $categoryId = htmlentities(trim($_POST["categoryId"]));
        $typeId = htmlentities(trim($_POST["typeId"]));
        function validateAmount($amount)
        {
            if (preg_match("/^[0-9]+(\.[0-9]{2})?$/", $amount)) {
                return true;
            }
            return false;
        }



        if (!empty($accountId) && !empty($amount) && !empty($categoryId) && !empty($typeId)) {
            if ($typeId == 1 || $typeId == 2) {
                if(validateAmount($amount)){
                    $transaction = new Transactions();
                $transaction->Transaction($amount, $categoryId, $accountId, $typeId);
                try {
                    TransactionsDAO::insertTransaction($transaction);
                    echo "correct!";
                }catch(\Exception $e) {
                    header("HTTP/1.0 404 Not Found");
                    die();
                }
            }
            }
        }

    }

    public function insertTransactionAndCategory()
    {
        $accountId = htmlentities(trim($_POST["accId"]));
        $amount = htmlentities(trim($_POST["amount"]));
        $categoryName = htmlentities(trim($_POST["categoryName"]));
        $typeId = htmlentities(trim($_POST["typeId"]));
        $iconId = htmlentities(trim($_POST["iconId"]));
        function validateNameAcc($name)
        {
            if (false===(strpbrk($name, "#$%^&*()+=-[]';,./{}|:<>?~"))) {
                return true;
            }
            return false;
        }
        function validateAmount($amount)
        {
            if (preg_match("/^[0-9]+(\.[0-9]{2})?$/", $amount)) {
                return true;
            }
            return false;
        }

        if (!empty($accountId) && !empty($amount) && !empty($categoryName) && !empty($typeId) && !empty($iconId)) {
            if ($typeId == 1 || $typeId == 2) {
                if (validateNameAcc($categoryName)) {
                    if (validateAmount($amount)) {
                        try {
                            $transaction=new Transactions();
                            $transaction->Transaction($amount,0,$accountId,$typeId,$_SESSION["user"]["id"]);
                            if (TransactionsDAO::insertTransactionAndAddCategory($transaction,$categoryName, $iconId)) {
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

    public function dateFrom()
    {
        $accId = htmlentities(trim($_GET["accId"]));
        echo json_encode(TransactionsDAO::getFirstDateForUser($_SESSION["user"]["id"], $accId));
    }

    public function getDateToList()
    {
        $date = htmlentities(trim($_GET["dateFrom"]));
        $accId = htmlentities(trim($_GET["accId"]));
        $userId = $_SESSION["user"]["id"];
        try {
            echo json_encode(TransactionsDAO::getDateToList($date, $accId, $userId));
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }

    }

    public function getTransactions()
    {
        $accId = htmlentities(trim($_POST["accId"]));
        $typeId = htmlentities(trim($_POST["type_id"]));
        $date_from = htmlentities(trim($_POST["date_from"]));
        $date_to = htmlentities(trim($_POST["date_to"]));

            try {
                echo json_encode(TransactionsDAO::getAllTransactions($accId, $typeId, $date_from, $date_to));
            }catch(\Exception $e) {
                header("HTTP/1.0 404 Not Found");
                die();
            }

    }


    //Removing Transaction
    public function removeTransaction()
    {
        $transId = htmlentities(trim($_POST["transId"]));
        try {
            TransactionsDAO::RemoveTrans($transId);
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function chartIncomeExpenses()
    {
        $accId = htmlentities(trim($_GET["ia"]));
        try {
            echo json_encode(TransactionsDAO::chartIncomeExpenses($accId));
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function chartCategory(){
        $user_id=$_SESSION["user"]["id"];
        $accId=htmlentities(trim($_GET["accId"]));
        $typeId=htmlentities(trim($_GET["typeId"]));
        try {
            echo json_encode(TransactionsDAO::chartCategory($user_id, $accId, $typeId));
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function getCategoryAcc(){
        $accId=htmlentities(trim($_GET["accId"]));
        $user_id=$_SESSION["user"]["id"];
        try {
            echo json_encode(TransactionsDAO::getCategoryAcc($accId, $user_id));
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function getIncomeExpensesAccordingCategoryAndAccount(){
        $accId=htmlentities(trim($_GET["accId"]));
        $categoryId=htmlentities(trim($_GET["categoryId"]));
        $user_id=$_SESSION["user"]["id"];
        try {
            echo json_encode(TransactionsDAO::getIncomeExpensesAccordingCategoryAndAccount($user_id, $accId, $categoryId));
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function transfer(){
        $accId=htmlentities($_GET["accId"]);
        $user_from=$_SESSION["user"]["id"];
        $amount=htmlentities(trim($_GET["amount"]));
        $user_to=htmlentities(trim($_GET["userId"]));
        //Regex for amount.
        function validateAmount($amount)
        {
            if (preg_match("/^[0-9]+(\.[0-9]{2})?$/", $amount)) {
                return true;
            }
            return false;
        }
        function validateId($id)
        {
            if (preg_match("/^[0-9]+(\.[0-9]{2})?$/", $id)) {
                return true;
            }
            return false;
        }
        if(validateAmount($amount)){
            if(validateId($user_to)){
                try {
                    $transfer=new Transactions();
                    $transfer->Transfer($user_to,$user_from,$amount,$accId);
                    echo TransactionsDAO::transfer($transfer);
                }catch(\Exception $e) {
                    header("HTTP/1.0 404 Not Found");
                    die();
                }
            }
        }


    }

    public function getTransfers(){
        $user_id=$_SESSION["user"]["id"];
        try {
            echo json_encode(TransactionsDAO::getTransfers($user_id));
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function getAllTransferIncomes(){
        $user_id=$_SESSION["user"]["id"];
        try {
            echo json_encode(TransactionsDAO::getAllTransferIncomes($user_id));
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function getIncomedTransfers(){
        $user_id=$_SESSION["user"]["id"];
        try {
            echo json_encode(TransactionsDAO::getIncomedTransfers($user_id));
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function changeTransferToAcc(){
        $user_id=$_SESSION["user"]["id"];
        $accId=htmlentities(trim($_POST["accId"]));
        $id=htmlentities(trim($_POST["id"]));
        try {
            echo TransactionsDAO::changeTransferToAcc($user_id, $accId, $id);
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function getCategoryUser(){
        $user_id=$_SESSION["user"]["id"];
        try {
            echo json_encode(TransactionsDAO::getCategoryUser($user_id));
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }

    public function getIncomesAndExpensesForCategory(){
        $categoryId=htmlentities(trim($_GET["categoryId"]));
        $user_id=$_SESSION["user"]["id"];
        try {
            echo json_encode(TransactionsDAO::getIncomesAndExpensesForCategory($user_id, $categoryId));
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }
}