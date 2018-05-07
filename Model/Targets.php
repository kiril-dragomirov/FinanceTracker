<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 30.4.2018 г.
 * Time: 19:28
 */

namespace Model;


class Targets extends User
{

    protected $target_name;
    protected $target_type;
    protected $target_amount;

    public function Target($name,$user_id,$amount){
        $this->target_name=$name;
        $this->user_id=$user_id;
        $this->target_amount=$amount;
    }

    /**
     * @return mixed
     */
    public function getTargetName()
    {
        return $this->target_name;
    }

    /**
     * @param mixed $target_name
     */
    public function setTargetName($target_name)
    {
        $this->target_name = $target_name;
    }

    /**
     * @return mixed
     */
    public function getTargetType()
    {
        return $this->target_type;
    }

    /**
     * @param mixed $target_type
     */
    public function setTargetType($target_type)
    {
        $this->target_type = $target_type;
    }

    /**
     * @return mixed
     */
    public function getTargetAmount()
    {
        return $this->target_amount;
    }

    /**
     * @param mixed $target_amount
     */
    public function setTargetAmount($target_amount)
    {
        $this->target_amount = $target_amount;
    }



}