<?php
include 'config.php';

echo $HTTP_RAW_POST_DATA;

mysql_close($conn);
?>
