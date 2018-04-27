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
         // $user_id = $_SESSION["user"]["id"];
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

    public function selectCategories(){
       // $user_id = $_SESSION["user"]["id"];

        $statResult = BudgetDAO:: selectCategories(7);

        echo json_encode($statResult);


    }

    public function selectCategoryAmount(){
        //$user_id = $_SESSION["user"]["id"];
        $statResult = BudgetDAO::selectCategoryAmount(7);

        function random_color() {
            return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
        }

        $result = [];
        for ($i = 0; $i < count($statResult); $i++){

            $temp = [];
            foreach($statResult[$i] as $key => $value){
                $temp[$key] = $value;
            }
            $temp["color"] = "#".random_color().random_color().random_color();
            $result[] = $temp;

        }
        echo json_encode($result);

    }

    public function wrongBudgeting(){
         //$user_id = $_SESSION["user"]["id"];
        $minusBudget = BudgetDAO::wrongBudgeting(7);
        echo json_encode($minusBudget);

    }
    public function budgetingDiff(){

    }

}