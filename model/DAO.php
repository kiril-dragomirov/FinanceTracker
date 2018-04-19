<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 13.4.2018 г.
 * Time: 17:32
 */

abstract class DAO
{


    protected $pdo;

    public function __construct()
    {
        try {
            $this->pdo = new PDO("mysql:host=127.0.0.1:3306; dbname=finance_tracker", "root", "");
            $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        }catch (PDOException $e){
            echo $e->getMessage();
        }
    }

}

