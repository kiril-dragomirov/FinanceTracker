<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 4/20/2018
 * Time: 8:53 AM
 */
namespace Controller;
use Model\DAO\BudgetDAO;
use \Model\Budget;

class budgetController
{

    public function selectAccount(){
       // if(isset($_SESSION["user"])) {
          //$user_id = $_SESSION["user"]["id"];
            $selectAccounts = BudgetDAO::selectAccounts(7);
            echo json_encode($selectAccounts);
        //}
    }

    public function makeBudget(){

            $account_id = htmlentities($_POST["account_id"]);
            $budget_amount = htmlentities($_POST["budget_amount"]);
            $category_id = htmlentities($_POST["category_id"]);
            $date_from = htmlentities($_POST["date_from"]);
            $date_to = htmlentities($_POST["date_to"]);


            echo BudgetDAO::makeBudget($account_id, $budget_amount, $category_id, $date_from, $date_to);

    }

    public function makeStatistic(){
        //$user_id = $_SESSION["user"]["id"];
        $statResult = BudgetDAO::makeStatistic(11);

        echo json_encode($statResult);


    }

}