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
    public static function typeTargets(){
        $statement=self::$pdo->prepare("SELECT id, name FROM target_type_id");
        $statement->execute();
        $result=[];
        while($row=$statement->fetch(\PDO::FETCH_ASSOC)){
            $result[]=$row;
        }
        return $result;
    }

    static public function insertTarget($user_id,$amount,$name){
        $statement=self::$pdo->prepare("SELECT COUNT(name) as count FROM targets WHERE name=?");
        $statement->execute([$name]);
        $row=$statement->fetch(\PDO::FETCH_ASSOC);
        if($row["count"]==0){
            $insert=self::$pdo->prepare("INSERT INTO targets(user_id,name,amount,type_target)
                                                    VALUES (?,?,?,?)");
            $insert->execute([$user_id,$name,$amount,1]);
            return true;
        }else{
            return false;
        }
    }

    static public function getAllActiveTargets($user_id){
        $statement=self::$pdo->prepare("SELECT id,name,amount FROM targets WHERE user_id=? AND type_target=?");
        $statement->execute([$user_id,1]);
        $result=[];
        while($row=$statement->fetch(\PDO::FETCH_ASSOC)){
            $result[]=$row;
        }
        return $result;
    }

    static public function pauseTarget($target_id){
        $statement=self::$pdo->prepare("UPDATE targets SET type_target=? WHERE id=?");
        $statement->execute([2,$target_id]);
    }

    static public function getAllWaitingTargets($user_id){
        $statement=self::$pdo->prepare("SELECT id,name,amount FROM targets WHERE user_id=? AND type_target=?");
        $statement->execute([$user_id,2]);
        $result=[];
        while($row=$statement->fetch(\PDO::FETCH_ASSOC)){
            $result[]=$row;
        }
        return $result;
    }

    static public function startTarget($target_id){
        $statement=self::$pdo->prepare("UPDATE targets SET type_target=? WHERE id=?");
        $statement->execute([1,$target_id]);
    }

    static public function setTargetToFinished($target_id){
        $statement=self::$pdo->prepare("UPDATE targets SET type_target=? WHERE id=?");
        $statement->execute([3,$target_id]);
    }

    static public function getAllFinishedAndSaved($user_id){
        $statement=self::$pdo->prepare("SELECT tar.name,IF(SUM(t.amount) IS NULL,0,SUM(t.amount))
                                                  as spesteno,tar.amount FROM transactions as t
                                                    JOIN target_transaction_id as tt
                                                    ON(tt.id_transactions=t.id)
                                                    RIGHT OUTER JOIN targets as tar
                                                    ON(tar.id=tt.id_target)
                                                    WHERE tar.user_id=? AND tar.type_target=?
                                                    GROUP BY tar.id");
        $statement->execute([$user_id,3]);
        $result=[];
        while($row=$statement->fetch(\PDO::FETCH_ASSOC)){
            $result[]=$row;
        }
        return $result;
    }

}