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
                    $apiInfo = file_get_contents("https://min-api.cryptocompare.com/data/price?fsym=".$value."&tsyms=BTC,USD,EUR");
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
        $crypto_price = trim(htmlentities($_POST["cryptoPrice"]));
        $crypto_count = trim(htmlentities($_POST["cryptoCount"]));
        $crypto_type_cur = trim(htmlentities($_POST["typeCur"]));

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
            echo "Success!!";
            CryptoDAO::addCryptocurrency($crypto_name, $crypto_abb,$crypto_price,$crypto_count, $user_id, $crypto_type_cur);
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

    public function cryptoCalculating(){
        $user_id = $_SESSION["user"]["id"];
        $cryptoInfo = CryptoDAO::cryptoCalculating($user_id);

        $result = [];
        $temp = [];
        for($i = 0; $i < count($cryptoInfo); $i++){
            foreach($cryptoInfo[$i] as $key => $value) {
                if($key == "abbreviation"){
                    $apiInfo = file_get_contents("https://min-api.cryptocompare.com/data/price?fsym=".$value."&tsyms=".$cryptoInfo[$i]["currency"]);
                    $apiInfo = json_decode($apiInfo,true);
                }else{
                    $temp[$key] = $value;
                }
            }
            $result[] = array_merge($temp,$apiInfo);
            $temp = [];

        }

        $result1 = [];
        $temp1 = [];
        for($i = 0; $i < count($result); $i++){
            foreach($result[$i] as $key => $value){
               if($key == "USD" || $key == "EUR" || $key == "BTC"){
                   $temp1[$key] = $value;
                   $temp1["change"] = ($value*$result[$i]["count"])-($result[$i]["price"]*$result[$i]["count"]);
               }else{
                   $temp1[$key] = $value;
               }
            }
            $result1[] = $temp1;
            $temp1 = [];
        }


        echo json_encode($result1);
    }

    public function selectCurrencies(){
        $diffTypeCur = CryptoDAO::selectCurrencies();
        echo json_encode($diffTypeCur);
    }

}