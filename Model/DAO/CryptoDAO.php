<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 5/1/2018
 * Time: 10:29 AM
 */

namespace Model\Dao;


class CryptoDAO extends DAO
{
    public static function takeCryptoData()
    {
        $statement = self::$pdo->prepare("SELECT name , abbreviation  FROM cryptocurrencies
                                                    WHERE user_id = 0 ");
        $statement->execute();
        $result = [];
        while($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            $result[] = $row;
        }

        return $result;
    }

    public static function addCryptocurrency($crypto_name, $crypto_abb, $user_id){
        $statement = self::$pdo->prepare("INSERT INTO cryptocurrencies (name,abbreviation,user_id) 
                                                    VALUES (?,?,?)");
        $statement->execute([$crypto_name,$crypto_abb,$user_id]);
    }

}