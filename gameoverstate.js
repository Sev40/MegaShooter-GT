
var GameOverState = function() 
{
	this.prototype = BaseState;
}

GameOverState.prototype.load = function() 
{
}

GameOverState.prototype.unload = function() 
{
}

GameOverState.prototype.update = function(dt) 
{
}

GameOverState.prototype.draw = function() 
{
	context.font="72px Verdana";	
	context.fillStyle = "#FF0";	
	var width =  context.measureText("GAME OVER").width;
	context.fillText("GAME OVER", SCREEN_WIDTH/2 - width/2, SCREEN_HEIGHT/2);	
}