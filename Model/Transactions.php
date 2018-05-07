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

    public function Transaction($amount,$category_id,$accId,$type_id,$user_id=0)
    {
        $this->amount=$amount;
        $this->category_id=$category_id;
        $this->accId=$accId;
        $this->type_id=$type_id;
        $this->user_id=$user_id;
    }

    protected $user_to;
    protected $user_from;

    /**
     * @return mixed
     */
    public function getUserTo()
    {
        return $this->user_to;
    }

    /**
     * @param mixed $user_to
     */
    public function setUserTo($user_to)
    {
        $this->user_to = $user_to;
    }

    /**
     * @return mixed
     */
    public function getUserFrom()
    {
        return $this->user_from;
    }

    /**
     * @param mixed $user_from
     */
    public function setUserFrom($user_from)
    {
        $this->user_from = $user_from;
    }


    public function Transfer($user_to,$user_from,$amount,$accountId){
        $this->user_to=$user_to;
        $this->user_from=$user_from;
        $this->amount=$amount;
        $this->accId=$accountId;
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