<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 30.4.2018 г.
 * Time: 19:29
 */

namespace Model\Dao;

use Model\Targets;


class TargetsDAO extends DAO
{
    public static function typeTargets()
    {
        $statement = self::$pdo->prepare("SELECT id, name FROM target_type_id");
        $statement->execute();
        $result = [];
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;
    }

    static public function insertTarget($user_id, $amount, $name)
    {
        $statement = self::$pdo->prepare("SELECT COUNT(name) as count FROM targets WHERE name=?");
        $statement->execute([$name]);
        $row = $statement->fetch(\PDO::FETCH_ASSOC);
        if ($row["count"] == 0) {
            $insert = self::$pdo->prepare("INSERT INTO targets(user_id,name,amount,type_target)
                                                    VALUES (?,?,?,?)");
            $insert->execute([$user_id, $name, $amount, 1]);
            return true;
        } else {
            return false;
        }
    }

    static public function getAllActiveTargets($user_id)
    {
        $statement = self::$pdo->prepare("SELECT id,name,amount FROM targets WHERE user_id=? AND type_target=?");
        $statement->execute([$user_id, 1]);
        $result = [];
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;
    }

    static public function pauseTarget($target_id)
    {
        $statement = self::$pdo->prepare("UPDATE targets SET type_target=? WHERE id=?");
        $statement->execute([2, $target_id]);
    }

    static public function getAllWaitingTargets($user_id)
    {
        $statement = self::$pdo->prepare("SELECT id,name,amount FROM targets WHERE user_id=? AND type_target=?");
        $statement->execute([$user_id, 2]);
        $result = [];
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;
    }

    static public function startTarget($target_id)
    {
        $statement = self::$pdo->prepare("UPDATE targets SET type_target=? WHERE id=?");
        $statement->execute([1, $target_id]);
    }

    static public function setTargetToFinished($target_id)
    {
        $statement = self::$pdo->prepare("UPDATE targets SET type_target=? WHERE id=?");
        $statement->execute([3, $target_id]);
    }

    static public function getAllFinishedAndSaved($user_id)
    {
        $statement = self::$pdo->prepare("SELECT tar.name,IF(SUM(t.amount) IS NULL,0,SUM(t.amount))
                                                  as spesteno,tar.amount FROM transactions as t
                                                    JOIN target_transaction_id as tt
                                                    ON(tt.id_transactions=t.id)
                                                    RIGHT OUTER JOIN targets as tar
                                                    ON(tar.id=tt.id_target)
                                                    WHERE tar.user_id=? AND tar.type_target=?
                                                    GROUP BY tar.id");
        $statement->execute([$user_id, 3]);
        $result = [];
        while ($row = $statement->fetch(\PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;
    }

    static public function insertAmountForTarget($user_id, $amount, $target_id, $acc_id)
    {
        try {
            $statement = self::$pdo->prepare("SELECT 
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
            $statement->execute([$user_id, $acc_id]);
            $row = $statement->fetch(\PDO::FETCH_ASSOC);
            if ($row["Total"] > $amount) {
                $trans = self::$pdo->beginTransaction();
                $insertTransaction = self::$pdo->prepare("INSERT INTO transactions(account_id,amount,category_id,date,type_id)
                                                                     VALUES (?,?,14,now(),2)");
                $insertTransaction->execute([$acc_id, $amount]);
                $insertIntoTargetsTable = self::$pdo->prepare("INSERT INTO target_transaction_id(id_target,id_transactions)
                                                                VALUES(?,LAST_INSERT_ID())");
                $insertIntoTargetsTable->execute([$target_id]);
                $trans = self::$pdo->commit();
            } else {
                return "wrong";
            }
        } catch (\Exception $e) {
            $trans = self::$pdo->rollBack();
            throw new \Exception("wrong");
        }
    }

        static public function getTargetName($target_id){

        $statement = self::$pdo->prepare("SELECT name FROM targets WHERE id=?");
        $statement->execute([$target_id]);
        $row=$statement->fetch(\PDO::FETCH_ASSOC);
        return $row["name"];
      }

      static public function getTargetAvailableAmountInfo($targetId){
            $result=[];
            $leftAmount=self::$pdo->prepare("SELECT CONCAT(\"Left till main goal\") as name,
                                                IF(tar.amount-sum(t.amount)<0,0,tar.amount-sum(t.amount)) as Total 
                                                 FROM transactions as t
                                                    JOIN target_transaction_id as tt
                                                        ON (tt.id_transactions=t.id)
                                                        JOIN targets as tar ON tt.id_target=tar.id
                                                          WHERE tar.id=?");
            $leftAmount->execute([$targetId]);
            $rowLeftAmount=$leftAmount->fetch(\PDO::FETCH_ASSOC);
            if($rowLeftAmount["Total"]!=null) {
                $result[] = $rowLeftAmount;
            }
            $insertedAmount=self::$pdo->prepare("SELECT CONCAT(\"Saved Money\") as name,sum(t.amount) as Total
                                                            FROM transactions as t
                                                            JOIN target_transaction_id as tt
                                                            ON (tt.id_transactions=t.id)
                                                            WHERE tt.id_target=?");
            $insertedAmount->execute([$targetId]);
            $rowInsertedAmount=$insertedAmount->fetch(\PDO::FETCH_ASSOC);
            $result[] = $rowInsertedAmount;

            return $result;
      }

      static public function getSavingsForTarget($target_id){
          $result=[];
          $selectSavingsForTarget=self::$pdo->prepare("SELECT t.amount,t.date FROM transactions as t
                                                                    JOIN target_transaction_id as tt
                                                                    ON (tt.id_transactions=t.id)
                                                                    WHERE tt.id_target=?");
          $selectSavingsForTarget->execute([$target_id]);
          while($row=$selectSavingsForTarget->fetch(\PDO::FETCH_ASSOC)){
              $result[]=$row;
          }
          return $result;
      }

}