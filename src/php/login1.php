<?php
    header("content-type:text/html;charset=utf-8");
    $link=mysqli_connect('localhost','root','','abc');
    // if (mysqli_connect_error($link)){
    //     die(mysqli_connect_error());
    // } else {
    //     echo "OK—数据库连接成功！";
    // }
    $type = $_POST["type"];
    $uname = $_POST['username'];
    $upass = $_POST['password'];
    // 建立连接
    $link =  mysqli_connect('localhost','root','','abc');
    // if($type === "login"){          //add为注册  login登录
    //     $sql = "SELECT * FROM `add` WHERE `username`='$uname' AND `password`='$upass'";
    //         $res = mysqli_query($link,$sql);
    //         $row = mysqli_fetch_assoc($res);
    //         if(count($row)>0){
    //             echo '{"err":1,"msg":"登录成功"}';
    //         }else{
    //             echo '{"err":-1,"msg":"登录失败"}';
    //         };
    // };

    
    if($type==='add'){
        $uphone = $_POST['uphone'];
        $sql = "SELECT * FROM `add` WHERE `username`='$uname'";
        $res = mysqli_query($link,$sql);
        $row = mysqli_fetch_all($res,MYSQLI_ASSOC);
        if(count($row)>0){
            echo '{"err":2,"msg":"对不起用户名已经占用"}';
        }else{
            $sql1 = "INSERT INTO `add`  VALUES (null,'$uname','$upass','$uphone')";
            $res1 =  mysqli_query($link,$sql1);
            $num = mysqli_affected_rows($link);//返回受影响的条数\
            if( $num > 0 ){
                echo '{"err":3,"msg":"注册成功"}';
                
            }else{
                echo '{"err":4,"msg":"注册失败"}';
            };

            mysqli_close($link);
        };
    };
    mysqli_set_charset($link,"utf8");
    echo $uphone;
    echo $upass;
    echo $uphone;
?>