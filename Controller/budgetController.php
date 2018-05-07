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
       try{
            $user_id = $_SESSION["user"]["id"];
            $selectAccounts = BudgetDAO::selectAccounts($user_id);
            echo json_encode($selectAccounts);
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }

    }

    public function makeBudget(){

            $account_id = trim(htmlentities($_POST["account_id"]));
            $budget_amount = trim(htmlentities($_POST["budget_amount"]));
            $category_id = trim(htmlentities($_POST["category_id"]));
            $date_from = trim(htmlentities($_POST["date_from"]));
            $date_to = trim(htmlentities($_POST["date_to"]));

            $error = "Pls, insert appropriate (from-to) !";

            if(!empty($date_from) && !empty($date_to)) {
                if ($budget_amount > 0) {
                    if(intval(substr($date_from, 0, 4)) <= intval(substr($date_to, 0, 4)) ) {
                       if(intval(substr($date_from, 5, 2)) < intval(substr($date_to, 5, 2)) ) {
                           $check = new Budget();
                           $check->budgetConst($account_id, $budget_amount, $category_id, $date_from, $date_to);
                           $checkBudget = BudgetDAO::checkBudget($check);
                           if($checkBudget == 0) {
                               echo "Success!!";
                               $budget = new Budget();
                               $budget->budgetConst($account_id, $budget_amount, $category_id, $date_from, $date_to);
                               try {
                                   BudgetDAO::makeBudget($budget);
                               } catch (\Exception $e) {
                                   header("HTTP/1.0 404 Not Found");
                                   die();
                               }
                           }else{
                               echo $checkBudget;
                           }
                       }elseif(intval(substr($date_from, 5, 2)) == intval(substr($date_to, 5, 2)) ) {
                           if(intval(substr($date_from, 8, 2)) <= intval(substr($date_to, 8, 2)) ){
                               $check = new Budget();
                               $check->budgetConst($account_id, $budget_amount, $category_id, $date_from, $date_to);
                               $checkBudget = BudgetDAO::checkBudget($check);
                               if($checkBudget == 0) {
                                   echo "Success!!";
                                   $budget = new Budget();
                                   $budget->budgetConst($account_id, $budget_amount, $category_id, $date_from, $date_to);
                                   try {
                                       BudgetDAO::makeBudget($budget);
                                   } catch (\Exception $e) {
                                       header("HTTP/1.0 404 Not Found");
                                       die();
                                   }
                               }else{
                                   echo $checkBudget;
                               }
                           }else{
                               echo $error;
                           }
                       }else{
                           echo $error;
                       }
                    }else{
                        echo $error;
                    }
                } else {
                    echo "not enough amount!";
                }
            }else{
                echo "Incorrect data!!!";
            }


    }

    public function selectCategories(){
        try{
            $user_id = $_SESSION["user"]["id"];
            $statResult = BudgetDAO:: selectCategories($user_id);
            echo json_encode($statResult);
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }


    }

    public function selectCategoryAmount(){
        try {
            $user_id = $_SESSION["user"]["id"];
            $statResult = BudgetDAO::selectCategoryAmount($user_id);

            function random_color()
            {
                return str_pad(dechex(mt_rand(0, 255)), 2, '0', STR_PAD_LEFT);
            }

            $result = [];
            for ($i = 0; $i < count($statResult); $i++) {

                $temp = [];
                foreach ($statResult[$i] as $key => $value) {
                    $temp[$key] = $value;
                }
                $temp["color"] = "#" . random_color() . random_color() . random_color();
                $result[] = $temp;

            }
            echo json_encode($result);
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }

    }

    public function wrongBudgeting(){
        try{
            $user_id = $_SESSION["user"]["id"];
            $minusBudget = BudgetDAO::wrongBudgeting($user_id);
            echo json_encode($minusBudget);
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }

    }
    public function differentBudgetLoading(){
         $user_id = $_SESSION["user"]["id"];
        $budgetStatsResult = BudgetDAO::differentBudgetLoading($user_id);
        $result = [];
        for ($i = 0; $i < count($budgetStatsResult); $i+=2){

            $temp = [];
            foreach($budgetStatsResult[$i] as $key => $value){
                if($budgetStatsResult[$i]["budgetAmount"] >= $budgetStatsResult[$i]["transactAmount"]){
                    $percent = ($budgetStatsResult[$i]["transactAmount"]/$budgetStatsResult[$i]["budgetAmount"])*100;
                        $number = number_format($percent, 2, '.', '');
                        $temp["percent"] = $number;

                }elseif($budgetStatsResult[$i]["budgetAmount"] < $budgetStatsResult[$i]["transactAmount"]){
                    $temp["percent"]=$budgetStatsResult[$i]["budgetAmount"] - $budgetStatsResult[$i]["transactAmount"];
                }
                if($key == "fromTo"){
                    $temp[$key] = $value;
                }
            }
            $result[] = $temp;
        }

        echo json_encode($result);

    }

    public function checkExistAcc(){
        try{
            $user_id = $_SESSION["user"]["id"];
            $checkAcc = BudgetDAO::checkExistAcc($user_id);
            if($checkAcc == 0){
                echo "no info about existing accounts";
            }
        }catch(\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }
    }


}