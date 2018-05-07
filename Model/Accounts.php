<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 16.4.2018 г.
 * Time: 0:01
 */

namespace Model;

class Accounts extends User
{


    protected $acc_name;
    protected $available_amount;
    protected $incomes;

    public function Acc($name, $available_amount,$user_id)
    {
        $this->available_amount = $available_amount;
        $this->acc_name = $name;
        $this->user_id=$user_id;

    }

    /**
     * @return mixed
     */
    public function getAvailableAmount()
    {
        return $this->available_amount;
    }

    /**
     * @param mixed $amount
     */
    public function setAvailableAmount($amount)
    {
        $this->available_amount = $amount;
    }



    /**
     * @return mixed
     */
    public function getAccName()
    {
        return $this->acc_name;
    }

    /**
     * @param mixed $acc_name
     */
    public function setAccName($acc_name)
    {
        $this->acc_name = $acc_name;
    }

    /**
     * @return mixed
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * @param mixed $user_id
     */
    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
    }


}