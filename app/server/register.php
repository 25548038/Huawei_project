<?php
    include('connet_db.php');
    $username = $_POST['username'];
    $age = $_POST['age'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];
    
    $sql = "INSERT INTO REG  (`username`, `PASSWORD`, `phone`, `age`) VALUE ('$username', '$password', '$phone', '$age');";
    $sql1 = "select * from reg where phone='$phone'";
    // 连接数据库
    $coon = new Mysqli('localhost', 'root', '', 'admin', 3306);
    // 设置字符集
    $coon->query("SET CHARACTER SET 'utf8'");//读库   
    $coon->query("SET NAMES 'utf8'");//写库 
    // 执行sql语句
    $result = $coon -> query($sql);
    $db = new DB();
    $result1 = $db -> fetch($sql1, "object");

    if ($result1) {
        echo "<script>
       alert('手机号已注册');
       location.href = '../reg.html';
      </script>";
    } else {
        if($result) {
            echo "<script>
                    location.href = '../index.html';
                  </script>";
        } else {
            echo "<script>
                    location.href = '../reg.html';
                </script>";
        }
    }


?>