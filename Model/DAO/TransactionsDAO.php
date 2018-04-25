<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 4/19/2018
 * Time: 5:58 PM
 */

namespace Model\Dao;

use Model\Transactions;

class TransactionsDAO extends DAO
{
    static public function insertTransaction(Transactions $transaction)
    {
        $statement = self::$pdo->prepare("INSERT INTO transactions(account_id,amount,category_id,date,type_id) 
                                                  VALUES (?,?,?,now(),?)");
        $statement->execute([$transaction->getAccId(),
            $transaction->getAmount(),
            $transaction->getCategoryId(),
            $transaction->getTypeId()]);

    }

    static public function insertTransactionAndAddCategory($accountId, $amount, $categoryName, $typeId, $iconId, $user_id)
    {
        $statement = self::$pdo->prepare("SELECT a.id FROM categories as a WHERE a.name=?
                                                                    AND a.user_id=? AND a.user_id>0");
        $statement->execute([$categoryName, $user_id]);
        $row = $statement->fetch(\PDO::FETCH_ASSOC);
        if ($row["id"] == null) {
            try {
                $trans = self::$pdo->beginTransaction();
                $insertCategory = self::$pdo->prepare("INSERT INTO categories(name,image_id,user_id) VALUES (?,?,?)");
                $insertCategory->execute([$categoryName, $iconId, $user_id]);

                $insertTransaction = self::$pdo->prepare("INSERT INTO transactions( category_id,account_id,amount,
                                                       date,type_id) VALUES ( LAST_INSERT_ID(),?,?,now(),?)");
                $insertTransaction->execute([$accountId, $amount, $typeId]);


                $trans = self::$pdo->commit();
                return true;
            } catch (\PDOException $e) {
                $trans = self::$pdo->rollBack();
                return false;
            }
        } else {
            $insertTransaction = self::$pdo->prepare("INSERT INTO transactions(account_id,amount,
                                                        category_id,date,type_id) VALUES (?,?,?,now(),?)");
            $insertTransaction->execute([$accountId, $amount, $row["id"], $typeId]);
            return true;
        }
    }

    static public function getFirstDateForUser($user_id, $acc_id)
    {
        $statement = self::$pdo->prepare("SELECT DISTINCT date FROM transactions as t
                                                JOIN accounts as a
                                                ON (t.account_id=a.id)
                                                WHERE a.user_id=? AND a.id=? ORDER BY date ASC ");
        $statement->execute([$user_id, $acc_id]);
        $result = [];
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;
    }

    static public function getDateToList($date, $acc_id, $user_id)
    {
        $statement = self::$pdo->prepare("SELECT DISTINCT t.date FROM transactions as t
                                                    JOIN accounts as a
                                                    ON (t.account_id=a.id)
                                                    WHERE a.user_id=? AND a.id=? AND date>=? ORDER BY date ASC");
        $statement->execute([$user_id, $acc_id, $date]);
        $result = [];
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;


    }

    static public function getAllTransactions($accId, $type_id, $date_from, $date_to)
    {
        if ($type_id == 0 && $date_from == 0 && $date_to == 0) {
            $statement = self::$pdo->prepare("SELECT a.name as AccountName,t.amount,c.name as CategoryName,t.date,t.type_id as Type,t.id as ID FROM transactions as t
                                                    JOIN categories as c 
                                                    ON(t.category_id=c.id)
                                                    JOIN accounts as a
                                                    ON(a.id=t.account_id)
                                                    WHERE a.id=?");
            $statement->execute([$accId]);
            $result = [];
            while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
        } else if ($type_id != 0 && $date_from == 0 && $date_to == 0) {
            $statement = self::$pdo->prepare("SELECT a.name as AccountName,t.amount,c.name as CategoryName,t.date,t.type_id as Type,t.id as ID FROM transactions as t
                                                    JOIN categories as c 
                                                    ON(t.category_id=c.id)
                                                    JOIN accounts as a
                                                    ON(a.id=t.account_id)
                                                    WHERE a.id=? AND t.type_id=?");
            $statement->execute([$accId, $type_id]);
            $result = [];
            while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
        } else if ($type_id != 0 && $date_from != 0 && $date_to == 0) {
            $statement = self::$pdo->prepare("SELECT a.name as AccountName,t.amount,c.name as CategoryName,t.date,t.type_id as Type,t.id as ID FROM transactions as t
                                                    JOIN categories as c 
                                                    ON(t.category_id=c.id)
                                                    JOIN accounts as a
                                                    ON(a.id=t.account_id)
                                                    WHERE a.id=? AND t.type_id=? AND t.date>=?");
            $statement->execute([$accId, $type_id,$date_from]);
            $result = [];
            while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
        }else if($type_id==0 && $date_from!=0 && $date_to==0){
            $statement = self::$pdo->prepare("SELECT a.name as AccountName,t.amount,c.name as CategoryName,t.date,t.type_id as Type,t.id as ID FROM transactions as t
                                                    JOIN categories as c 
                                                    ON(t.category_id=c.id)
                                                    JOIN accounts as a
                                                    ON(a.id=t.account_id)
                                                    WHERE a.id=? AND t.date>=?");
            $statement->execute([$accId, $date_from]);
            $result = [];
            while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
        }else if($type_id!=0 && $date_from!=0 && $date_to!=0){
            $statement = self::$pdo->prepare("SELECT a.name as AccountName,t.amount,c.name as CategoryName,t.date,t.type_id as Type,t.id as ID FROM transactions as t
                                                    JOIN categories as c 
                                                    ON(t.category_id=c.id)
                                                    JOIN accounts as a
                                                    ON(a.id=t.account_id)
                                                    WHERE a.id=? AND t.type_id=? AND t.date BETWEEN ? AND ?");
            $statement->execute([$accId, $type_id ,$date_from,$date_to]);
            $result = [];
            while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
        }else if($type_id==0 && $date_from!=0 && $date_to!=0){
            $statement = self::$pdo->prepare("SELECT a.name as AccountName,t.amount,c.name as CategoryName,t.date,t.type_id as Type,t.id as ID FROM transactions as t
                                                    JOIN categories as c 
                                                    ON(t.category_id=c.id)
                                                    JOIN accounts as a
                                                    ON(a.id=t.account_id)
                                                    WHERE a.id=? AND t.date BETWEEN ? AND ?");
            $statement->execute([$accId, $date_from,$date_to]);
            $result = [];
            while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
                $result[] = $row;
            }
        }
        return $result;
    }

    static public function RemoveTrans($transId)
    {
        $statement = self::$pdo->prepare("DELETE FROM transactions WHERE id=?");
        $statement->execute([$transId]);
    }

    static public function chartIncomeExpenses($accId){
//        $statement=self::$pdo->prepare("SELECT
//                                                        income, expense
//                                                    FROM
//                                                        (SELECT
//                                                            SUM(i.amount) AS income
//                                                        FROM
//                                                            transactions AS i
//                                                        WHERE
//                                                            i.type_id = 1 AND i.account_id = ?) AS t
//                                                            JOIN
//                                                        (SELECT
//                                                            SUM(e.amount) AS expense
//                                                        FROM
//                                                            transactions AS e
//                                                        WHERE
//                                                            e.type_id = 2 AND e.account_id = ?) AS k");
        $statement=self::$pdo->prepare("SELECT 
                  CONCAT('income') AS kkey, SUM(i.amount) AS valuee
                            FROM
                      transactions AS i
                            WHERE
                  i.type_id = 1 AND i.account_id = ?");
        $statement->execute([$accId]);
        $result=[];
        while($row=$statement->fetch(\PDO::FETCH_ASSOC)){
            $result[]=$row;
        }
        $incomeStatement=self::$pdo->prepare("SELECT 
                  CONCAT('expense') AS kkey, SUM(i.amount) AS valuee
                            FROM
                      transactions AS i
                            WHERE
                  i.type_id = 2 AND i.account_id = ?");
        $incomeStatement->execute([$accId]);
        while($row=$incomeStatement->fetch(\PDO::FETCH_ASSOC)){
            $result[]=$row;
        }

        return $result;

    }

    static public function chartCategory($user_id,$acc_id,$type_id){
        $params=[];
        $query="SELECT SUM(t.amount) as valuee,c.name as kkey FROM transactions as t 
                                                        JOIN accounts as a
                                                        ON (t.account_id=a.id)
                                                        JOIN categories as c
                                                        ON(t.category_id=c.id)
                                                        WHERE a.user_id=? AND type_id=?";
        if($acc_id!="all"){
            $query.=" AND a.id=? GROUP BY c.name";
            $params=[$user_id,$type_id,$acc_id];
        }else{
            $query.="GROUP BY c.name";
            $params=[$user_id,$type_id];
        }
        $statement=self::$pdo->prepare($query);
        $statement->execute($params);
        $result=[];
        while($row=$statement->fetch(\PDO::FETCH_ASSOC)){
            $result[]=$row;
        }
        return $result;
    }


    static public function getCategoryAcc($acc_id,$user_id){
        $query="SELECT  DISTINCT(c.name),c.id FROM categories as c
                JOIN transactions as t
                ON(c.id=t.category_id)
                JOIN accounts as a
                ON (a.id=t.account_id)
                WHERE a.user_id=? ";
        if($acc_id=="all"){
            $params=[$user_id];
        }else{
            $query.=" AND a.id=?";
            $params=[$user_id,$acc_id];
        }
        $statement=self::$pdo->prepare($query);
        $statement->execute($params);
        $result=[];
        while($row=$statement->fetch(\PDO::FETCH_ASSOC)){
            $result[]=$row;
        }
        return $result;
    }

    static public function getIncomeExpensesAccordingCategoryAndAccount($user_id,$acc_id,$category_id){
        $query="SELECT tt.name as kkey,SUM(t.amount) as valuee FROM transactions as t 
                                        JOIN categories as c
                                  ON c.id=t.category_id
                                  JOIN accounts as a
                                        ON (t.account_id=a.id)
                                        JOIN type_transactions as tt
                                        ON (tt.id=t.type_id)
                                        WHERE a.user_id=? AND t.category_id=? ";

        if($acc_id=="all"){
            $params=[$user_id,$category_id];
            $query.="GROUP BY tt.name";
        }else{
            $params=[$user_id,$category_id,$acc_id];
            $query.="AND t.account_id=? GROUP BY tt.name";

        }
        $statement=self::$pdo->prepare($query);
        $statement->execute($params);
        $result=[];
        while($row=$statement->fetch(\PDO::FETCH_ASSOC)){
            $result[]=$row;
        }

        return $result;
    }

    static public function transfer($user_from,$user_to,$amount,$accId){
        try{
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
                                        HAVING a.user_id =? AND a.id=?");
            $statement->execute([$user_from,$accId]);
            $row=$statement->fetch(\PDO::FETCH_ASSOC);
            if($row["Total"]>$amount) {
                $trans=self::$pdo->beginTransaction();
                $insertTransaction = self::$pdo->prepare("INSERT INTO transactions(account_id,amount,category_id,date,type_id)
                                                                     VALUES (?,?,12,now(),2)");
                $insertTransaction->execute([$accId, $amount]);
                $makeTransfer = self::$pdo->prepare("INSERT INTO transfers(from_user_id,to_user_id,date,amount)
                                                                VALUES(?,?,now(),?)");
                $makeTransfer->execute([$user_from, $user_to, $amount]);
                $trans=self::$pdo->commit();
            }
        }catch(\Exception $e){
                $trans=self::$pdo->rollBack();
                throw new \Exception($e->getMessage());
        }
    }


}