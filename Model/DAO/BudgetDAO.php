<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 4/20/2018
 * Time: 8:55 AM
 */

namespace Model\Dao;
use Model\Budget;

class BudgetDAO extends DAO
{

    public static function selectAccounts($user_id){
        $statement = self::$pdo->prepare("SELECT id, name FROM accounts WHERE user_id=?");
        $statement->execute([$user_id]);
        $arr = [];
        while($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            $arr[] = $row;
        }
        $statement = self::$pdo->prepare("SELECT id as id_cat, name as cat FROM categories WHERE user_id=? OR  user_id=0");
        $statement->execute([$user_id]);
        while($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            $arr[] = $row;
        }
        return $arr;
    }

    public static function makeBudget($account_id, $budget_amount, $category_id, $date_from, $date_to){
        $statement = self::$pdo->prepare("INSERT INTO budgets (account_id, amout, date_from, date_to, category_id) VALUES (?,?,now(),now(),?)");
        $statement->execute([$account_id,$budget_amount,$category_id]);
    }

}