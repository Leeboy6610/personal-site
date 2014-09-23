<?php
$dbhost = 'localhost';
$dbuser = 'main';
$dbpass = 'password';

$conn = mysql_connect($dbhost, $dbuser, $dbpass);
if (!$conn)
{
    die('Could not connect: ' . mysql_error());
}
//echo 'MySQL Connected successfully'."<BR>";

$dbname = 'personal';
$db_selected = mysql_select_db($dbname, $conn);
if (!$db_selected)
{
    die ("Can\'t use test_db : " . mysql_error());
}
//echo 'Connected to database successfully'."<BR>";

?>