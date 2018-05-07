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

    $statement = $pdo->prepare("SELECT a.id, a.name, (SUM(t.amount)) as expense FROM accounts as a
                                            JOIN transactions as t
                                            ON t.account_id = a.id
                                            JOIN users as u
                                            ON a.user_id = u.id
                                            WHERE type_id = 2
                                            AND u.id = 9
                                            GROUP BY t.account_id");
    $expense = [];
    $statement->execute([$user_id]);
    while($row = $statement->fetch(PDO::FETCH_ASSOC)) {
        $expense[]=$row;
    }


$stat = $pdo->prepare("SELECT a.id, a.name, (SUM(t.amount)) as income FROM accounts as a
                                            JOIN transactions as t
                                            ON t.account_id = a.id
                                            JOIN users as u
                                            ON a.user_id = u.id
                                            WHERE type_id = 1
                                            AND u.id = 9
                                            GROUP BY t.account_id");
$income = [];
$stat->execute([$user_id]);
while($row = $stat->fetch(PDO::FETCH_ASSOC)) {
    $income[]=$row;
}

$arr = array_merge($income,$expense);

$firstname = $_SESSION["user"]["name"];
$lastname = $_SESSION["user"]["family_name"];



$pdf= new FPDF();
$pdf->AddPage();
$pdf->SetFont("Arial","B",12);
$pdf->Cell( 50, 10, $pdf->Image("logoFinance.png", $pdf->GetX() + 40 , $pdf->GetY(), 133.78), 0, 0, 'R', false );
$pdf->Cell(0,100," Name: {$lastname} , {$firstname}",0,0,"C");
$pdf->Cell(0,60,"",0,1,"C");
for($i = 0; $i < count($arr); $i++) {
    $count = 1;
    foreach ($arr as $key=>$value) {
        if($count == 1) {

                $pdf->Cell(0, 15, "id: {$arr[$i]["id"]}      name: {$arr[$i]["name"]}      ", 1, 0, "L");
                $pdf->Cell(0, 5, "", 1, 1, "C");
                break;

        }
    }
}



$pdf->output();
?>