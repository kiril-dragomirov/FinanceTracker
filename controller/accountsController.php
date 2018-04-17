<?php
session_start();

function __autoload($class)
{

    $class = "..\\model\\" . $class;
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