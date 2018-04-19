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
    protected $expenses;
    protected $incomes;

    public function Acc($name, $expense, $income)
    {
        $this->expenses = $expense;
        $this->incomes = $income;
        $this->acc_name = $name;

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