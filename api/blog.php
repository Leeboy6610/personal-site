<?php
include 'config.php';
$sql = "SELECT * FROM blog";

$result = mysql_query($sql, $conn);
if(!$result )
{
    die('Could not get data: ' . mysql_error());
}
while($row = mysql_fetch_array($result, MYSQL_ASSOC))
{
$return[]=array('postid'=>$row['id'],
          'title'=>$row['title'],
          'author'=>$row['author'],
          'date'=>$row['date'],
          'type'=>$row['type'],
          'image'=>$row['image'],
          'post'=>$row['post']);

    echo "Post ID :{$row['postid']}  <br> ".
        "Title: {$row['title']} <br> ".
        "Author: {$row['author']} <br> ".
        "Date : {$row['date']} <br> ".
        "Type : {$row['type']} <br> ".
        "Image : {$row['image']} <br> ".
        "Post : {$row['post']} <br> ".
        "--------------------------------<br>";
}

//To output as-is json data result
header('Content-type: application/json');
echo json_encode($return);
mysql_close($conn);
?>