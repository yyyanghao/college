<?php  
error_reporting(E_ALL ^ E_DEPRECATED);
    header("content-type:text/html;charset=utf-8");
       session_start();
        @$user = $_POST["name"];  
        @$psw = $_POST["password"];
		$_SESSION["name"]= $user;  
        if($user == "" || $psw == "")  
        {  
            echo "<script>alert('请输入用户名或密码！'); history.go(-1);</script>";  
        }  
        else  
        {  
            mysql_connect("localhost","root","");  
            mysql_select_db("game");  
            mysql_query("set names utf8");  
            $sql = "select uname,password from user where uname = '$_POST[name]' and password = '$_POST[password]'";  
            $result = mysql_query($sql);  
            $num = mysql_num_rows($result);  
            if($num)  
            {  
                $row = mysql_fetch_array($result);  //将数据以索引方式储存在数组中  
             echo"<script>location='index.html'</script>";
            }  
            else  
            {  
                echo "<script>alert('用户名或密码不正确！');history.go(-1);</script>";  
            }  
        }  
    
?>  