<?php
    include('connet_db.php');
    // 获取传递的信息
    $phone = $_POST['phone'];
    $password = $_POST['password'];
    $sql = "select * from reg where phone='$phone' and password='$password'";
    // var_dump($sql);
    $db = new DB();
    $result = $db -> fetch($sql, "object");
    
    if($result) {
        echo "
            <script>
                location.href = '../index.html';
            </script>";
    } else {
        echo "<script>  
                alert('登录失败, 用户名称或者密码输入错误');
                location.href = '../login.html';
              </script>";
    }


?>