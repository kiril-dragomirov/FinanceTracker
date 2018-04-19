<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 13.4.2018 г.
 * Time: 17:32
 */

namespace Model\Dao;

abstract class DAO
{

    const DB_NAME = "finance_tracker";
    const DB_IP = "127.0.0.1";
    const DB_PORT = "3306";
    const DB_USER = "root";
    const DB_PASS = "";
    /* @var $pdo \PDO */
    protected static $pdo;

    private function __construct()    {    }

    public static function init() {
        try {
            self::$pdo = new \PDO("mysql:host=" . self::DB_IP . ":" . self::DB_PORT . ";dbname=" . self::DB_NAME, self::DB_USER, self::DB_PASS);
            self::$pdo->setAttribute( \PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION );

        }
        catch (\PDOException $e){
            echo "Problem with db query  - " . $e->getMessage();
        }
    }
}

