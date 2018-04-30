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

}