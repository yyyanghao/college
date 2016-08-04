function clear(ctx) {	
	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); 
}

function Circle(x,y,radius){
	this.x = x;
	this.y = y;
	this.radius = radius;
}

function Line(startPoint,endPoint, thickness) {
	this.startPoint = startPoint;
	this.endPoint = endPoint;
	this.thickness = thickness;
}

var untangleGame = {
	circles: [],
	thinLineThickness: 1,
	boldLineThickness: 5,
	lines: [],
	currentLevel: 0,
	progressPercentage: 0,
	layers: []
};
//游戏中每个关卡小球的位置，以及线条的位置
untangleGame.levels = 
[
	{
		"level" : 0,
		"circles" : [{"x" : 400, "y" : 156},
					{"x" : 381, "y" : 241},
					{"x" : 84, "y" : 233},
					{"x" : 88, "y" : 73}],
		"relationship" : {
							"0" : {"connectedPoints" : [1,2]},
							"1" : {"connectedPoints" : [0,3]},
							"2" : {"connectedPoints" : [0,3]},
							"3" : {"connectedPoints" : [1,2]}
						  }				  
	},
	{
		"level" : 1,
		"circles" : [{"x" : 415, "y" : 117},
					{"x" : 400, "y" : 240},
					{"x" : 88, "y" : 241},
					{"x" : 84, "y" : 72}],
		"relationship" : {
							"0" : {"connectedPoints" : [1,2,3]},
							"1" : {"connectedPoints" : [0,2,3]},
							"2" : {"connectedPoints" : [0,1,3]},
							"3" : {"connectedPoints" : [0,1,2]}
						  }				  
	},
	{
		"level" : 2,
		"circles" : [{"x" : 192, "y" : 155},
					{"x" : 353, "y" : 109},
					{"x" : 493, "y" : 156},
					{"x" : 490, "y" : 236},
					{"x" : 348, "y" : 276}],
		"relationship" : {
							"0" : {"connectedPoints" : [1,2,3,4]},
							"1" : {"connectedPoints" : [0,2,3]},
							"2" : {"connectedPoints" : [0,1,3,4]},
							"3" : {"connectedPoints" : [0,1,2,4]},
							"4" : {"connectedPoints" : [0,2,3]}
						  }			  
	},
	{
		"level" : 3,
		"circles" : [{"x" : 192, "y" : 155},
					{"x" : 353, "y" : 109},
					{"x" : 493, "y" : 156},
					{"x" : 490, "y" : 236},
					{"x" : 348, "y" : 276},
					{"x" : 195, "y" : 228}],
		"relationship" : {
							"0" : {"connectedPoints" : [2,4]},
							"1" : {"connectedPoints" : [3,5]},
							"2" : {"connectedPoints" : [0,4]},
							"3" : {"connectedPoints" : [1,5]},
							"4" : {"connectedPoints" : [0,2]},
							"5" : {"connectedPoints" : [1,3]}
						  }				  
	},
		{
		"level" : 4,
		"circles" : [{"x" : 192, "y" : 155},
					{"x" : 353, "y" : 109},
					{"x" : 493, "y" : 156},
					{"x" : 490, "y" : 236},
					{"x" : 348, "y" : 276},
					{"x" : 195, "y" : 228}],
		"relationship" : {
							"0" : {"connectedPoints" : [2,3,4]},
							"1" : {"connectedPoints" : [3,5]},
							"2" : {"connectedPoints" : [0,4,5]},
							"3" : {"connectedPoints" : [0,1,5]},
							"4" : {"connectedPoints" : [0,2]},
							"5" : {"connectedPoints" : [1,2,3]}
						  }				  
	},
		{
		"level" : 5,
		"circles" : [{"x" : 192, "y" : 155},
					{"x" : 353, "y" : 109},
					{"x" : 493, "y" : 156},
					{"x" : 490, "y" : 236},
					{"x" : 348, "y" : 276},
					{"x" : 195, "y" : 228}],
		"relationship" : {
							"0" : {"connectedPoints" : [1,3,5]},
							"1" : {"connectedPoints" : [0,2,3,5]},
							"2" : {"connectedPoints" : [1,3,4]},
							"3" : {"connectedPoints" : [0,1,2,4,5]},
							"4" : {"connectedPoints" : [2,3,5]},
							"5" : {"connectedPoints" : [0,1,3,4]}
						  }			  
	},
	{
		"level" :6,
		"circles" : [{"x" : 192, "y" : 155},
					{"x" : 353, "y" : 109},
					{"x" : 493, "y" : 156},
					{"x" : 490, "y" : 236},
					{"x" : 348, "y" : 276},
					{"x" : 195, "y" : 228}],
		"relationship" : {
							"0" : {"connectedPoints" : [1,3,4,5]},
							"1" : {"connectedPoints" : [0,2,3,5]},
							"2" : {"connectedPoints" : [1,4,5]},
							"3" : {"connectedPoints" : [0,1,5]},
							"4" : {"connectedPoints" : [0,2,5]},
							"5" : {"connectedPoints" : [0,1,2,3,4]}
						  }			  
	},
];

function setupCurrentLevel() {
	untangleGame.circles = [];
	var level = untangleGame.levels[untangleGame.currentLevel];
	for (var i=0; i<level.circles.length; i++) {
		untangleGame.circles.push(new Circle(level.circles[i].x, level.circles[i].y, 10));
	}
	   
	connectCircles();
	updateLineIntersection();
}

function checkLevelCompleteness() {
	if ($("#progress").html() == "100") {
		if (untangleGame.currentLevel+1 < untangleGame.levels.length)
			untangleGame.currentLevel++;
		setupCurrentLevel();
	}
}

function drawLine(ctx, x1, y1, x2, y2, thickness) {		
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.lineWidth = thickness;
	ctx.strokeStyle = "#cfc";
	ctx.stroke();
}

function drawCircle(ctx, x, y, radius) {
	// 准备径向渐变填充样式
	var circle_gradient = ctx.createRadialGradient(x-3,y-3,1,x,y,radius);
	circle_gradient.addColorStop(0, "#fff");
	circle_gradient.addColorStop(1, "#cc0");
	ctx.fillStyle = circle_gradient;
	
	// 绘制路径
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI*2, true); 
	ctx.closePath();
	
	// 填充圆路径
	ctx.fill();
}

$(function(){
	// 准备第0个canvas 0 (bg)
	var canvas_bg = document.getElementById("bg");
	untangleGame.layers[0] = canvas_bg.getContext("2d");	 			
	
	// 准备第1个canvas 1 (guide)
	var canvas_guide = document.getElementById("guide");
	untangleGame.layers[1] = canvas_guide.getContext("2d");
	
	// 准备第2个canvas 2 (game)
	var canvas = document.getElementById("game");  
	var ctx = canvas.getContext("2d");
	untangleGame.layers[2] = ctx;
	
	// 准备第3个canvas 3 (ui)
	var canvas_ui = document.getElementById("ui");
	untangleGame.layers[3] = canvas_ui.getContext("2d");
	
	// draw a splash screen when loading the game background
	// draw gradients background
	var bg_gradient = ctx.createLinearGradient(0,0,0,ctx.canvas.height);
	bg_gradient.addColorStop(0, "#cccccc");
	bg_gradient.addColorStop(1, "#efefef");
	ctx.fillStyle = bg_gradient;
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	
	// 画出当页面加载时的Loading文字
	ctx.font = "34px 'Arial'";
	ctx.textAlign = "center";
	ctx.fillStyle = "#333333";
	ctx.fillText("loading...",ctx.canvas.width/2,canvas.height/2);


	// 加载游戏的背景图
	untangleGame.background = new Image();	
	untangleGame.background.onload = function() {
		drawLayerBG();

		// 设置游戏的主循环
	    setInterval(gameloop, 30);
	}
	untangleGame.background.onerror = function() {
		console.log("Error loading the image.");
	}
	untangleGame.background.src = "images/board.png";
	
	// 加载游戏导航精灵
	untangleGame.guide = new Image();
	untangleGame.guide.src = "images/guide_sprite.png";
	untangleGame.guide.onload = function() {
		untangleGame.guideReady = true;
		
		// 设置定时器来切换向导精灵的显示框
		untangleGame.guideFrame = 0;
		setInterval(guideNextFrame, 500);
	}
	
	// setup current level
	setupCurrentLevel();	
	updateLevelProgress();
	
	// 将鼠标事件器添加到画布上 
	    // 如果鼠标的位置是在任何一个圆圈上
	    // 以圆为目标拖动圆。
	    $("#layers").mousedown(function(e) {
	    	var canvasPosition = $(this).offset();
	    	var mouseX = e.layerX || 0;
	    	var mouseY = e.layerY || 0;
	    	
			for(var i=0;i<untangleGame.circles.length;i++)
			{
				var circleX = untangleGame.circles[i].x;
				var circleY = untangleGame.circles[i].y;
				var radius = untangleGame.circles[i].radius;
				if (Math.pow(mouseX-circleX,2) + Math.pow(mouseY-circleY,2) < Math.pow(radius,2))
				{
					untangleGame.targetCircle = i;
					break;
				}
			}
	    });
	    
	    // 当鼠标移动时，移动目标拖动圆
	    $("#layers").mousemove(function(e) {
	    	if (untangleGame.targetCircle != undefined)
	    	{
				var canvasPosition = $(this).offset();
				var mouseX = e.layerX || 0;
				var mouseY = e.layerY || 0;
				var radius = untangleGame.circles[untangleGame.targetCircle].radius;
				untangleGame.circles[untangleGame.targetCircle] = new Circle(mouseX, mouseY, radius);	
				
				connectCircles();
				updateLineIntersection();
				updateLevelProgress();				    	
	    	}
	    });
	    
	    // 当鼠标移动时，清除拖动圆数据
	    $("#layers").mouseup(function(e) {    	
	       	untangleGame.targetCircle = undefined;    	
	       	
	       	// 每一个鼠标离开的时候，检查是否通关。
	       	checkLevelCompleteness();
	    });	
});

function gameloop() {	
	drawLayerGuide();
	drawLayerGame();
	drawLayerUI();	
}

// 在画布上画出BG的背景
function drawLayerBG()
{
	var ctx = untangleGame.layers[0];

	clear(ctx);
	// 画出背景图
	ctx.drawImage(untangleGame.background, 0, 0);
}

// 加载出导航的canvas.
function drawLayerGuide()
{
	var ctx = untangleGame.layers[1];
	
	clear(ctx);
	
	// 画出导航动画
	if (untangleGame.guideReady)
	{
		// 每一帧的尺寸80x130.
		var nextFrameX = untangleGame.guideFrame * 80;
		ctx.drawImage(untangleGame.guide, nextFrameX, 0, 80, 130, 325, 130, 80, 130);
	}
	
	// 当LEVEL>0时隐藏导航动画
	if (untangleGame.currentLevel == 1)
	{
		$("#guide").addClass('fadeout');
	}
}

// 加载出游戏的主体canvas.
function drawLayerGame()
{
	// 获取画布元素和绘图上
	var ctx = untangleGame.layers[2];				
	
	
	// 在绘画出游戏主体的时候清除其他的canvas。
	clear(ctx);
	
	// 画出所有已经在算法中画出的线。
	for(var i=0;i<untangleGame.lines.length;i++) {
		var line = untangleGame.lines[i];
		var startPoint = line.startPoint;
		var endPoint = line.endPoint;
		var thickness = line.thickness;
		drawLine(ctx, startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
	}
	
	// 画出所有的圆。
	for(var i=0;i<untangleGame.circles.length;i++) {
		var circle = untangleGame.circles[i];
		drawCircle(ctx, circle.x, circle.y, circle.radius);
	}
}

function connectCircles()
{
	// 更新所有的圆和线条的关系。
	var level = untangleGame.levels[untangleGame.currentLevel];
	untangleGame.lines.length = 0;
	for (var i in level.relationship) {
		var connectedPoints = level.relationship[i].connectedPoints;
		var startPoint = untangleGame.circles[i];
		for (var j in connectedPoints) {
			var endPoint = untangleGame.circles[connectedPoints[j]];
			untangleGame.lines.push(new Line(startPoint, endPoint));
		}
	}
}

function updateLineIntersection()
{
	// 检查线的交叉处。
	for (var i=0;i<untangleGame.lines.length;i++) {
		var line1 = untangleGame.lines[i];
		line1.thickness = untangleGame.thinLineThickness;
		for(var j=0;j<i;j++) {	
			var line2 = untangleGame.lines[j];
			
			// 如果两条线交叉, 
			// 加粗这两条线。
			if (isIntersect(line1, line2)) {
				line1.thickness = untangleGame.boldLineThickness;
				line2.thickness = untangleGame.boldLineThickness;
			}			
		}
	}
}

function updateLevelProgress()
{
	// 计算出关卡的进度
	var progress = 0;
	for (var i=0;i<untangleGame.lines.length;i++) {
		if (untangleGame.lines[i].thickness == untangleGame.thinLineThickness) {
			progress++;
		}
	}
	untangleGame.progressPercentage = Math.floor(progress/untangleGame.lines.length*100);
	$("#progress").html(untangleGame.progressPercentage);
	
	// 在结束界面上写出所获得的关卡。
	$("#level").html(untangleGame.currentLevel);
	x = untangleGame.currentLevel;
	document.getElementById("rank").value= x;
	
}

// 画出游戏的UI canvas层。
function drawLayerUI()
{
	var ctx = untangleGame.layers[3];
	
	clear(ctx);
	
	// 绘制关卡信息
	ctx.font = "26px 'Rock Salt'";
	ctx.fillStyle = "#dddddd";
	ctx.textAlign = "left";
	ctx.textBaseline = "bottom";
	ctx.fillText("Puzzle "+untangleGame.currentLevel+", Completeness: " + untangleGame.progressPercentage + "%", 60,ctx.canvas.height-80);
		
	
	// 获取所有圆，检测是否有UI与游戏对象重叠。
	var isOverlappedWithCircle = false;
	for(var i in untangleGame.circles) {
		var point = untangleGame.circles[i];
		if (point.y > 310)
		{
			isOverlappedWithCircle = true;
		}		
	}
	if (isOverlappedWithCircle)
	{
		$("#ui").addClass('dim');
	}
	else
	{
		$("#ui").removeClass('dim');
	}
}

function guideNextFrame()
{
	untangleGame.guideFrame++;
	// 指导动画只有6帧（0~5）
	// 当轮到帧5时就把帧的号码设置回帧0.
	if (untangleGame.guideFrame > 5)
	{
		untangleGame.guideFrame = 0;
	}
}

function isIntersect(line1, line2)
{
	// 转换line1 成一般形式: Ax+By = C
	var a1 = line1.endPoint.y - line1.startPoint.y;
	var b1 = line1.startPoint.x - line1.endPoint.x;
	var c1 = a1 * line1.startPoint.x + b1 * line1.startPoint.y;
	
	// 转换line2成一般形式: Ax+By = C
	var a2 = line2.endPoint.y - line2.startPoint.y;
	var b2 = line2.startPoint.x - line2.endPoint.x;
	var c2 = a2 * line2.startPoint.x + b2 * line2.startPoint.y;
	
	// 计算交点	
	var d = a1*b2 - a2*b1;
	
	// 当 d = 0时，两线平行
	if (d == 0) {
		return false;
	}else {
		var x = (b2*c1 - b1*c2) / d;
		var y = (a1*c2 - a2*c1) / d;
					
		// 检测截点是否在两条线段之上
		if ((isInBetween(line1.startPoint.x, x, line1.endPoint.x) || isInBetween(line1.startPoint.y, y, line1.endPoint.y)) &&
			(isInBetween(line2.startPoint.x, x, line2.endPoint.x) || isInBetween(line2.startPoint.y, y, line2.endPoint.y))) 
		{
			return true;	
		}
	}
	
	return false;
}

// 当  b在a 与c 之间返回ture
// 当a==b  或者 b==c 时排除结果，返回false
function isInBetween(a, b, c) {
	// 如果b 几乎等于 a 或 c,返回false
	//为了避免 在浮点运算时俩值几乎相等，但存在0.00000.....001这样的存在，使用下列方式避免。
	if (Math.abs(a-b) < 0.000001 || Math.abs(b-c) < 0.000001) {
		return false;
	}
	
	// 如果b在a 与 c 之间 返回ture.
	return (a < b && b < c) || (c < b && b < a);
}
//设置游戏的结束画面
function run(){
var s = document.getElementById("timer");
if(s.innerHTML == 0){
 document.getElementById("end").style.display="block"
 clearInterval(t);
}

s.innerHTML = s.innerHTML - 1;
}
//设置游戏的时间
function game_start(){
	setInterval("run();", 1000);
}
//难度选择函数。
function change (){
		  var s = document.getElementById("hard");
		  var timer= document.getElementById("timer")
		  switch(s.value){
		  	case "1":
		    timer.innerText =60;
		     break;
		   case "2":
		   timer.innerText =45;
		   break;
		    case "3":
		   timer.innerText =30;
		   break;
		  }
	}
