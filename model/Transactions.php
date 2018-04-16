<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 16.4.2018 г.
 * Time: 19:01
 */

class Transactions extends Accounts
{
    protected $acc_id;
    protected $amount;
    protected $category_id;
    protected $date_trans;
    protected $type_id;

    public function Transaction($acc_id,$amount,$category_id,$date_trans,$type_id)
    {
        $this->acc_id=$acc_id;
        $this->amount=$amount;
        $this->category=$category_id;
        $this->date_trans=$date_trans;
        $this->type_id=$type_id;
    }

}