<?php

session_start();
require_once("fpdf.php");

const DB_NAME = "finance_tracker";
const DB_IP = "127.0.0.1";
const DB_PORT = "3306";
const DB_USER = "root";
const DB_PASS = "";

try {
    $pdo = new PDO("mysql:host=" . DB_IP . ":" . DB_PORT . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

}
catch (PDOException $e){
    echo "Problem with db query  - " . $e->getMessage();
}
$user_id = $_SESSION["user"]["id"];

    $statement = $pdo->prepare("SELECT 
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
    $info = [];
    $statement->execute([$user_id]);
    while($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $info[]=$row;
    }

    $infoTransactions=[];
    $state=$pdo->prepare("SELECT a.name as AccountName,t.amount,c.name as CategoryName,t.date,tt.name as Type,t.id as ID FROM transactions as t
                                                    JOIN categories as c 
                                                    ON(t.category_id=c.id)
                                                    JOIN accounts as a
                                                    ON(a.id=t.account_id)
                                                     JOIN icons as i
                                                    ON c.image_id=i.id
                                                    JOIN type_transactions as tt
                                                    ON tt.id=t.type_id
                                                    WHERE a.user_id=?");
    $state->execute([$user_id]);
    while($transactionsRow=$state->fetch(PDO::FETCH_ASSOC)){
        $infoTransactions[]=$transactionsRow;
    }


$firstname = $_SESSION["user"]["name"];
$lastname = $_SESSION["user"]["family_name"];



$pdf= new FPDF();
$pdf->AddPage();
$pdf->SetFont("Arial","B",12);
$pdf->Cell( 50, 10, $pdf->Image("logoFinance.png", $pdf->GetX() + 40 , $pdf->GetY(), 133.78), 0, 0, 'R', false );
$pdf->Cell(0,100," Name: {$lastname} , {$firstname}",0,0,"C");
$pdf->Cell(0,60,"",0,1,"C");
for($i = 0; $i < count($info); $i++) {
    $count = 1;
    foreach ($info as $key=>$value) {
        if($count == 1) {

                $pdf->Cell(0, 15, "id: {$info[$i]["id"]}                name: {$info[$i]["name"]}                  income:  {$info[$i]["income"]}                expense: {$info[$i]["expense"]}", 1, 0, "L");
                $pdf->Cell(0, 5, "", 1, 1, "C");
                break;

        }
    }
}
$pdf->Cell(0,60,"",0,1,"C");
for($t=0;$t<count($infoTransactions);$t++){
    $count=0;
    foreach($infoTransactions as $key=>$value){
        if($count==0){
            $pdf->Cell(0, 15, "id: {$infoTransactions[$t]["ID"]},   Accaount Name: {$infoTransactions[$t]["AccountName"]},   Amount: {$infoTransactions[$t]["amount"]},     Category:{$infoTransactions[$t]["CategoryName"]},    Type:{$infoTransactions[$t]["Type"]} ", 1, 0, "L");
            $pdf->Cell(0, 5, "", 1, 1, "C");
            break;
        }
    }
}




$pdf->output();
?>