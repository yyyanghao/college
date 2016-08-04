
 
// 定义一个全局变量来保存游戏数据
var matchingGame = {};

// 定义所有可能的值
matchingGame.deck = [
	'cardAK', 'cardAK',
	'cardAQ', 'cardAQ',
	'cardAJ', 'cardAJ',
	'cardBK', 'cardBK',
	'cardBQ', 'cardBQ',
	'cardBJ', 'cardBJ',	
];


$(function(){		

	
	matchingGame.deck.sort(shuffle);
	
	
	for(var i=0;i<11;i++){
		$(".card:first-child").clone().appendTo("#cards");
	}
	

	$("#cards").children().each(function(index) {		

		$(this).css({
			"left" : ($(this).width()  + 20) * (index % 4),
			"top"  : ($(this).height() + 20) * Math.floor(index / 4)
		});
		
	
		var pattern = matchingGame.deck.pop();
		
		
		$(this).find(".back").addClass(pattern);
		
		
		$(this).data("pattern",pattern);
						
		
		$(this).click(selectCard);				
	});	

	
	matchingGame.elapsedTime = 0;
			
	matchingGame.timer = setInterval(countTimer, 1000);

});


function countTimer()
{
	matchingGame.elapsedTime++;
	
	
	var minute = Math.floor(matchingGame.elapsedTime / 60);
	var second = matchingGame.elapsedTime % 60;	
	
	if (minute < 10) minute = "0" + minute;
	if (second < 10) second = "0" + second;
	
	
	$("#elapsed-time").html(minute+":"+second);
}

function selectCard() {
	
	if ($(".card-flipped").size() > 1)
	{
		return;
	}
	
	$(this).addClass("card-flipped");
	
	if ($(".card-flipped").size() == 2)
	{
		setTimeout(checkPattern,700);
	}
}

function shuffle()
{
	return 0.5 - Math.random();
}


function checkPattern()
{
	if (isMatchPattern())
	{
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
		
		// delete the card DOM node after the transition finished.
		$(".card-removed").bind("webkitTransitionEnd", removeTookCards);
	}
	else
	{
		$(".card-flipped").removeClass("card-flipped");
	}
}

function removeTookCards()
{
	$(".card-removed").remove();
	
	// 检查所有的卡牌都已配对
	if ($(".card").length == 0)
	{
		gameover();
	}
	
}

function isMatchPattern()
{
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");
	return (pattern == anotherPattern);
}


function gameover()
{
 
	clearInterval(matchingGame.timer);
	$(".score").html($("#elapsed-time").html());
		document.getElementById("rank2").value=$("#elapsed-time").html();
	$("#popup").removeClass("hide");
}