<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 5/7/2018
 * Time: 8:22 PM
 */

namespace Model;


class  Crypto extends User
{
    protected $crypto_name;
    protected $crypto_abb;
    protected $crypto_price;
    protected $crypto_count;
    protected $crypto_type_cur;

    public function cryptoConst($crypto_name, $crypto_abb, $crypto_price, $crypto_count, $user_id, $crypto_type_cur){
        $this->crypto_name=$crypto_name;
        $this->crypto_abb=$crypto_abb;
        $this->crypto_price=$crypto_price;
        $this->crypto_count=$crypto_count;
        $this->id=$user_id;
        $this->crypto_type_cur=$crypto_type_cur;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getCryptoName()
    {
        return $this->crypto_name;
    }

    /**
     * @param mixed $crypto_name
     */
    public function setCryptoName($crypto_name)
    {
        $this->crypto_name = $crypto_name;
    }

    /**
     * @return mixed
     */
    public function getCryptoAbb()
    {
        return $this->crypto_abb;
    }

    /**
     * @param mixed $crypto_abb
     */
    public function setCryptoAbb($crypto_abb)
    {
        $this->crypto_abb = $crypto_abb;
    }

    /**
     * @return mixed
     */
    public function getCryptoPrice()
    {
        return $this->crypto_price;
    }

    /**
     * @param mixed $crypto_price
     */
    public function setCryptoPrice($crypto_price)
    {
        $this->crypto_price = $crypto_price;
    }

    /**
     * @return mixed
     */
    public function getCryptoCount()
    {
        return $this->crypto_count;
    }

    /**
     * @param mixed $crypto_count
     */
    public function setCryptoCount($crypto_count)
    {
        $this->crypto_count = $crypto_count;
    }

    /**
     * @return mixed
     */
    public function getCryptoTypeCur()
    {
        return $this->crypto_type_cur;
    }

    /**
     * @param mixed $crypto_type_cur
     */
    public function setCryptoTypeCur($crypto_type_cur)
    {
        $this->crypto_type_cur = $crypto_type_cur;
    }

}