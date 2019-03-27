<?php
    $phone = $_POST['phone'];
    $sql = "select id from reg where phone=$phone";
    include('connet_db.php');
    $db = new DB();
    $result = $db -> fetch($sql, "object");
    var_dump($db);
    if ($result) {
        echo $arr =array("code" => "200" , "msg" => "");
    } else {
        echo $arr =array("code" => "0" , "msg" => "用户名不存在");
    }
    echo json_encode($arr);
?>