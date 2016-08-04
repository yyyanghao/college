<?php
error_reporting(E_ALL ^ E_DEPRECATED);
    header("content-type:text/html;charset=utf-8");
 
    //开启session
    session_start();
     
    //将验证码与输入框中字符串都转为小写
//  $code=strtolower($_POST['vcode']);  
//  $str=strtolower($_SESSION['vstr']); 
//   
    //接收表单传递的用户名和密码
    $name=$_POST['name'];
    $pwd=$_POST['password'];
    $repwd=$_POST['repassword'];
     
    //判断密码是否一致
     if($name == "" || $pwd == ""||$repwd=="")  
        {  
            echo "<script>alert('请输入用户名或密码！'); history.go(-1);</script>";  
        } 
	 elseif($pwd!=$repwd){
        echo"<script>alert('两次密码输入不一致，请重新输入');</script>";
        echo"<script>location='signin.html'</script>";
    }else{
        //判断验证码是否正确
//      if($code!=$str){  
//          echo "<script>alert('验证码输入错误,请重新输入');</script>";  
//          echo"<script>location='signin.html'</script>";
//      }else{  
            //通过php连接到mysql数据库
            $conn=mysql_connect("localhost","root","");
             
            //选择数据库
            mysql_select_db("game",$conn);
 
            //设置客户端和连接字符集
            mysql_query("set names utf8");
 
            //通过php进行insert操作
            $sqlinsert="insert into user(uname,password) values('{$name}','{$pwd}')";
 
            //通过php进行select操作
            $sqlselect="select * from user order by uid";
 
            //添加用户信息到数据库
            mysql_query($sqlinsert);
             
            //返回用户信息字符集
           $result=mysql_query($sqlselect);
//           
//          echo "<h1>USER INFORMATION</h1>";
//          echo "<hr>";
//          echo "<table width='700px' border='1px'>";
//          //从结果中拿出一行
//          echo "<tr>";
//          echo "<th>ID</th><th>USERNAME</th><th>PASSWORD</th>";
//          echo "</tr>";
//          while($row=mysql_fetch_assoc($result)){
//              echo "<tr>";
//              //打印出$row这一行
// 
//              echo "<td>{$row['uid']}</td><td>{$row['uname']}</td><td>{$row['password']}</td>";
//               
//              echo "</tr>";
//          }
//          echo "</table>";
                    echo"<script>alert('注册成功，点击登录');</script>";
                    echo"<script>location='index.html'</script>";
// 

             //释放连接资源
            mysql_close($conn);
                           
            } 
    
?>