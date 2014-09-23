<?php
include 'config.php';
$sql = "SELECT `postid`, `title`, `author`, `date`, `type`, `image`, `post` 
        FROM blog";

$result = $conn->query($sql)->fetchAll(PDO::FETCH_ASSOC);
//To output as-is json data result
//header('Content-type: application/json');
//echo json_encode($result);

//Or if you need to edit/manipulate the result before output
foreach ($result as $row){
    $return[]=array('postid'=>$row['id'],
                    'title'=>$row['title'],
                    'author'=>$row['author'],
                    'date'=>$row['date'],
                    'type'=>$row['type'],
                    'image'=>$row['image'],
                    'post'=>$row['post']);
}
$conn = null;

header('Content-type: application/json');
echo json_encode($return);
mysql_close($conn);
?>