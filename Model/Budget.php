<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 17.4.2018 г.
 * Time: 13:30
 */

namespace Model;

class Budget extends  Transactions
{

    protected $account_id;
    protected $budjet_amount;
    protected $category_id;
    protected $date_from;
    protected $date_to;

    public function budgetConst($account_id, $budget_amount, $category_id, $date_from, $date_to)
    {
        $this->account_id=$account_id;
        $this->budjet_amount=$budget_amount;
        $this->category_id=$category_id;
        $this->date_from=$date_from;
        $this->date_to=$date_to;
    }

    /**
     * @param mixed $acc_name
     */
    public function setAccName($acc_name)
    {
        $this->acc_name = $acc_name;
    }

    /**
     * @param mixed $account_id
     */
    public function setAccountId($account_id)
    {
        $this->account_id = $account_id;
    }

    /**
     * @param mixed $budjet_amount
     */
    public function setBudjetAmount($budjet_amount)
    {
        $this->budjet_amount = $budjet_amount;
    }

    /**
     * @param mixed $category_id
     */
    public function setCategoryId($category_id)
    {
        $this->category_id = $category_id;
    }

    /**
     * @param mixed $date_from
     */
    public function setDateFrom($date_from)
    {
        $this->date_from = $date_from;
    }

    /**
     * @param mixed $date_to
     */
    public function setDateTo($date_to)
    {
        $this->date_to = $date_to;
    }

    /**
     * @return mixed
     */
    public function getAccountId()
    {
        return $this->account_id;
    }

    /**
     * @return mixed
     */
    public function getBudjetAmount()
    {
        return $this->budjet_amount;
    }

    /**
     * @return mixed
     */
    public function getCategoryId()
    {
        return $this->category_id;
    }

    /**
     * @return mixed
     */
    public function getDateFrom()
    {
        return $this->date_from;
    }

    /**
     * @return mixed
     */
    public function getDateTo()
    {
        return $this->date_to;
    }


}