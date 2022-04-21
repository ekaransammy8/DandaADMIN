<?php
/* Connect to an ODBC database using driver invocation */
$host="localhost";
/*$user = "appzorro_appzoro";
$password = "appzorro@123";*/
$user = "martin_ru";
$password = "rawuncensored@123";
$dbname = "martin_ru";
/*$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
); 
*/
try 
{
    $pdo = new PDO("mysql:host=localhost;dbname=martin_ru",$user,$password);  
   
} 
catch (PDOException $e)
{
    $e->getMessage();
   // $pdo=null;
   
}
?>

