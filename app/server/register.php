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
                alert('恭喜您注册成功');
                location.href = '../login.html';
              </script>";
    } else {
        echo "<script>
                alert('很遗憾, 注册失败!!!马上跳转到到注册页,请重新注册!!');
                location.href = '../reg.html';
            </script>";
    }


?>