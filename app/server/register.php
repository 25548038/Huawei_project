<?php
    
    $username = $_POST['username'];
    $age = $_POST['age'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];
    
    $sql = "INSERT INTO REG  (`username`, `PASSWORD`, `phone`, `age`) VALUE ('$username', '$password', '$phone', '$age');";
    // 连接数据库
    $coon = new Mysqli('localhost', 'root', '', 'admin', 3306);
    // 设置字符集
    $coon->query("SET CHARACTER SET 'utf8'");//读库   
    $coon->query("SET NAMES 'utf8'");//写库 
    // 执行sql语句
    $result = $coon -> query($sql);
    if($result) {
        echo "<script>
                location.href = '../index.html';
              </script>";
    } else {
        echo "<script>
                location.href = '../reg.html';
            </script>";
    }


?>