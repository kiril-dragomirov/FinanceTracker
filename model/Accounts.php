<?php
/**
 * Created by PhpStorm.
 * User: User
 * Date: 16.4.2018 г.
 * Time: 0:01
 */

class Accounts extends User
{


    protected $acc_name;
    protected $user_id;
    protected $expenses;
    protected $incomes;

    public function Acc($name, $expense, $income, $user_id = 0)
    {
        $this->expenses = $expense;
        $this->incomes = $income;
        $this->acc_name = $name;
        $this->user_id = $user_id;
    }

    public function getTotal($id)
    {
        $statement = $this->pdo->prepare("SELECT 
                                              income, expense
                                                    FROM
                                                  (SELECT 
                                                        account_id as income_acc_id,SUM(amount) AS income
                                                     FROM
                                                        transactions AS i
                                                       WHERE
                                                         i.type_id = 1) AS t
                                                      JOIN
                                                           (SELECT 
                                                                    account_id as expense_acc_id,SUM(amount) AS expense
                                                                FROM
                                                                    transactions AS e
                                                                WHERE
                                                                    e.type_id = 2) AS e
                                                                    JOIN
                                                                accounts AS a
                                                                ON (a.id=expense_acc_id) AND a.id=income_acc_id
                                                            WHERE
                                                                a.user_id = ?
                                                            GROUP BY user_id");
        $statement->execute([$id]);
        $row=$statement->fetch(PDO::FETCH_ASSOC);
        return $row;


    }

    public function getAccountsInfo($id)
    {
        $result = [];
        $statement = $this->pdo->prepare("SELECT 
    a.id, a.name, a.user_id, income, expense
FROM
    accounts AS a
        LEFT JOIN
    (SELECT 
        account_id AS acc_id, SUM(amount) AS income
    FROM
        transactions AS i
    WHERE
        type_id = 1
    GROUP BY account_id) AS t ON a.id = acc_id
        LEFT JOIN
    (SELECT 
        account_id AS expense_acc_id, SUM(amount) AS expense
    FROM
        transactions AS e
    WHERE
        type_id = 2
    GROUP BY account_id) AS te ON a.id = expense_acc_id
    HAVING a.user_id=?");
        $statement->execute([$id]);
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;
    }


    public function getMaxIncomeFromAllAccounts($id){
        $statement=$this->pdo->prepare("SELECT 
                                                MAX(income) as income, a.name,acc_id
                                                FROM
                                                    (SELECT 
                                                        account_id AS acc_id, MAX(amount) AS income
                                                    FROM
                                                        transactions AS t
                                                    WHERE
                                                        type_id = 1
                                                    GROUP BY account_id) AS e
                                                        RIGHT JOIN
                                                    accounts AS a ON (a.id = acc_id)
                                                WHERE
                                                    a.user_id = ?
                                                GROUP BY a.name
                                                ORDER BY income DESC
                                                LIMIT 1");
        $statement->execute([$id]);
        $row=$statement->fetch(PDO::FETCH_ASSOC);
        return $row;
    }

    public function getMinIncomeFromAllAccounts($id){
                                        $statement=$this->pdo->prepare("SELECT 
                                         MAX(expense) AS expense, a.name, acc_id
                                         FROM
                                         (SELECT 
                                            account_id AS acc_id, MAX(amount) AS expense
                                          FROM
                                             transactions AS t
                                          WHERE
                                            type_id = 2
                                          GROUP BY account_id) AS e
                                           RIGHT JOIN
                                             accounts AS a ON (a.id = acc_id)
                                           WHERE
                                             a.user_id = ?
                                           GROUP BY a.name
                                           ORDER BY expense DESC
                                            LIMIT 1");
        $statement->execute([$id]);
        $row=$statement->fetch(PDO::FETCH_ASSOC);
        return $row;
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