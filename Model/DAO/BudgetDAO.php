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

    public static function makeBudget(Budget $budget){
        $statement = self::$pdo->prepare("INSERT INTO budgets (account_id, amount, date_from, date_to, category_id) 
                                                    VALUES (?,?,?,?,?)");
        $statement->execute([$budget->getAccountId(),
            $budget->getBudjetAmount(),
            $budget->getDateFrom(),
            $budget->getDateTo(),
            $budget->getCategoryId()]);
    }

    public static function selectAccounts($user_id){
        $otherCat = 12;
        $statement = self::$pdo->prepare("SELECT id, name FROM accounts WHERE user_id=?");
        $statement->execute([$user_id]);
        $arr = [];
        while($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            $arr[] = $row;
        }
        $statement = self::$pdo->prepare("SELECT id as id_cat, name as cat 
                                                    FROM categories 
                                                    WHERE (user_id=? OR  user_id=0)
                                                    AND id != ? ");
        $statement->execute([$user_id, $otherCat]);
        while($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            $arr[] = $row;
        }
        return $arr;
    }


    public static function selectCategories($user_id){
        $statement = self::$pdo->prepare("SELECT c.name as category, COUNT(*) as counter
                                                    FROM budgets as b 
                                                    JOIN categories as c 
                                                    ON b.category_id = c.id 
                                                    JOIN accounts as a
                                                    ON a.id = b.account_id
                                                    WHERE a.user_id = ?
                                                    GROUP BY b.category_id");
        $statement->execute([$user_id]);
        $result = [];
        while($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            $result[] = $row;
        }

        return $result;
    }

    public static function selectAllBudgets($user_id){
        $statement = self::$pdo->prepare("SELECT b.id, a.name as accName, b.amount , 
                                                    CONCAT(date_from,\" - \",date_to) as date, 
                                                    c.name as category 
                                                    FROM budgets as b
                                                    JOIN accounts as a
                                                    ON a.id = b.account_id
                                                    JOIN categories as c
                                                    ON c.id = b.category_id
                                                    JOIN users as u
                                                    ON u.id = a.user_id
                                                    WHERE u.id = ?");
        $statement->execute([$user_id]);
        $result = [];
        while($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            $result[] = $row;
        }

        return $result;
    }

    public static function deleteBudget($budget_id){
        $statement = self::$pdo->prepare("DELETE FROM budgets WHERE id = ?");
        $statement->execute([$budget_id]);
    }

    public static function selectCategoryAmount($acc_id){
        $statement = self::$pdo->prepare("SELECT c.name as category, b.amount as amount
                                                    FROM budgets as b 
                                                    JOIN categories as c 
                                                    ON b.category_id = c.id 
                                                    JOIN accounts as a
                                                    ON a.id = b.account_id
                                                    WHERE a.id = ?
                                                    GROUP BY b.category_id");
        $statement->execute([$acc_id]);
        $result = [];
        while($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            $result[] = $row;
        }

        return $result;
    }


    public static function checkExistAcc($user_id){
        $statement = self::$pdo->prepare("SELECT COUNT(*) as count FROM accounts WHERE user_id=?");
        $statement->execute([$user_id]);
        $row = $statement->fetch(\PDO::FETCH_ASSOC);

        return $row["count"];
    }

    public static function differentBudgetLoading($user_id){
        $statement = self::$pdo->prepare("SELECT a.id as accId FROM accounts  as a 
                                                    JOIN users as u 
                                                    ON a.user_id = u.id 
                                                    WHERE user_id=?");
        $statement->execute([$user_id]);
        $result = [];
        while($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            $result[] = $row;
        }
        $accAndCat = [];
        for($i = 0; $i < count($result) ; $i++) {
            foreach ($result[$i] as $acc => $id) {
                $state = self::$pdo->prepare("SELECT account_id as account, category_id as category
                                                FROM budgets
                                                WHERE account_id = ?");
                $state->execute([$id]);
                while($row = $state->fetch(\PDO::FETCH_ASSOC)){
                    $accAndCat[] = $row;
                }
            }
        }
        $final = [];
        $expenses = 2;
        for($i = 0; $i < count($accAndCat) ; $i++) {
            foreach ($accAndCat[$i] as $acc => $id) {
                $state = self::$pdo->prepare("SELECT  SUM(t.amount) as transactAmount , b.amount as budgetAmount, 
                                                        CONCAT(c.name ,\" / \",  a.name, \" / \" , b.date_from,\" - \", b.date_to, \" /  budget amount: \", b.amount, \" / expenses: \", SUM(t.amount)) as fromTo FROM budgets as b
                                                        JOIN transactions as t
                                                        ON t.account_id = b.account_id AND t.category_id = b.category_id
                                                        JOIN categories as c
                                                        ON b.category_id=c.id
                                                        JOIN accounts as a
                                                        ON b.account_id = a.id
                                                        WHERE b.account_id = ?
                                                        AND b.category_id = ?
                                                        AND t.type_id = ?
                                                        AND t.date BETWEEN b.date_from AND b.date_to");
                $state->execute([$accAndCat[$i]["account"],$accAndCat[$i]["category"],$expenses]);
                while($row = $state->fetch(\PDO::FETCH_ASSOC)){
                    if($row["transactAmount"] != Null) {
                        $final[] = $row;
                    }
                }
            }
        }

        return $final;

    }

    public static function checkBudget(Budget $check){
        $state = self::$pdo->prepare("SELECT COUNT(*) as count 
                                                FROM budgets 
                                                WHERE account_id = ? 
                                                AND category_id = ?");
        $state->execute([$check->getAccountId(),
                        $check->getCategoryId()]);
        $row = $state->fetch(\PDO::FETCH_ASSOC);

        return $row["count"];

    }

    public static function makeBCharts(){

    }

}