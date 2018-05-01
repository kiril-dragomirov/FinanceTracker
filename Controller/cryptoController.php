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

    public function addCryptocurrency(){
        $user_id = $_SESSION["user"]["id"];
        $crypto_abb = trim(htmlentities(strtoupper($_POST["cryptoAbb"])));

        $file = file_get_contents("https://www.cryptocompare.com/api/data/coinlist/");
        $flag = false;
        $info = json_decode($file,true);

        foreach($info as $key => $val){

            if($key == "Data"){
                foreach($info[$key] as $k => $v){
                    if($k === $crypto_abb){
                        foreach($info[$key][$k] as $ke => $val){
                            if($ke == "FullName"){
                                $crypto_name = $val;
                                $flag = true;
                                break;
                            }
                        }
                    }
                }

            }

        }
        if($flag) {
            $checkAbb = CryptoDAO::checkCryptoAbb($crypto_abb, $user_id);
            if($checkAbb != 0){
                echo "Already exist in your list!!!";
            }else {
                CryptoDAO::addCryptocurrency($crypto_name, $crypto_abb, $user_id);
            }
        }else{
            echo "Incorrect abbreviation!!!";
        }
    }

    public function showUserCrypto(){
        $user_id = $_SESSION["user"]["id"];
        $userCrypto = CryptoDAO::showUserCrypto($user_id);

        $result = [];
        $temp = [];
        for($i = 0; $i < count($userCrypto); $i++){
            foreach($userCrypto[$i] as $key => $value) {
                if($key == "abbreviation"){
                    $apiInfo = file_get_contents("https://min-api.cryptocompare.com/data/price?fsym=".$value."&tsyms=,USD,EUR");
                    $apiInfo = json_decode($apiInfo,true);
                }else{
                    $temp["name"] = $value;
                }
            }
            $result[] = array_merge($temp,$apiInfo);
            $temp = [];

        }
        echo json_encode($result);

    }

}