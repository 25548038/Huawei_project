<?php
    include('connet_db.php');
    // 获取传递的信息
    $username = $_POST['username'];
    $password = $_POST['password'];
    $sql = "select * from reg where username='$username' and password='$password'";
    // var_dump($sql);
    $db = new DB();
    $result = $db -> fetch($sql, "object");
    // var_dump($result);
    if($result) {
        echo "
            <script>
                alert('登录成功, 正在跳转');
                location.href = '../index.html';
            </script>";
    } else {
        echo "<script>
                alert('登录失败, 用户名称或者密码输入错误');
                location.href = '../login.html';
              </script>";
    }


?>