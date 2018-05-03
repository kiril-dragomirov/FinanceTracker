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

    public static function addCryptocurrency($crypto_name, $crypto_abb, $crypto_price, $crypto_count, $user_id,$crypto_type_cur){
        $statement = self::$pdo->prepare("INSERT INTO cryptocurrencies (name,abbreviation,user_id,price,count,currency_id) 
                                                    VALUES (?,?,?,?,?,?)");
        $statement->execute([$crypto_name,$crypto_abb,$user_id,$crypto_price,$crypto_count,$crypto_type_cur]);
    }

    public static function checkCryptoAbb($crypto_abb, $user_id){
        $statement = self::$pdo->prepare("SELECT COUNT(name) as count 
                                                    FROM cryptocurrencies
                                                    WHERE abbreviation = ? 
                                                    AND user_id = ?
                                                    ");
        $statement->execute([$crypto_abb,$user_id]);
        $row = $statement->fetch(\PDO::FETCH_ASSOC);

        return $row["count"];

    }

    public static function showUserCrypto($user_id){
        $statement = self::$pdo->prepare("SELECT name,abbreviation
                                                    FROM cryptocurrencies
                                                    WHERE user_id = ?");
        $statement->execute([$user_id]);
        $result = [];
        while($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            $result[] = $row;
        }

        return $result;
    }

    public static function cryptoCalculating($user_id){
        $statement = self::$pdo->prepare("SELECT cr.name, cr.abbreviation, cr.price, cr.count, ty.name as currency
                                                    FROM cryptocurrencies AS cr
                                                    JOIN type_currency as ty
                                                    ON cr.currency_id = ty.id
                                                    WHERE cr.user_id = ?
                                                    ORDER BY cr.id DESC");
        $statement->execute([$user_id]);
        $result = [];
        while($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            $result[] = $row;
        }

        return $result;
    }

    public static function selectCurrencies(){
        $statement = self::$pdo->prepare("SELECT id, name FROM type_currency");
        $statement->execute();
        $result = [];
        while($row = $statement->fetch(\PDO::FETCH_ASSOC)){
            $result[] = $row;
        }

        return $result;
    }

}