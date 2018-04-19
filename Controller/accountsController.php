<?php
session_start();

function __autoload($class)
{

    $class = "..\\Model\\" . $class;
    require_once str_replace("\\", "/", $class) . ".php";
}



if(isset($_GET["get"])){
    //echo "Hello";
    $accounts=new Accounts();
    echo json_encode($accounts->getAccountsInfo($_SESSION["user"]["id"]));

}

if(isset($_GET["give"])){
    $accounts=new Accounts();
    echo json_encode($accounts->getTotal($_SESSION["user"]["id"]));
}

if(isset($_GET["income"])){
    $accounts= new Accounts();
    echo json_encode($accounts->getMaxIncomeFromAllAccounts($_SESSION["user"]["id"]));
}

if(isset($_GET["expense"])){
    $accounts= new Accounts();
    echo json_encode($accounts->getMinIncomeFromAllAccounts($_SESSION["user"]["id"]));
}

if(isset($_GET["accName"])){
    $accounts=new Accounts();
    echo json_encode($accounts->getAccNamesAndAccIds($_SESSION["user"]["id"]));
}

if(isset($_POST["name"])){
    $name=htmlentities(trim($_POST["name"]));
    $amount=htmlentities(trim($_POST["amount"]));
    if(!empty($amount) && !empty($name)){
        if($amount>0){

            $accounts=new Accounts();
            $result=$accounts->checkIfAccountExistsAndInsert($name,$amount,$_SESSION["user"]["id"]);
            if($result){
                echo "correct";
            }else{
                echo "incorrect";
            }
        }
    }
}

if(isset($_GET["transType"])){
    $accounts=new Accounts();
    echo json_encode($accounts->getTransactionType());
}

if(isset($_GET["giveCategory"])){
    $accounts=new Accounts();
    echo json_encode($accounts->getCategoryList($_SESSION["user"]["id"]));
}

if(isset($_GET["getIconList"])){
    $accounts=new Accounts();
    echo json_encode($accounts->getIconList());
}