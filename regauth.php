<strong><span style="font-family:KaiTi_GB2312;font-size:18px;"><?php
    header("content-type:text/html charset=utf-8");
     
    //开启session
    session_start();
 
    //准备画布
    $im=imagecreatetruecolor(50,25);
 
    //准备颜料
    $black=imagecolorallocate($im,0,0,0);
    $gray=imagecolorallocate($im,200,200,200);
 
    //背景填充
    imagefill($im,0,0,$gray);
 
    //文字居中
    $x=(50-10*4)/2;
    $y=(25-5)/2+5;
 
    //添加干扰素
    for($i=0;$i<50;$i++){
        imagesetpixel($im,mt_rand(0,50),mt_rand(0,25),$black);
    }
 
    //准备文字
    $arr=array_merge(range(0,9),range('a','z'),range('A','Z'));
    shuffle($arr);
    $str=implode(array_slice($arr,0,4));
 
    //把$str放入session中，方便所有页面中调用
    $_SESSION['vstr']=$str;
 
    $file="../fonts/simsun.ttc";
    imagettftext($im,15,0,$x,$y,$black,$file,$str);
 
 
    //输出到浏览器上或保存起来
    header("content-type:image/png");
    imagepng($im);
 
    //关闭画布
    imagedestory($im);
?></span></strong>