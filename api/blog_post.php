<?php
$json = file_get_contents('posts.json');
$data = json_decode($json, true);

$posts = $data['posts'];

echo "<pre>";

print_r($posts);

$values=array();
$i = 0;
foreach($posts as $post){
    $line="(";
    foreach($post as $key => $value){
        $line = $line. "'". $value . "',";
    }
    $line = substr($line, 0, strlen($line)-1).")";
    $values[$i] = $line;
    ++$i;
}
$values = implode(",", $values);
echo $values;

include 'config.php';

Insert $event array into eventbase

$db_insert = mysql_query("INSERT INTO blog (postid, title, author, date, type, image, post) VALUES" . $values);

if (!$db_insert)
{
    die('Could not connect - event insert failed: ' . mysql_error());
}
?>