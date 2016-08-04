<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<style>
	body{
		background-color: gainsboro;
	}
	.wapp{
		width: 960px;
		height: 700px;
		background-image:url(game2/images/popup_bg.jpg);
		background-size:cover ;
		margin: 0 auto;
		
	}
	
</style>
</head>
<body>
	<div class="wapp">
		

<?php  
error_reporting(E_ALL ^ E_DEPRECATED);
    header("content-type:text/html;charset=utf-8");
session_start();
	@$x = $_POST["rank"];
	@$y = $_SESSION['name'];
//	echo "姓名".$y; 
//  echo "成绩".$x ;
           $conn= mysql_connect("localhost","root","");  
            mysql_select_db("game",$conn);  
            mysql_query("set names utf8");  

		$sql1="select uname,gameone,gametwo,gamethree from user";
        $res=mysql_query($sql1,$conn);
        $rows=mysql_affected_rows($conn);//获取行数
        $colums=mysql_num_fields($res);//获取列数
        echo "<p align='center'>英雄榜如下：</p><br/>";
		
        echo "<p align='center'>共计".$rows."人 ".$colums."条记录</p><br/>";
         
        echo "<table style=border-color: '#efefef' border='1px' cellpadding='5px' cellspacing='0px' align='center'><tr>";
        for($i=0; $i < $colums; $i++){
            $field_name=mysql_field_name($res,$i);
            echo "<th>$field_name</th>";
        }
        echo "</tr>";
        while($row=mysql_fetch_row($res)){
            echo "<tr>";
            for($i=0; $i<$colums; $i++){
                echo "<td>$row[$i]</td>";
            }
            echo "</tr>";
        }
        echo "</table>";
		echo"<p align='center'><a href='index.html' >返回主页</a></p><br/>";
			  mysql_close();
        
?>  
	</div>
</body>
</html>