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
    static public function insertTransaction(Transactions $transaction){
        $statement=self::$pdo->prepare("INSERT INTO transactions(account_id,amount,category_id,date,type_id) 
                                                  VALUES (?,?,?,now(),?)");
        $statement->execute([$transaction->getAccId(),
                             $transaction->getAmount(),
                                $transaction->getCategoryId(),
                            $transaction->getTypeId()]);

    }

    static public function insertTransactionAndAddCategory($accountId,$amount,$categoryName,$typeId,$iconId,$user_id){
        $statement=self::$pdo->prepare("SELECT a.id FROM categories as a WHERE a.name=?
                                                                    AND a.user_id=? AND a.user_id>0");
        $statement->execute([$categoryName,$user_id]);
        $row=$statement->fetch(\PDO::FETCH_ASSOC);
        if($row["id"]==null){
            try {
                $trans = self::$pdo->beginTransaction();
                $insertCategory = self::$pdo->prepare("INSERT INTO categories(name,image_id,user_id) VALUES (?,?,?)");
                $insertCategory->execute([$categoryName, $iconId, $user_id]);

                $insertTransaction=self::$pdo->prepare("INSERT INTO transactions( category_id,account_id,amount,
                                                       date,type_id) VALUES ( LAST_INSERT_ID(),?,?,now(),?)");
                $insertTransaction->execute([$accountId,$amount,$typeId]);


                $trans = self::$pdo->commit();
                return true;
            }
            catch(\PDOException $e){
                $trans=self::$pdo->rollBack();
                return false;
            }
        }else{
            $insertTransaction=self::$pdo->prepare("INSERT INTO transactions(account_id,amount,
                                                        category_id,date,type_id) VALUES (?,?,?,now(),?)");
            $insertTransaction->execute([$accountId,$amount,$row["id"],$typeId]);
            return true;
        }
    }

}