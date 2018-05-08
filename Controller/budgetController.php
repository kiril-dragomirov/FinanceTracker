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
    public function selectAllBudgets(){
        $user_id = $_SESSION["user"]["id"];
        try {
            $selectBudgets = BudgetDAO::selectAllBudgets($user_id);
            echo json_encode($selectBudgets);
        }catch (\Exception $e) {
            header("HTTP/1.0 404 Not Found");
            die();
        }

    }

    public function deleteBudget(){
        $budget_id = trim(htmlentities($_POST["budgetId"]));
        try {
            $delBudget = BudgetDAO::deleteBudget($budget_id);
        }catch (\Exception $e) {
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


            if(!empty($date_from) && !empty($date_to)) {
                if ($budget_amount > 0) {
                    $from = explode("-", $date_from);
                    $fromImp = implode("", $from);
                    $to = explode("-", $date_to);
                    $toImp = implode("", $to);
                    if($fromImp < $toImp){
                           $check = new Budget();
                           $check->budgetConst($account_id, $budget_amount, $category_id, $date_from, $date_to);
                               try {
                                   $checkBudget = BudgetDAO::checkBudget($check);
                               }catch (\Exception $e) {
                                   header("HTTP/1.0 404 Not Found");
                                   die();
                               }
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
                               echo "Already exist!!!";
                           }
                    }else{
                        echo "Incorrect (from-to) data!";
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

//    public function selectCategoryAmount(){
//        try {
//            $user_id = $_SESSION["user"]["id"];
//            $statResult = BudgetDAO::selectCategoryAmount($user_id);
//
//            function random_color()
//            {
//                return str_pad(dechex(mt_rand(0, 255)), 2, '0', STR_PAD_LEFT);
//            }
//
//            $result = [];
//            for ($i = 0; $i < count($statResult); $i++) {
//
//                $temp = [];
//                foreach ($statResult[$i] as $key => $value) {
//                    $temp[$key] = $value;
//                }
//                $temp["color"] = "#" . random_color() . random_color() . random_color();
//                $result[] = $temp;
//
//            }
//            echo json_encode($result);
//        }catch(\Exception $e) {
//            header("HTTP/1.0 404 Not Found");
//            die();
//        }
//
//    }

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

    public function makeBCharts(){
        $acc_id = trim(htmlentities($_POST["accId"]));
        try {

            $statResult = BudgetDAO::selectCategoryAmount($acc_id);

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


}