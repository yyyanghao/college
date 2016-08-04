
<?php  
error_reporting(E_ALL ^ E_DEPRECATED);
    header("content-type:text/html;charset=utf-8");
session_start();
	@$x = $_POST["rank2"];
	@$y = $_SESSION['name'];
//	echo "姓名".$y; 
//  echo "成绩".$x ;
           $conn= mysql_connect("localhost","root","");  
            mysql_select_db("game",$conn);  
            mysql_query("set names utf-8");  
			
//			$sql = "select gameone from user where uname = $y";  
//          $result = mysql_query($sql);  
//          $num = mysql_num_rows($result); 
//			echo $num; 
//          if($num < $x)  
//          {  
                $sql = "update user set gametwo = '$x' where uname='$y'";
                mysql_query($sql); 
			    $result=mysql_query($sql); 
		        echo"<script>alert('提交成功，点击返回主页');</script>";
				echo"<script>location='index.html'</script>";
//          }  
			  mysql_close();
        
?>  