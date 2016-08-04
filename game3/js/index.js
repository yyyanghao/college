(function mapGen(b, c, e, a, m) {

	function character(a, b) {
		// 从目前得到的彩色像素之间的间隔和相同的单位，必须按照其中的角色在一边
		var h = d.getImageData(13 * f + 7 + 6 * a, 13 * g + 7 + 6 * b, 1, 1);
		
		0 == h.data[0] && 0 == h.data[1] && 0 == h.data[2] && 255 == h.data[3] ? a = b = 0 : document.querySelector("#step").innerHTML = Math.floor(document.querySelector("#step").innerHTML) + 1;
		// 着色字符
		d.clearRect(13 * f + 3, 13 * g + 3, 10, 10);
		// 更改其当前位置
		f += a;
		g += b;
		
		d.fillRect(3 + 13 * f, 3 + 13 * g, 10, 10);
		// 如果角色已经走出了迷宫，然后我们生成一个新的迷宫，并第一次启动游戏
		f >= c && mapGen("#canvas", c, e, 0, m + 1)
	}

	// 选择绘图区域
	b = document.querySelector(b);
	var d = b.getContext("2d");
	//并输入步骤，通过迷宫的数量和
	document.querySelector("#step").innerHTML = Math.floor(a);
	document.querySelector("#complete").innerHTML = Math.floor(m);
	document.getElementById("rank3").value = Math.floor(m);
	// 指定迷宫的区域的宽度和高度
	b.width = 13 * c + 3;
	b.height = 13 * e + 3;
	
	d.fillStyle = "black";
	d.fillRect(0, 0, 13 * c + 3, 13 * e + 3);

	// 声明阵列存储多个当前小区，为墙的权利和在底壁的值的值的值的
	a = Array(c);
	b = Array(c);
	var k = Array(c),
		// 当前的一组
		q = 1;

	//行周期
	for (cr_l = 0; cr_l < e; cr_l++) {
		  
		for (i = 0; i < c; i++)
			0 == cr_l && (a[i] = 0), d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 10), k[i] = 0, 1 == b[i] && (b[i] = a[i] = 0), 0 == a[i] && (a[i] = q++);

		
		for (i = 0; i < c; i++) {
			k[i] = Math.floor(2 * Math.random()), b[i] = Math.floor(2 * Math.random());

			if ((0 == k[i] || cr_l == e - 1) && i != c - 1 && a[i + 1] != a[i]) {
				var l = a[i + 1];
				for (j = 0; j < c; j++) a[j] == l && (a[j] = a[i]);
				d.clearRect(13 * i + 3, 13 * cr_l + 3, 15, 10)
			}
			cr_l != e - 1 && 0 == b[i] && d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 15)
		}

		// 检查禁区。
		for (i = 0; i < c; i++) {
			var p = l = 0;
			for (j = 0; j < c; j++) a[i] == a[j] && 0 == b[j] ? p++ : l++;
			0 == p && (b[i] = 0, d.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 15))
		}
	}

	// 绘制的方式走出迷宫
	d.clearRect(13 * c, 3, 15, 10);
	// 空当前位置的字符
	var f = 0,
		g = 0;
	// 设置红色
	d.fillStyle = "red";
	// 把一个字符到迷宫的开始
	character(-1, -1);
	// 点击箭头
	document.body.onkeydown = function(a) {
		36 < a.keyCode && 41 > a.keyCode && character((a.keyCode - 38) % 2, (a.keyCode - 39) % 2)
	}
})("#canvas", 25, 30, 0, 0);

function run() {
	var s = document.getElementById("timer");
	if (s.innerHTML == 0) {
		document.getElementById("end").style.display = "block"
		clearInterval(t);
	}

	s.innerHTML = s.innerHTML - 1;
}
//设置游戏的时间
function game_start() {
	setInterval("run();", 1000);
}
//难度选择函数。
function change() {
	var s = document.getElementById("hard");
	var timer = document.getElementById("timer")
	switch (s.value) {
		case "1":
			timer.innerText = 100;
			break;
		case "2":
			timer.innerText = 75;
			break;
		case "3":
			timer.innerText = 60;
			break;
	}
}