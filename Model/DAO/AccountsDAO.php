<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 4/19/2018
 * Time: 6:00 PM
 */

namespace Model\Dao;

use Model\Accounts;

class AccountsDAO extends DAO
{

    static public function getTotal($id)
    {
//        $statement = self::$pdo->prepare("SELECT
//    income,expense
//FROM
//    (SELECT
//        account_id AS income_acc_id, SUM(amount) AS income
//    FROM
//        transactions AS i
//    JOIN accounts AS acc ON (acc.id = i.account_id)
//    WHERE
//        i.type_id = 1 AND acc.user_id = ?) AS t
//      JOIN
//    (SELECT
//        account_id AS expense_acc_id, SUM(amount) AS expense
//    FROM
//        transactions AS e
//        JOIN accounts AS a ON (a.id = e.account_id)
//    WHERE
//        e.type_id = 2 AND a.user_id = ?) as e");
        $statement = self::$pdo->prepare("SELECT 
                                               income,expense,COUNT(aj.id) as accNumber
                                        FROM
                                            (SELECT 
                                                account_id AS income_acc_id, SUM(amount) AS income
                                            FROM
                                                transactions AS i
                                            JOIN accounts AS acc ON (acc.id = i.account_id)
                                            WHERE
                                                i.type_id = 1 AND acc.user_id = ?) AS t
                                              JOIN
                                            (SELECT 
                                                account_id AS expense_acc_id, SUM(amount) AS expense
                                            FROM
                                                transactions AS e
                                                JOIN accounts AS a ON (a.id = e.account_id)
                                            WHERE
                                                e.type_id = 2 AND a.user_id = ?) as e
                                                JOIN accounts as aj
                                               WHERE aj.user_id=?
                                                ");
        $statement->execute([$id, $id, $id]);
        $row = $statement->fetch(\PDO::FETCH_ASSOC);
        return $row;


    }

    static public function getAccountsInfo($id)
    {
        $result = [];
        $statement = self::$pdo->prepare("SELECT 
                                            a.id, a.name, a.user_id, income, expense
                                        FROM
                                            accounts AS a
                                                LEFT JOIN
                                            (SELECT 
                                                account_id AS acc_id, SUM(amount) AS income
                                            FROM
                                                transactions AS i
                                            WHERE
                                                type_id = 1
                                            GROUP BY account_id) AS t ON a.id = acc_id
                                                LEFT JOIN
                                            (SELECT 
                                                account_id AS expense_acc_id, SUM(amount) AS expense
                                            FROM
                                                transactions AS e
                                            WHERE
                                                type_id = 2
                                            GROUP BY account_id) AS te ON a.id = expense_acc_id
                                            HAVING a.user_id=?");
        $statement->execute([$id]);
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;
    }


    static public function getMaxIncomeFromAllAccounts($id)
    {
        $statement = self::$pdo->prepare("SELECT 
                                                MAX(income) as income, a.name,acc_id
                                                FROM
                                                    (SELECT 
                                                        account_id AS acc_id, MAX(amount) AS income
                                                    FROM
                                                        transactions AS t
                                                    WHERE
                                                        type_id = 1
                                                    GROUP BY account_id) AS e
                                                        RIGHT JOIN
                                                    accounts AS a ON (a.id = acc_id)
                                                WHERE
                                                    a.user_id = ?
                                                GROUP BY a.name
                                                ORDER BY income DESC
                                                LIMIT 1");
        $statement->execute([$id]);
        $row = $statement->fetch(\PDO::FETCH_ASSOC);
        return $row;
    }

    static public function getMinIncomeFromAllAccounts($id)
    {
        $statement = self::$pdo->prepare("SELECT 
                                         MAX(expense) AS expense, a.name, acc_id
                                         FROM
                                         (SELECT 
                                            account_id AS acc_id, MAX(amount) AS expense
                                          FROM
                                             transactions AS t
                                          WHERE
                                            type_id = 2
                                          GROUP BY account_id) AS e
                                           RIGHT JOIN
                                             accounts AS a ON (a.id = acc_id)
                                           WHERE
                                             a.user_id = ?
                                           GROUP BY a.name
                                           ORDER BY expense DESC
                                            LIMIT 1");
        $statement->execute([$id]);
        $row = $statement->fetch(\PDO::FETCH_ASSOC);
        return $row;
    }

    static public function getAccNamesAndAccIds($user_id)
    {
        $result = [];
        $statement = self::$pdo->prepare("SELECT name, id FROM accounts WHERE user_id=?");
        $statement->execute([$user_id]);
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;

    }

    static public function checkIfAccountExistsAndInsert($name, $amount, $id)
    {
        $numberAcc = self::$pdo->prepare("SELECT count(*) as count FROM accounts WHERE user_id=?");
        $numberAcc->execute([$id]);
        $result = $numberAcc->fetch(\PDO::FETCH_ASSOC);
        $maxNumberOfAccounts=4;//which means that each user can have only 4 accounts.
        if ($result["count"] <= $maxNumberOfAccounts) {
            $statement = self::$pdo->prepare("SELECT count(*) as count FROM accounts WHERE name=? AND user_id=?");
            $statement->execute([$name, $id]);
            $row = $statement->fetch(\PDO::FETCH_ASSOC);
            if ($row["count"] == 0) {
                try {
                    $trans = self::$pdo->beginTransaction();
                    $insert = self::$pdo->prepare("INSERT INTO accounts(user_id,name) VALUES (?,?)");
                    $insert->execute([$id, $name]);
                    //Using ---LAST_INSERT_ID()--- we get last inserted ID in DB!;
                    $insertTrans = self::$pdo->prepare("INSERT INTO transactions(account_id,amount,category_id,date,type_id)
                                                           VALUES (LAST_INSERT_ID(),?,1,now(),1)");
                    $insertTrans->execute([$amount]);
                    $trans = self::$pdo->commit();
                    return true;
                } catch (\PDOException $e) {
                    $trans = self::$pdo->rollBack();
                    return false;
                }
            }
            return false;
        }
        return false;
    }

    static public function getTransactionType()
    {
        $result = [];
        $statement = self::$pdo->prepare("SELECT id,name FROM type_transactions WHERE id=1 OR id=2");
        $statement->execute();
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;
    }

    static public function getCategoryList($id)
    {
        $result = [];
        $statement = self::$pdo->prepare("SELECT c.id,c.name,i.img_url FROM categories as c
                                                JOIN icons as i
                                                ON (i.id=c.image_id)
                                                WHERE c.user_id=0 OR c.user_id=?");
        $statement->execute([$id]);
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;
    }

    static public function getIconList()
    {
        $result = [];
        $statement = self::$pdo->prepare("SELECT id,img_url FROM icons");
        $statement->execute();
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;
    }

    static public function removeAcc($acc_id)
    {
        try {
            $trans = self::$pdo->beginTransaction();
            $removeBudget = self::$pdo->prepare("DELETE FROM budgets-js WHERE account_id=?");
            $removeBudget->execute($acc_id);
            $statement = self::$pdo->prepare("DELETE FROM transactions WHERE account_id=?");
            $statement->execute([$acc_id]);
            $removeAcc = self::$pdo->prepare("DELETE FROM accounts WHERE id=?");
            $removeAcc->execute([$acc_id]);
            $trans = self::$pdo->commit();
        } catch (\PDOException $e) {
            $trans = self::$pdo->rollBack();
        }
    }

    static public function chartAccountsAmounts($user_id)
    {
        $result = [];
        $statement = self::$pdo->prepare("SELECT 
                                  a.user_id,a.name,(IF(income IS NULL,0,income)- IF(expense IS NULL,0,expense)) as Total
                                        FROM
                                            accounts AS a
                                                LEFT JOIN
                                                (SELECT 
                                                account_id AS acc_id, SUM(amount) AS income
                                            FROM
                                                transactions AS i
                                            WHERE
                                                type_id = 1
                                            GROUP BY account_id) AS t ON a.id = acc_id
                                                LEFT JOIN
                                                (SELECT 
                                                account_id AS expense_acc_id, SUM(amount) AS expense
                                            FROM
                                                transactions AS e
                                            WHERE
                                                type_id = 2
                                            GROUP BY account_id) AS te ON a.id = expense_acc_id
                                        HAVING a.user_id = ?");
        $statement->execute([$user_id]);
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {

            $result[] = $row;
        }
        return $result;
    }

    static public function accNameForPositiveAcc($user_id){
        $statement=self::$pdo->prepare("SELECT 
                                  a.user_id,a.id,a.name,(IF(income IS NULL,0,income)- IF(expense IS NULL,0,expense)) as Total
                                        FROM
                                            accounts AS a
                                                LEFT JOIN
                                                (SELECT 
                                                account_id AS acc_id, SUM(amount) AS income
                                            FROM
                                                transactions AS i
                                            WHERE
                                                type_id = 1
                                            GROUP BY account_id) AS t ON a.id = acc_id
                                                LEFT JOIN
                                                (SELECT 
                                                account_id AS expense_acc_id, SUM(amount) AS expense
                                            FROM
                                                transactions AS e
                                            WHERE
                                                type_id = 2
                                            GROUP BY account_id) AS te ON a.id = expense_acc_id
                                        HAVING a.user_id =?");
        $statement->execute([$user_id]);
        $result=[];
        while($row=$statement->fetch(\PDO::FETCH_ASSOC)){
            $result[]=$row;
        }
        return $result;

    }




}