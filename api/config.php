<?php
$dbhost = 'localhost';
$dbuser = 'main';
$dbpass = 'password';
$dbname = 'personal';
$conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ('Error connecting to mysql');
mysql_select_db($dbname);
?>