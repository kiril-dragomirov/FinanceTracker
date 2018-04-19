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
    public function insertTransaction(){
        $accountId=htmlentities(trim($_POST["accId"]));
        $amount=htmlentities(trim($_POST["amount"]));
        $categoryId=htmlentities(trim($_POST["categoryId"]));
        $typeId=htmlentities(trim($_POST["typeId"]));
        if(!empty($accountId) && !empty($amount) && !empty($categoryId) && !empty($typeId)){
            if($typeId==1 || $typeId==2){
                $transaction=new Transactions();
                $transaction->Transaction($amount,$categoryId,$accountId,$typeId);
                TransactionsDAO::insertTransaction($transaction);
                echo "correct!";
            }
        }

    }
    public function insertTransactionAndCategory(){
        $accountId=htmlentities(trim($_POST["accId"]));
        $amount=htmlentities(trim($_POST["amount"]));
        $categoryName=htmlentities(trim($_POST["categoryName"]));
        $typeId=htmlentities(trim($_POST["typeId"]));
        $iconId=htmlentities(trim($_POST["iconId"]));
        if(!empty($accountId) && !empty($amount) && !empty($categoryName) && !empty($typeId) && !empty($iconId)){
            if($typeId==1 || $typeId==2){
                if(TransactionsDAO::insertTransactionAndAddCategory($accountId,$amount,$categoryName,$typeId,$iconId,
                    $_SESSION["user"]["id"])){
                    echo "correct";
                }else{
                    echo "incorrect";
                }
            }
        }
    }

}