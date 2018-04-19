<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 13.4.2018 г.
 * Time: 17:41
 */

namespace Model;

class User implements \JsonSerializable
{
    public function jsonSerialize()
    {
        return get_object_vars($this);
    }
    protected $id;
    protected $name;
    protected $family;
    protected $age;
    protected $password;
    protected $email;
    protected $avatar;

    /**
     * User constructor.
     * @param $name
     * @param $family
     * @param $age
     * @param $password
     * @param $email
     * @param $avatar
     * @param $id
     */


    public function First($name, $family, $age, $password, $email, $avatar, $id=0)
    {
        $this->id=$id;
        $this->name = $name;
        $this->family = $family;
        $this->age = $age;
        $this->password = $password;
        $this->email = $email;
        $this->avatar = $avatar;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getFamily()
    {
        return $this->family;
    }

    /**
     * @param mixed $family
     */
    public function setFamily($family)
    {
        $this->family = $family;
    }

    /**
     * @return mixed
     */
    public function getAge()
    {
        return $this->age;
    }

    /**
     * @param mixed $age
     */
    public function setAge($age)
    {
        $this->age = $age;
    }

    /**
     * @return mixed
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * @param mixed $password
     */
    public function setPassword($password)
    {
        $this->password = $password;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getAvatar()
    {
        return $this->avatar;
    }

    /**
     * @param mixed $avatar
     */
    public function setAvatar($avatar)
    {
        $this->avatar = $avatar;
    }


}