<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 5/1/2018
 * Time: 10:28 AM
 */
namespace Controller;
use Model\DAO\CryptoDAO;

class cryptoController
{
    public function cryptoCounting(){

        $crypto = CryptoDAO::takeCryptoData();
        $result = [];
        $temp = [];
        for($i = 0; $i < count($crypto); $i++){
            foreach($crypto[$i] as $key => $value) {
                if($key == "abbreviation"){
                    $apiInfo = file_get_contents("https://min-api.cryptocompare.com/data/price?fsym=".$value."&tsyms=".$value.",USD,EUR");
                    $apiInfo = json_decode($apiInfo,true);
                }else{
                    $temp["name"] = $value ." (".$crypto[$i]["abbreviation"].")";
                }
            }
            $result[] = array_merge($temp,$apiInfo);
            $temp = [];

        }
        echo json_encode($result);
    }

    public function makeCryptoChart(){
        $crypto = CryptoDAO::takeCryptoData();
        $result = [];
        $temp = [];
        for($i = 0; $i < count($crypto); $i++){
            foreach($crypto[$i] as $key => $value) {
                if($key == "abbreviation"){
                    $apiInfo = file_get_contents("https://min-api.cryptocompare.com/data/price?fsym=".$value."&tsyms=USD");
                    $apiInfo = json_decode($apiInfo,true);
                }else{
                    $temp["name"] = $value ." (".$crypto[$i]["abbreviation"].")";
                }
            }
            $result[] = array_merge($temp,$apiInfo);
            $temp = [];

        }
        echo json_encode($result);
    }

}