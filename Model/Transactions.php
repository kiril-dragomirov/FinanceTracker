<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 16.4.2018 г.
 * Time: 19:01
 */

namespace Model;

class Transactions extends Accounts
{

    protected $amount;
    protected $category_id;
    protected $accId;
    protected $type_id;

    public function Transaction($amount,$category_id,$accId,$type_id)
    {
        $this->amount=$amount;
        $this->category_id=$category_id;
        $this->accId=$accId;
        $this->type_id=$type_id;
    }


    /**
     * @return mixed
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * @param mixed $amount
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;
    }

    /**
     * @return mixed
     */
    public function getCategoryId()
    {
        return $this->category_id;
    }

    /**
     * @param mixed $category_id
     */
    public function setCategoryId($category_id)
    {
        $this->category_id = $category_id;
    }

    /**
     * @return mixed
     */
    public function getAccId()
    {
        return $this->accId;
    }

    /**
     * @param mixed $accId
     */
    public function setAccId($accId)
    {
        $this->accId = $accId;
    }

    /**
     * @return mixed
     */
    public function getTypeId()
    {
        return $this->type_id;
    }

    /**
     * @param mixed $type_id
     */
    public function setTypeId($type_id)
    {
        $this->type_id = $type_id;
    }



}